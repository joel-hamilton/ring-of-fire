# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from api.test import BaseTestCase


class TestDefaultController(BaseTestCase):
    """DefaultController integration test stubs"""

    def test_example_get(self):
        """Test case for example_get

        Server example operation
        """
        response = self.client.open(
            '/joelhamilton/the-api/1.0.0/example',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_ping_get(self):
        """Test case for ping_get

        Server heartbeat operation
        """
        response = self.client.open(
            '/joelhamilton/the-api/1.0.0/ping',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
