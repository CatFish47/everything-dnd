export const schema = gql`
  type Character {
    id: Int!
    image: String!
    isPlayer: Boolean!
    name: String!
    str: Int!
    dex: Int!
    con: Int!
    int: Int!
    wis: Int!
    cha: Int!
    hp: Int!
    ac: Int!
    lvl: Int!
    speed: Int!
  }

  type Query {
    characters: [Character!]! @requireAuth
    character(id: Int!): Character @requireAuth
  }

  input CreateCharacterInput {
    image: String!
    isPlayer: Boolean!
    name: String!
    str: Int!
    dex: Int!
    con: Int!
    int: Int!
    wis: Int!
    cha: Int!
    hp: Int!
    ac: Int!
    lvl: Int!
    speed: Int!
  }

  input UpdateCharacterInput {
    image: String
    isPlayer: Boolean
    name: String
    str: Int
    dex: Int
    con: Int
    int: Int
    wis: Int
    cha: Int
    hp: Int
    ac: Int
    lvl: Int
    speed: Int
  }

  type Mutation {
    createCharacter(input: CreateCharacterInput!): Character! @requireAuth
    updateCharacter(id: Int!, input: UpdateCharacterInput!): Character!
      @requireAuth
    deleteCharacter(id: Int!): Character! @requireAuth
  }
`
