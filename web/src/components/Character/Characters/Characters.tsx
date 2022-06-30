import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Character/CharactersCell'

const DELETE_CHARACTER_MUTATION = gql`
  mutation DeleteCharacterMutation($id: Int!) {
    deleteCharacter(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const CharactersList = ({ characters }) => {
  const [deleteCharacter] = useMutation(DELETE_CHARACTER_MUTATION, {
    onCompleted: () => {
      toast.success('Character deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete character ' + id + '?')) {
      deleteCharacter({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Is player</th>
            <th>Name</th>
            <th>Str</th>
            <th>Dex</th>
            <th>Con</th>
            <th>Int</th>
            <th>Wis</th>
            <th>Cha</th>
            <th>Hp</th>
            <th>Ac</th>
            <th>Lvl</th>
            <th>Speed</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr key={character.id}>
              <td>{truncate(character.id)}</td>
              <td>{truncate(character.image)}</td>
              <td>{checkboxInputTag(character.isPlayer)}</td>
              <td>{truncate(character.name)}</td>
              <td>{truncate(character.str)}</td>
              <td>{truncate(character.dex)}</td>
              <td>{truncate(character.con)}</td>
              <td>{truncate(character.int)}</td>
              <td>{truncate(character.wis)}</td>
              <td>{truncate(character.cha)}</td>
              <td>{truncate(character.hp)}</td>
              <td>{truncate(character.ac)}</td>
              <td>{truncate(character.lvl)}</td>
              <td>{truncate(character.speed)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.character({ id: character.id })}
                    title={'Show character ' + character.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCharacter({ id: character.id })}
                    title={'Edit character ' + character.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete character ' + character.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(character.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CharactersList
