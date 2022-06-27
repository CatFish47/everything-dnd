export default function keyGen(q: number, r: number, s: number, gridSize: number) {
  const newQ = q + gridSize
  const newR = r + gridSize
  const newS = s + gridSize

  return `${newQ}${newR}${newS}`
}
