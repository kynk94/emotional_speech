from overrides import overrides
from event import Event
from event import EventType
from event_handler import EventHandler

import os
import subprocess

# RelGAN inference
import glob
import argparse
import tensorflow as tf
import time
from model.module.model import RelGAN
from model.module.speech_tools import *
import model.hparams as hp

gpu = tf.config.experimental.list_physical_devices('GPU')
tf.config.experimental.set_memory_growth(gpu[0], True)

class DataManager(EventHandler):

    def __init__(self, dispatcher, logger):
        super().__init__(dispatcher, logger)

        self.basepath = os.path.dirname(__file__)

        self.num_domains = hp.num_domains  # num_domains hp로 넘기면 안되나??
        self.model = RelGAN(self.num_domains)
        # 모델 weight 불러오기
        self.latest = tf.train.latest_checkpoint(os.path.join(self.basepath, 'model', 'weight', hp.weights_dir))
        print('Latest_weight: ', self.latest)
        self.model.load_weights(self.latest).expect_partial()

    def domain_match(self, match):
        # DB emotion: 'Neutral(3)','Happy(0)','Anger(1)','Sad','Disgust(2)','Fear' 
        # Domain list: ['Amused', 'Angry', 'Disgusted', 'Neutral', 'Sleepy']
        emo_dict = {'Happy':0, 'Anger':1, 'Disgust':2, 'Neutral':3}
        num_dict = {0:'Happy', 1:'Anger', 2:'Disgust', 3:'Neutral'}
        if str(match).isalpha():
            return emo_dict[match]
        return num_dict[match]

    def predict(self, uuid, input_path, x_atr, y_atr, alpha): # x_atr:source_label / y_atr:target_label / alpha:interpolation
        print('Wavs :', input_path)
        # domain attribute 생성
        # label 종류
        labels = np.arange(self.num_domains)
        x_labels = np.zeros([1, self.num_domains])
        y_labels = np.zeros([1, self.num_domains])
        z_labels = np.zeros([1, self.num_domains])
        x_labels[0] = np.identity(self.num_domains)[x_atr]
        y_labels[0] = np.identity(self.num_domains)[y_atr]
        labels = labels[labels != x_atr]
        labels = labels[labels != y_atr]
        z_atr = np.random.choice(labels, 1) # z는 x,y 제외 random으로
        z_labels[0] = np.identity(self.num_domains)[z_atr]

        # interpolation
        alpha = np.ones(1) * alpha

        # wav 처리
        wav = load_wavs(input_path, sr=hp.sampling_rate)
        wav = wav_padding(wav, sr=hp.sampling_rate, frame_period=hp.duration)
        f0, timeaxis, sp, ap = world_decompose(wav, hp.sampling_rate, hp.duration)
        coded_sps_A_norm, coded_sps_A_mean, coded_sps_A_std, log_f0s_mean_A, log_f0s_std_A = load_pickle(os.path.join(self.basepath, 'model', 'statistics', f'{self.domain_match(x_atr)}.p'))
        coded_sps_B_norm, coded_sps_B_mean, coded_sps_B_std, log_f0s_mean_B, log_f0s_std_B = load_pickle(os.path.join(self.basepath, 'model', 'statistics', f'{self.domain_match(y_atr)}.p'))

        f0s_mean_A = np.exp(log_f0s_mean_A)
        f0s_mean_B = np.exp(log_f0s_mean_B)
        f0s_mean_AB = alpha * f0s_mean_B + (1 - alpha) * f0s_mean_A
        log_f0s_mean_AB = np.log(f0s_mean_AB)
        
        f0s_std_A = np.exp(log_f0s_std_A)
        f0s_std_B = np.exp(log_f0s_std_B)
        f0s_std_AB = alpha * f0s_std_B + (1 - alpha) * f0s_std_A
        log_f0s_std_AB = np.log(f0s_std_AB)
        f0_converted = pitch_conversion(f0=f0, mean_log_src=log_f0s_mean_A, std_log_src=log_f0s_std_B, mean_log_target=log_f0s_mean_AB, std_log_target=log_f0s_std_AB)

        coded_sp = world_encode_spectral_envelop(sp, hp.sampling_rate, hp.num_mceps)
        coded_sp_transposed = coded_sp.T
        coded_sp_norm = (coded_sp_transposed - coded_sps_A_mean) / coded_sps_A_std
        coded_sp_norm = np.array([coded_sp_norm])

        # model input
        inputs = [coded_sp_norm, coded_sp_norm, coded_sp_norm, coded_sp_norm, x_labels, y_labels, z_labels, alpha]
        # model!!
        coded_sp_converted_norm = self.model(inputs)[0][0].numpy()
        if coded_sp_converted_norm.shape[1] > len(f0):
            coded_sp_converted_norm = coded_sp_converted_norm[:, :-1]
        coded_sps_AB_mean = (1 - alpha) * coded_sps_A_mean + alpha * coded_sps_B_mean
        coded_sps_AB_std = (1 - alpha) * coded_sps_A_std + alpha * coded_sps_B_std
        coded_sp_converted = coded_sp_converted_norm * coded_sps_AB_std + coded_sps_AB_mean
        coded_sp_converted = coded_sp_converted.T
        coded_sp_converted = np.ascontiguousarray(coded_sp_converted)
        decoded_sp_converted = world_decode_spectral_envelop(coded_sp=coded_sp_converted, fs=hp.sampling_rate)
        wav_transformed = world_speech_synthesis(f0=f0_converted, decoded_sp=decoded_sp_converted, ap=ap, fs=hp.sampling_rate,
                                                frame_period=hp.duration)
        wav_transformed *= 1. / max(0.01, np.max(np.abs(wav_transformed)))

        # 경로 폴더 생성
        directory = os.path.join(self.basepath, 'inference', uuid, self.domain_match(y_atr))
        if not os.path.exists(directory):
                os.makedirs(directory)
        # wav 저장
        librosa.output.write_wav(os.path.join(self.basepath, 'inference', uuid, self.domain_match(y_atr), f'{alpha[0]}.wav'), wav_transformed, hp.sampling_rate)
        return os.path.join(self.basepath, 'inference', uuid, self.domain_match(y_atr), f'{alpha[0]}.wav')

    @overrides
    def handle_event(self, event):
        if event.type == EventType.DATA_ARRIVED:
            model_input = event.payload
            uuid = model_input['uuid']
            request_time = model_input['request_time']
            emotion = model_input['emotion']
            intensity = model_input['intensity']
            wav_path = os.path.join(self.basepath, 'inference', uuid, 'input.wav')
            print('DataManager', wav_path, emotion, intensity)

            # model inference
            model_output = self.predict(uuid, wav_path, 3, self.domain_match(emotion), intensity) # 시작은 neutral
            print(model_output)

            # wav -> mp3
            command = ['ffmpeg']
            command += ['-i', model_output]
            command += ['-acodec', 'libmp3lame']
            command += [os.path.join(self.basepath, 'inference', uuid, emotion, f'{intensity}.mp3')]
            
            subprocess.run(command, shell=True, check=True)

            # server에서 받을 이벤트 생성 (RESULT_ARRIVED)
            result_event = Event(payload={'uuid':uuid, 'request_time':request_time}, type=EventType.RESULT_ARRIVED)
            self.publish_event(result_event)
            return 'result arrived'
