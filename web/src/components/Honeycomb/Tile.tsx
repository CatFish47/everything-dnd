import { RegularPolygon } from 'react-konva'

type TileProps = {
  radius: number
  x: number
  y: number
  q: number
  r: number
  s: number
  fill: string
}

const Tile = (props: TileProps) => {
  const { radius, x, y, q, r, s, fill } = props

  const handleClick = (e) => {
    console.log(q, r, s)
  }

  return (
    <RegularPolygon
      sides={6}
      radius={radius}
      fill={fill}
      x={x}
      y={y}
      onClick={handleClick}
    />
  )
}

export default Tile
