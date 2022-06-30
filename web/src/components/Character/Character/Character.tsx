import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_CHARACTER_MUTATION = gql`
  mutation DeleteCharacterMutation($id: Int!) {
    deleteCharacter(id: $id) {
      id
    }
  }
`

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

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
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

const Character = ({ character }) => {
  const [deleteCharacter] = useMutation(DELETE_CHARACTER_MUTATION, {
    onCompleted: () => {
      toast.success('Character deleted')
      navigate(routes.characters())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete character ' + id + '?')) {
      deleteCharacter({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">Character {character.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{character.id}</td>
            </tr><tr>
              <th>Image</th>
              <td>{character.image}</td>
            </tr><tr>
              <th>Is player</th>
              <td>{checkboxInputTag(character.isPlayer)}</td>
            </tr><tr>
              <th>Name</th>
              <td>{character.name}</td>
            </tr><tr>
              <th>Str</th>
              <td>{character.str}</td>
            </tr><tr>
              <th>Dex</th>
              <td>{character.dex}</td>
            </tr><tr>
              <th>Con</th>
              <td>{character.con}</td>
            </tr><tr>
              <th>Int</th>
              <td>{character.int}</td>
            </tr><tr>
              <th>Wis</th>
              <td>{character.wis}</td>
            </tr><tr>
              <th>Cha</th>
              <td>{character.cha}</td>
            </tr><tr>
              <th>Hp</th>
              <td>{character.hp}</td>
            </tr><tr>
              <th>Ac</th>
              <td>{character.ac}</td>
            </tr><tr>
              <th>Lvl</th>
              <td>{character.lvl}</td>
            </tr><tr>
              <th>Speed</th>
              <td>{character.speed}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCharacter({ id: character.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(character.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Character
