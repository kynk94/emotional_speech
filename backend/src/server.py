from threading import Thread
from event import Event
from event import EventType
from event_handler import EventHandler
from overrides import overrides
from flask import request
from flask import jsonify
from flask_cors import CORS


class Server(EventHandler):

    def __init__(self, dispatcher, logger, app):
        super().__init__(dispatcher, logger)
        self._app = app
        self._app.add_url_rule('/speech', 'speech', self.handle_data,
                               methods=['POST'])
        self._app.add_url_rule('/result', 'result', self.handle_result,
                               methods=['GET'])
        CORS(self._app)

        self._server_thread = None
        self._run_server()

    def _run_server(self):
        self._server_thread = Thread(target=self._app.run, args=['0.0.0.0'],
                                     daemon=True)
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
        speech = request.form.get(key='speech', type=str)
        return speech

    def handle_result(self):
        return
