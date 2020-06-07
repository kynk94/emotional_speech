from enum import auto
from enum import Enum
from typing import Any
from dataclasses import dataclass


class EventType(Enum):
    """Event type enum class."""
    DATA_ARRIVED = auto()
    RESULT_ARRIVED = auto()


@dataclass
class Event:
    """Event data class."""
    payload: Any
    type: EventType
