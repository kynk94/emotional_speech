from threading import Thread
from event import Event
from event import EventType
from event_handler import EventHandler
from overrides import overrides
from flask import request
from flask import jsonify
from flask_cors import CORS


from werkzeug.utils import secure_filename
import os
from flask import request, redirect, url_for

import time


class Server(EventHandler):

    def __init__(self, dispatcher, logger, app):
        super().__init__(dispatcher, logger)
        self._app = app
        self._app.add_url_rule('/speech', 'speech', self.handle_data,
                               methods=['POST'])
        self._app.add_url_rule('/text', 'text', self.handle_text,
                               methods=['POST'])
        self._app.add_url_rule('/image', 'image', self.handle_image,
                               methods=['POST'])
        self._app.add_url_rule('/result', 'result', self.handle_result,
                               methods=['GET'])
        CORS(self._app)

        self._server_thread = None
        self._run_server()

    def _run_server(self):
        self._server_thread = Thread(target=self._app.run, args=['0.0.0.0'], daemon=True)
        #self._server_thread = Thread(target=self._app.run, daemon=True)
        self._server_thread.start()

    @overrides
    def handle_event(self, event):
        if event.type == EventType.DATA_ARRIVED:
            pass
        elif event.type == EventType.RESULT_ARRIVED:
            pass

    def _handle_data_arrived(self, event):
        return

    def _handle_result_arrived(self):
        return

    def handle_data(self):
        speech = request.form.get(key='speech', type=bytes)
        return speech

    def handle_text(self):
        json = request.get_json(silent=True)
        text = json['text']
        event = Event(payload=text, type=EventType.DATA_ARRIVED)
        self.publish_event(event)
        print("handle_text")
        return text

    def handle_image(self):
        files_ids = list(request.files)
        print("\nNumber of Received Images : ", len(files_ids))
        image_num = 1
        for file_id in files_ids:
            print("\nSaving Image ", str(image_num), "/", len(files_ids))
            imagefile = request.files[file_id]
            print("Image Filename : " + imagefile.filename)
            basepath = os.path.dirname(__file__)
            file_path = os.path.join(
                    basepath, 'uploads', secure_filename(imagefile.filename))
            imagefile.save(file_path)
            print("이미지 저장")
            image_num = image_num + 1
        event = Event(payload=file_path, type=EventType.DATA_ARRIVED)
        self.publish_event(event)
        print("handle_image")
        #time.sleep(5)
        return "image arrived"

    
