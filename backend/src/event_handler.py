"""Base class for multiple event consumer & producer model."""
from abc import ABC, abstractmethod
from threading import Thread
from queue import Queue

from overrides import final, EnforceOverrides
from event import Event


class EventHandler(ABC, EnforceOverrides):
    """Base class for multiple event consumer & producer model."""

    def __init__(self, dispatcher, logger):
        self._dispatcher = dispatcher
        self.logger = logger
        self._event_queue = Queue()
        self.event_loop = Thread(target=self.run_event_loop, daemon=True)
        self.event_loop.start()

    @final
    def subscribe_events(self, event_type_list):
        """Subscribe the given event types."""
        for event_type in event_type_list:
            self._dispatcher.connect(self._on_event,
                                     signal=event_type)

    @final
    def publish_event(self, event):
        """Publish the given event."""
        if not isinstance(event, Event):
            self.logger.error('Wrong event data')
        self._dispatcher.send(event=event,
                              signal=event.type)
        self.logger.info(f'Event published: {event}')

    @final
    def run_event_loop(self):
        """Infinitely receive & handle events."""
        while True:
            event = self._event_queue.get()
            try:
                self.handle_event(event)
            except Exception as error:  # pylint: disable=broad-except
                self.logger.error('Error occurred while handling events')
                self.logger.error(f'error: {error}')

    def _on_event(self, event):
        """Enqueue received event."""
        self._event_queue.put(event)

    @abstractmethod
    def handle_event(self, event):
        """Run event handler. Recommended to run infinite loop
        to not terminate this event handler."""
