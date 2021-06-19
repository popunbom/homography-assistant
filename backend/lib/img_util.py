#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from base64 import b64decode, b64encode

import cv2
import numpy as np


class InvalidDataURL(Exception):
    def __str__(self):
        return "Invalid Data URL"


class DataURLConvertError(Exception):
    def __str__(self):
        return "Cannot convert to Data URL"


def data_url_to_ndarray(data_url: str) -> np.ndarray:
    """
    Data URL から画像 (numpy.ndarray) に変換する

    Parameters
    ----------
    data_url : str
        Data URL

    Returns
    -------
    np.ndarray
        画像データが格納された Numpy 配列
    """

    _, b64_data = data_url.split(",")

    img = cv2.imdecode(
        np.frombuffer(
            b64decode(b64_data),
            dtype=np.uint8
        ),
        cv2.IMREAD_ANYCOLOR
    )

    if img is None:
        raise InvalidDataURL()

    return img


def ndarray_to_data_url(img: np.ndarray) -> str:
    """
    Data URL から画像 (numpy.ndarray) に変換する

    Parameters
    ----------
    img : np.ndarray
        画像データが格納された Numpy 配列

    Returns
    -------
    str
        Data URL
    """

    DATA_URL_PREFIX = "data:image/png;base64"

    success, img_data = cv2.imencode(".png", img)

    if not success:
        raise DataURLConvertError()

    return ",".join([
        DATA_URL_PREFIX,
        b64encode(img_data).decode("ascii")
    ])
