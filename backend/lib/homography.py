from typing import List
import cv2
import numpy as np

from lib.entity import ImageSize, Vector2d


def projective_transform(img: np.ndarray,
                         points_img: List[Vector2d],
                         points_another: List[Vector2d],
                         dst_img_size: ImageSize
                         ):
    """
    2画像間で射影変換を行う

    Parameters
    ----------
    img : numpy.ndarray
        入力画像

    points_img: List[Vector2d]
        画像 `img` における対応点 (2次元配列)

    points_another : List[Vector2d]
        もう一方の画像における対応点  (2次元配列)

    dst_img_size : ImageSize
        生成される画像の大きさ

    Returns
    -------
    numpy.ndarray
        射影変換結果画像 (BGRA カラー画像)
    """

    # Convert image
    if img.ndim == 2:
        img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGRA)
    elif img.ndim == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

    # Convert to numpy.ndarray
    points_img = np.float32([[p.x, p.y] for p in points_img])
    points_another = np.float32([[p.x, p.y] for p in points_another])

    # 射影変換行列を計算
    # 0 - a regular method using all the points, i.e., the least squares method
    M, _ = cv2.findHomography(points_img, points_another, 0)

    transformed_img = cv2.warpPerspective(
        img,
        M,
        (dst_img_size.width, dst_img_size.height),
        borderMode=cv2.BORDER_CONSTANT,
        borderValue=(0, 0, 0, 0)
    )

    return transformed_img
