import connexion
import six

from api import util


def example_get():  # noqa: E501
    """Server example operation

    This is an example operation to show how security is applied to the call. # noqa: E501


    :rtype: None
    """
    return 'do some magic!'


def ping_get():  # noqa: E501
    """Server heartbeat operation

    This operation shows how to override the global security defined above, as we want to open it up for all users. # noqa: E501


    :rtype: None
    """
    return 'do some magic!'
