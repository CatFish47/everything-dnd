import { Character } from "types/graphql"

export type CharInfo = {
  q: number
  r: number
  s: number
  hp: number
  stats: Character
}

export interface CharactersInfo {
  [key: string]: CharInfo
}
