export function axialToCartesian(
  q: number,
  r: number,
  s: number,
  tileSize: number
) {
  const a = (Math.sqrt(3) / 2) * tileSize
  const b = (3 / 4) * tileSize

  return {
    x: a * q - a * s,
    y: -b * q + b * r - b * s,
  }
}

export function cartesianToAxial(x: number, y: number, tileSize: number) {
  const a = (Math.sqrt(3) / 2) * tileSize
  const b = (3 / 4) * tileSize

  const q = Math.round(x / (2 * a) - y / (4 * b))
  const r = Math.round(y / (2 * b))
  const s = -(q + r)

  return { q, r, s }
}
