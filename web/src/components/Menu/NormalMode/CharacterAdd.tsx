import { useRef, useState } from 'react'
import { Character } from 'types/graphql'

type CharacterAddProps = {
  characterDataArr: Character[]
  onAdd: (name: string) => void
}

const CharacterAdd = (props: CharacterAddProps) => {
  const ref = useRef(null)

  // const [health, setHealth] = useState(0)

  // const { onApply: handleApplyHP } = props
  const { characterDataArr, onAdd: handleAdd } = props

  const defaultOption = 'Add a character'

  const [selectedChar, setSelectedChar] = useState(defaultOption)

  const handleChange = (e: any) => {
    setSelectedChar(e.target.value)
  }

  const handleClick = (e: any) => {
    handleAdd(selectedChar)
  }

  return (
    <div className="card bg-base-200 shadow-l">
      <div className="card-body items-center">
        {/* <h2 className="card-title">Add a character</h2> */}
        <div className="card-actions w-full">
          <div className="form-control">
            <div className="input-group">
              <select
                className="select select-bordered"
                ref={ref}
                value={selectedChar}
                onChange={handleChange}
              >
                <option disabled>{defaultOption}</option>
                <option disabled>---</option>
                {characterDataArr &&
                  characterDataArr
                    .filter((char) => char.isPlayer)
                    .map((char) => {
                      return <option key={char.name}>{char.name}</option>
                    })}
                <option disabled>---</option>
                {characterDataArr &&
                  characterDataArr
                    .filter((char) => !char.isPlayer)
                    .map((char) => {
                      return <option key={char.name}>{char.name}</option>
                    })}
              </select>
              <button className="btn" onClick={handleClick}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterAdd
