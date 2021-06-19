#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import logging
from typing import List

import uvicorn
from fastapi import FastAPI, Request
from pydantic import BaseModel

import lib.img_util as util
from lib.homography import projective_transform


app = FastAPI()
logger = logging.getLogger("uvicorn.error")


class TransformRequest(BaseModel):
    img: str
    points_img: List[List[float]]
    points_another: List[List[float]]
    width: int
    height: int


@app.post("/api")
async def api_endpoint(transform: TransformRequest, request: Request):
    # logger.debug(transform)

    transformed_img = util.ndarray_to_data_url(
        projective_transform(
            util.data_url_to_ndarray(transform.img),
            transform.points_img,
            transform.points_another,
            transform.width,
            transform.height
        )
    )

    return {"img": transformed_img}


if __name__ == '__main__':
    uvicorn.run("__main__:app", host="127.0.0.1", port=5000, log_level="debug")
