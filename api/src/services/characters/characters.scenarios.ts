import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CharacterCreateArgs>({
  character: {
    one: {
      data: {
        image: 'String',
        isPlayer: true,
        name: 'String',
        str: 529190,
        dex: 466187,
        con: 7179061,
        int: 4115748,
        wis: 9501808,
        cha: 9442378,
        hp: 3472428,
        ac: 1587397,
        lvl: 7965746,
        speed: 5951857,
      },
    },
    two: {
      data: {
        image: 'String',
        isPlayer: true,
        name: 'String',
        str: 7925144,
        dex: 2694206,
        con: 8136331,
        int: 7264024,
        wis: 5213113,
        cha: 7692843,
        hp: 9709771,
        ac: 1352663,
        lvl: 9377337,
        speed: 5604025,
      },
    },
  },
})

export type StandardScenario = typeof standard
