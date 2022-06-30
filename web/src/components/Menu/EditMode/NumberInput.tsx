type TextInputProps = {
  value: number
  onChange: (e: any) => void
}

const NumberInput = (props: TextInputProps) => {
  const {value, onChange: handleChange} = props;

  return (
    <div className="form-control">
      <label className="input-group">
        <span>Grid Size</span>
        <input
          type="number"
          className="input input-bordered"
          value={value}
          onChange={handleChange}
        />
      </label>
    </div>
  )
}

export default NumberInput
