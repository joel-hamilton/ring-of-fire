#!/usr/bin/env python3

import connexion
from dotenv import load_dotenv
load_dotenv(dotenv_path="../.servers.env")

from api import encoder


def main():
    app = connexion.App(__name__, specification_dir='./swagger/')
    app.app.json_encoder = encoder.JSONEncoder
    app.add_api('swagger.yaml', arguments={'title': 'Sample Application Flow OAuth2 Project'}, pythonic_params=True)
    app.run(port=8080, debug=True)


if __name__ == '__main__':
    main()
