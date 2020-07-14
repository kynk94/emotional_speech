# Data parameters
sampling_rate = 16000
num_mceps = 36
frame_period = 5.0
n_frames = 128
duration = 5.0
output_size = 256
seed = 65535
num_domains = 5 # 추가한값 지금 num_domain 5 맞나??

# Training parameters
num_iterations = 50001
batch_size = 4
generator_lr = 0.0002
discriminator_lr = 0.0001
lambda_cycle = 8
lambda_identity = 8
lambda_interp = 10
lambda_triangle = 0
lambda_backward = 5
lambda_conditional = 5
lambda_mode_seeking = 1

logdir = 'logdir'
weights_dir = 'weights_50k'
stop_D_train = 1000
