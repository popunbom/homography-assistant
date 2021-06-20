import type Konva from "konva";

export interface ScalableStageConfig {
  width: number
  height: number
  scale: Konva.Vector2d
};

/**
 * 画像の大きさを考慮して ScalableStageConfig を計算する
 * @param width 幅
 * @param height 高さ
 * @param image Stage 内に配置される画像
 * @returns ScalableStageConfig
 */
export function calcStageConfig(
  width: number | undefined,
  height: number | undefined,
  image: HTMLImageElement
): ScalableStageConfig {
  console.debug(arguments)
  if (width !== undefined && height !== undefined) {
    // Fit to canvas size
    return {
      width,
      height,
      scale: {
        x: (width >= height) ? width / image.naturalWidth : height / image.naturalHeight,
        y: (width >= height) ? width / image.naturalWidth : height / image.naturalHeight,
      },
    }
  } else {
    if (width !== undefined) {
      // Fit to image width
      return {
        width: width,
        height: image.naturalHeight * (width / image.naturalWidth),
        scale: {
          x: width / image.naturalWidth,
          y: width / image.naturalWidth,
        },
      }
    } else {
      // Fit to image height
      return {
        width: image.naturalWidth * (height / image.naturalHeight),
        height: height,
        scale: {
          x: height / image.naturalHeight,
          y: height / image.naturalHeight,
        },
      }
    }
  }
}
