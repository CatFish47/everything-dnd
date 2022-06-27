import { RegularPolygon } from 'react-konva'

type TileProps = {
  radius: number
  x: number
  y: number
  q: number
  r: number
  s: number
  fill: string
  onTileClick: (e: any, q: number, r: number, s: number) => void
}

const Tile = (props: TileProps) => {
  const { radius, x, y, q, r, s, fill, onTileClick: handleTileClick } = props

  const handleClick = (e: any) => {
    handleTileClick(e, q, r, s)
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
