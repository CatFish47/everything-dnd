export default function npcTagGen(length: number) {
  const start = 2

  return Math.random()
    .toString()
    .substring(start, start + length)
}
