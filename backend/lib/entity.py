#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from pydantic import BaseModel


class ImageSize(BaseModel):
    """ 画像サイズ """
    width: int
    height: int


class Vector2d(BaseModel):
    """ 二次元座標 """
    x: float
    y: float
