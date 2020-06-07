import logging.config
import time
import os

from dotenv import load_dotenv
from flask import Flask
from pydispatch import dispatcher
import yaml

from event import EventType
from server import Server
from data_manager import DataManager
from result_manager import ResultManager

load_dotenv()
FLASK_APP = Flask(__name__)


def _load_logger():
    with open(os.getenv('LOGGING_CONFIG_YAML'), 'r') as config_file:
        logging_config = yaml.safe_load(config_file.read())
    logging.config.dictConfig(logging_config)
    return logging.getLogger(os.getenv('LOGGER_NAME'))


def main():
    """Main function."""

    logger = _load_logger()

    server = Server(dispatcher, logger, FLASK_APP)
    data_manager = DataManager(dispatcher, logger)
    result_manager = ResultManager(dispatcher, logger)

    server.subscribe_events([EventType.DATA_ARRIVED,
                             EventType.RESULT_ARRIVED])
    data_manager.subscribe_events([EventType.DATA_ARRIVED])
    result_manager.subscribe_events([EventType.RESULT_ARRIVED])

    try:
        while True:
            time.sleep(0.01)
    finally:
        return


if __name__ == '__main__':
    main()
