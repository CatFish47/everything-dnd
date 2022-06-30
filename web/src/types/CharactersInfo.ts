export type CharInfo = {
  fill: string
  isPlayer: boolean
  q: number
  r: number
  s: number
  str: number
  dex: number
  con: number
  int: number
  wis: number
  cha: number
  hp: number
  maxhp: number
  ac: number
  lvl: number
  speed: number
}

export interface CharactersInfo {
  [key: string]: CharInfo
}
