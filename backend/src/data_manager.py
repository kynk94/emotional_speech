from overrides import overrides
from event import Event
from event import EventType
from event_handler import EventHandler

from werkzeug.utils import secure_filename
import os
from flask import request, render_template

import numpy as np

# Keras
from tensorflow.keras.applications.imagenet_utils import preprocess_input, decode_predictions
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image


class DataManager(EventHandler):

    def __init__(self, dispatcher, logger):
        super().__init__(dispatcher, logger)
        # Model saved with Keras model.save()
        MODEL_PATH = 'models/model_resnet.h5'

        # Load your trained model
        self.model = load_model(MODEL_PATH)  

    def _model_predict(self, img_path, model):
        img = image.load_img(img_path, target_size=(224, 224))

        # Preprocessing the image
        x = image.img_to_array(img)
        # x = np.true_divide(x, 255)
        x = np.expand_dims(x, axis=0)

        # Be careful how your trained model deals with the input
        # otherwise, it won't make correct prediction!
        x = preprocess_input(x, mode='caffe')

        preds = model.predict(x)
        return preds

    @overrides
    def handle_event(self, event):
        if event.type == EventType.DATA_ARRIVED:
            file_path = event.payload
            print('event.payload', event.payload)
            

            # Make prediction
            preds = self._model_predict(file_path, self.model)

            # Process your result for human
            # pred_class = preds.argmax(axis=-1)            # Simple argmax
            pred_class = decode_predictions(preds, top=1)   # ImageNet Decode
            result = str(pred_class[0][0][1])               # Convert to string
            event = Event(payload=result, type=EventType.RESULT_ARRIVED)
            self.publish_event(event)
            print(result)
                    
            return result