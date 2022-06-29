export type CharInfo = {
  fill: string
  isPlayer: boolean
  q: number
  r: number
  s: number
}

export interface CharactersInfo {
  [key: string]: CharInfo
}
