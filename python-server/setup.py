# coding: utf-8

import sys
from setuptools import setup, find_packages

NAME = "api"
VERSION = "1.0.0"
# To install the library, run the following
#
# python setup.py install
#
# prerequisite: setuptools
# http://pypi.python.org/pypi/setuptools

REQUIRES = ["connexion"]

setup(
    name=NAME,
    version=VERSION,
    description="Sample Application Flow OAuth2 Project",
    author_email="",
    url="",
    keywords=["Swagger", "Sample Application Flow OAuth2 Project"],
    install_requires=REQUIRES,
    packages=find_packages(),
    package_data={'': ['swagger/swagger.yaml']},
    include_package_data=True,
    entry_points={
        'console_scripts': ['api=api.__main__:main']},
    long_description="""\
    This is an example of using OAuth2 Application Flow in a specification to describe security to your API.
    """
)
