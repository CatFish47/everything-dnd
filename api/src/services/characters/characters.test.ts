import {
  characters,
  character,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from './characters'
import type { StandardScenario } from './characters.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('characters', () => {
  scenario('returns all characters', async (scenario: StandardScenario) => {
    const result = await characters()

    expect(result.length).toEqual(Object.keys(scenario.character).length)
  })

  scenario('returns a single character', async (scenario: StandardScenario) => {
    const result = await character({ id: scenario.character.one.id })

    expect(result).toEqual(scenario.character.one)
  })

  scenario('creates a character', async () => {
    const result = await createCharacter({
      input: {
        image: 'String',
        isPlayer: true,
        name: 'String',
        str: 5004205,
        dex: 3406665,
        con: 9699486,
        int: 6513227,
        wis: 732741,
        cha: 5284749,
        hp: 4532252,
        ac: 5807040,
        lvl: 1195561,
        speed: 9364980,
      },
    })

    expect(result.image).toEqual('String')
    expect(result.isPlayer).toEqual(true)
    expect(result.name).toEqual('String')
    expect(result.str).toEqual(5004205)
    expect(result.dex).toEqual(3406665)
    expect(result.con).toEqual(9699486)
    expect(result.int).toEqual(6513227)
    expect(result.wis).toEqual(732741)
    expect(result.cha).toEqual(5284749)
    expect(result.hp).toEqual(4532252)
    expect(result.ac).toEqual(5807040)
    expect(result.lvl).toEqual(1195561)
    expect(result.speed).toEqual(9364980)
  })

  scenario('updates a character', async (scenario: StandardScenario) => {
    const original = await character({ id: scenario.character.one.id })
    const result = await updateCharacter({
      id: original.id,
      input: { image: 'String2' },
    })

    expect(result.image).toEqual('String2')
  })

  scenario('deletes a character', async (scenario: StandardScenario) => {
    const original = await deleteCharacter({ id: scenario.character.one.id })
    const result = await character({ id: original.id })

    expect(result).toEqual(null)
  })
})
