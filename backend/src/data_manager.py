from overrides import overrides
from event import EventType
from event_handler import EventHandler

import os
import pymysql
# import ffmpeg

class DataManager(EventHandler):

    def __init__(self, dispatcher, logger):
        super().__init__(dispatcher, logger)

        self.conn = pymysql.connect(host='127.0.0.1', user='root', password='root',
                                    db='emo_speech', charset='utf8', port=33906)

    @overrides
    def handle_event(self, event):
        if event.type == EventType.DATA_ARRIVED:
            model_input = event.payload
            uuid = model_input['uuid']
            request_time = model_input['request_time']
            emotion = model_input['emotion']
            intensity = model_input['intensity']
            basepath = os.path.dirname(__file__)
            wav_path = os.path.join(basepath, 'inference', uuid, 'input.wav')
            print('DataManager', wav_path, emotion, intensity)

            # model inference


            # wav -> mp3
            # stream = ffmpeg.input('output.wav')
            # stream = ffmpeg.hflip(stream)
            # stream = ffmpeg.output(stream, f'{intensity}.mp3')
            # ffmpeg.run(stream)

            # Status True
            curs = self.conn.cursor()
            sql = """update InferenceStatus
                set status = True
                where uuid = %s and request_time = %s"""
            curs.execute(sql, (uuid, request_time))
            self.conn.commit()
            self.conn.close()

            return