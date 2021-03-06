import { useRef, useState } from "react"

type CharacterActionsProps = {
  onApply: (hpChange: number) => void
  onDelete: () => void
}

const CharacterActions = (props: CharacterActionsProps) => {
  const ref = useRef(null)

  const [health, setHealth] = useState(0)

  const {onApply: handleApplyHP, onDelete: handleDelete} = props

  const handleChange = (e: any) => {
    setHealth(Math.floor(Math.abs(+ref.current.value)))
  }

  return (
    <div className="card bg-base-200 shadow-l">
      <div className="card-body items-center">
        <h2 className="card-title">Actions</h2>
        <div className="card-actions items-center flex-col">
          <div className="form-control">
            <label className="label">
              <span className="label-text">HP</span>
            </label>
            <div className="input-group">
              <button
                className="btn btn-square btn-error"
                onClick={() => handleApplyHP(-health)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <input
                type="number"
                placeholder="HP"
                className="input input-bordered text-center"
                ref={ref}
                onChange={handleChange}
                value={health}
              />
              <button
                className="btn btn-square btn-success"
                onClick={() => handleApplyHP(+health)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
          <div className="divider"/>
          <button className="btn btn-error" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default CharacterActions
