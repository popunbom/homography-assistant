import mime from "mime";
import { getPos } from "../entities/Point";
import type { Point } from "../entities/Point";

export function exportPointsAsJSON(
  basePoint: Point[],
  overPoint: Point[],
): string {
  return JSON.stringify(
    basePoint.map((_, i: number) => ({
      base: getPos(basePoint[i]),
      over: getPos(overPoint[i]),
    })),
    null,
    2,
  );
}

export function exportPointsAsCSV(
  basePoint: Point[],
  overPoint: Point[],
): string {
  const headers = ["base.X", "base.Y", "over.X", "over.Y"];

  let csv: string = headers.join(",") + "\n";
  for (let i = 0; i < basePoint.length; i++) {
    const [base, over] = [getPos(basePoint[i]), getPos(overPoint[i])];
    csv += [base.x, base.y, over.x, over.y].join(", ") + "\n";
  }

  return csv;
}

export function saveFile(content: string, filename: string) {
  // REF: https://kuroeveryday.blogspot.com/2016/05/file-download-from-browser.html
  const blob = new Blob([content], { type: mime.getType(filename) });

  const a = document.createElement("a");
  a.download = filename;
  a.target = "_blank";

  if (window.navigator.msSaveBlob) {
    // for IE
    window.navigator.msSaveBlob(blob, filename);
  } else if (window.URL && window.URL.createObjectURL) {
    // for Firefox
    a.href = window.URL.createObjectURL(blob);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } else if (window.webkitURL && window.webkitURL.createObjectURL) {
    // for Chrome
    a.href = window.webkitURL.createObjectURL(blob);
    a.click();
  } else {
    // for Safari
    window.open(`data:text/plain;base64,${btoa(content)}`, "_blank");
  }
}
