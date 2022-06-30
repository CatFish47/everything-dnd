import type { EditCharacterById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CharacterForm from 'src/components/Character/CharacterForm'

export const QUERY = gql`
  query EditCharacterById($id: Int!) {
    character: character(id: $id) {
      id
      image
      isPlayer
      name
      str
      dex
      con
      int
      wis
      cha
      hp
      ac
      lvl
      speed
    }
  }
`
const UPDATE_CHARACTER_MUTATION = gql`
  mutation UpdateCharacterMutation($id: Int!, $input: UpdateCharacterInput!) {
    updateCharacter(id: $id, input: $input) {
      id
      image
      isPlayer
      name
      str
      dex
      con
      int
      wis
      cha
      hp
      ac
      lvl
      speed
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ character }: CellSuccessProps<EditCharacterById>) => {
  const [updateCharacter, { loading, error }] = useMutation(UPDATE_CHARACTER_MUTATION, {
    onCompleted: () => {
      toast.success('Character updated')
      navigate(routes.characters())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateCharacter({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Character {character.id}</h2>
      </header>
      <div className="rw-segment-main">
        <CharacterForm character={character} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
