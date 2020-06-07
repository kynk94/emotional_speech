from overrides import overrides
from event import EventType
from event_handler import EventHandler


class DataManager(EventHandler):

    def __init__(self, dispatcher, logger):
        super().__init__(dispatcher, logger)

    @overrides
    def handle_event(self, event):
        if event.type == EventType.DATA_ARRIVED:
            return
