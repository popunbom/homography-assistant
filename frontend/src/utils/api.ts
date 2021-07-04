import type { PointSelector } from "src/entities/PointSelector";

/**
 * BE API に射影変換リクエストを送信する
 * @param base 基準画像と対応点
 * @param over 変形画像と対応点
 * @returns Promise&lt;HTMLImageElement&gt;
 */
export function sendTransformRequest(
  base: PointSelector,
  over: PointSelector,
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const base_points = base.points.map((point) => point.kGroup.position());
    const over_points = over.points.map((point) => point.kGroup.position());

    if (base_points.length < 4 || over_points.length < 4) {
      reject("最低4点以上の対応点が必要です");
    }
    if (base_points.length != over_points.length) {
      reject("対応点の数が一致しません");
    }

    const payload = {
      over_image: over.image.src,
      base_image_size: {
        width: base.image.naturalWidth,
        height: base.image.naturalHeight,
      },
      base_points,
      over_points,
    };

    fetch("/api/transform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((resp) => {
        console.debug(resp);
        return resp.json();
      })
      .then((resp) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = resp.img;
      })
      .catch((error) => {
        reject("BE との通信エラーです (詳細はコンソールを参照)");
        console.error(error);
      });
  });
}
