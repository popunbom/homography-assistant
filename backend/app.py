#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import logging
from typing import List

import uvicorn
from fastapi import FastAPI, Request
from pydantic import BaseModel

import lib.img_util as util
from lib.entity import ImageSize, Vector2d
from lib.homography import projective_transform


app = FastAPI()
logger = logging.getLogger("uvicorn.error")


class TransformRequest(BaseModel):
    over_image: str
    base_image_size: ImageSize
    base_points: List[Vector2d]
    over_points: List[Vector2d]


@app.post("/api/transform")
async def api_endpoint(transform: TransformRequest, request: Request):
    # logger.debug(await request.body())

    transformed_img = util.ndarray_to_data_url(
        projective_transform(
            util.data_url_to_ndarray(transform.over_image),
            transform.over_points,
            transform.base_points,
            transform.base_image_size
        )
    )

    return {"img": transformed_img}


if __name__ == '__main__':
    uvicorn.run("__main__:app", host="127.0.0.1", port=5000, log_level="debug")
