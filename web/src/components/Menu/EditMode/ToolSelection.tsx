import { TOOLS } from 'src/utilities/consts'

type ToolSelectionProps = {
  setToolMode: (tool: string) => void
}

const ToolSelection = (props: ToolSelectionProps) => {
  const { setToolMode } = props

  return (
    <div className="btn-group justify-center mb-5">
      {/* <input
        type="radio"
        name="tool"
        className="btn"
        data-title="Pointer"
        onClick={() => {
          setToolMode(TOOLS.pointer)
        }}
        defaultChecked={true}
      /> */}
      <input
        type="radio"
        name="tool"
        className="btn"
        data-title="Pan"
        onClick={() => {
          setToolMode(TOOLS.pan)
        }}
        defaultChecked
      />
      <input
        type="radio"
        name="tool"
        className="btn"
        data-title="Brush"
        onClick={() => {
          setToolMode(TOOLS.brush)
        }}
      />
      <input
        type="radio"
        name="tool"
        className="btn"
        data-title="Erase"
        onClick={() => {
          setToolMode(TOOLS.erase)
        }}
      />
    </div>
  )
}

export default ToolSelection
