export function generateLine(
  q1: number,
  r1: number,
  s1: number,
  q2: number,
  r2: number,
  s2: number,
  tileSize: number
) {
  const { x: xStart, y: yStart } = axialToCartesian(q1, r1, s1, tileSize)
  const { x: xEnd, y: yEnd } = axialToCartesian(q2, r2, s2, tileSize)
  const n = distance(q1, r1, s1, q2, r2, s2)

  let tileLine = []

  for (let i = 0; i < n; i++) {
    const xLerp = xStart + ((xEnd - xStart) / n) * i
    const yLerp = yStart + ((yEnd - yStart) / n) * i

    const newTile = { ...cartesianToAxial(xLerp, yLerp, tileSize), i }

    tileLine = [...tileLine, newTile]
  }

  return tileLine
}

export function distance(
  q1: number,
  r1: number,
  s1: number,
  q2: number,
  r2: number,
  s2: number
) {
  const dq = Math.abs(q2 - q1)
  const dr = Math.abs(r2 - r1)
  const ds = Math.abs(s2 - s1)

  return Math.max(dq, dr, ds)
}

export function cartesianDist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

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

  const qMid = Math.round(x / (2 * a) - y / (4 * b))
  const rMid = Math.round(y / (2 * b))
  const sMid = -qMid - rMid

  const possibleTiles = getTilesInRadius(qMid, rMid, sMid, 1)
  let minDist = tileSize * 10
  let minCoords = { q: qMid, r: rMid, s: sMid }

  for (let i = 0; i < possibleTiles.length; i++) {
    const { q, r, s } = possibleTiles[i]
    const { x: xIter, y: yIter } = axialToCartesian(q, r, s, tileSize)
    const dist = cartesianDist(x, y, xIter, yIter)

    if (dist < minDist) {
      minDist = dist
      minCoords = { q, r, s }
    }
  }

  return minCoords
}

export function getTilesInRadius(q: number, r: number, s: number, n: number) {
  let possibleTiles = []
  for (let qIter = -n; qIter <= n; qIter++) {
    for (
      let rIter = Math.max(-n, -qIter - n);
      rIter <= Math.min(n, -qIter + n);
      rIter++
    ) {
      const sIter = -qIter - rIter
      possibleTiles = [
        ...possibleTiles,
        { q: qIter + q, r: rIter + r, s: sIter + s },
      ]
    }
  }

  return possibleTiles
}

export default function keyGen(
  q: number,
  r: number,
  s: number,
  gridSize: number
) {
  const newQ = q + gridSize
  const newR = r + gridSize
  const newS = s + gridSize

  return `${newQ}${newR}${newS}`
}
