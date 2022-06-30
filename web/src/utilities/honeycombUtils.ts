export function generateLine(
  q1: number,
  r1: number,
  s1: number,
  q2: number,
  r2: number,
  s2: number,
  tileSize: number
) {
  const { x: xStart, y: yStart } = cubeToCartesian(q1, r1, s1, tileSize)
  const { x: xEnd, y: yEnd } = cubeToCartesian(q2, r2, s2, tileSize)
  const n = distance(q1, r1, s1, q2, r2, s2)

  let tileLine = []

  for (let i = 0; i < n; i++) {
    const xLerp = xStart + ((xEnd - xStart) / n) * i
    const yLerp = yStart + ((yEnd - yStart) / n) * i

    const newTile = { ...cartesianToCube(xLerp, yLerp, tileSize), i }

    tileLine = [...tileLine, newTile]
  }

  return tileLine
}

export function roundNearestHex(q: number, r: number, s: number) {
  const qNear = Math.round(q)
  const rNear = Math.round(r)
  const sNear = Math.round(s)

  const qDiff = Math.abs(qNear - q)
  const rDiff = Math.abs(rNear - r)
  const sDiff = Math.abs(sNear - s)

  if (qDiff > rDiff && qDiff > sDiff) {
    return {
      q: -rNear - sNear,
      r: rNear,
      s: sNear,
    }
  } else if (rDiff > sDiff) {
    return {
      q: qNear,
      r: -qNear - sNear,
      s: sNear,
    }
  } else {
    return {
      q: qNear,
      r: rNear,
      s: -qNear - rNear,
    }
  }
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

export function cubeToCartesian(
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

export function cartesianToCube(x: number, y: number, tileSize: number) {
  const a = (Math.sqrt(3) / 2) * tileSize
  const b = (3 / 4) * tileSize

  const qFrac = x / (2 * a) - y / (4 * b)
  const rFrac = y / (2 * b)
  const sFrac = -qFrac - rFrac

  return roundNearestHex(qFrac, rFrac, sFrac)
}

export function getTilesInRadius(q: number, r: number, s: number, n: number) {
  let possibleTiles = []
  for (let qIter = -n; qIter <= n; qIter++) {
    for (
      let rIter = Math.max(-n, -qIter - n);
      rIter <= Math.min(n, n - qIter);
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

export function keyGen(q: number, r: number, s: number, gridSize: number) {
  const newQ = +q + +gridSize
  const newR = +r + +gridSize
  const newS = +s + +gridSize

  return `${newQ} ${newR} ${newS}`
}
