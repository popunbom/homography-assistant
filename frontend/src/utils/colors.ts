import chroma from "chroma-js"

export interface Color {
  bg: string
  fg: string
}

export function pickColor(index: number): Color {
  const colors = chroma.brewer.Set3

  return {
    bg: colors[index % colors.length],
    fg: chroma("black").hex(),
  }
}
