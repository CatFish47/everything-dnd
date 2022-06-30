type ColorPickerProps = {
  name: string
  onChange: (e: any) => void
}

const ColorPicker = (props: ColorPickerProps) => {
  const {name, onChange: handleChange} = props

  return (
    <div className="flex">
      <input type="color" onChange={handleChange} className="mx-3" />
      <span className="mx-3">{name}</span>
    </div>
  )
}

export default ColorPicker
