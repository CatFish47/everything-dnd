import { RegularPolygon } from 'react-konva'

type TileProps = {
  radius: number
  x: number
  y: number
  q: number
  r: number
  s: number
  fill: string
  onTileDraw: (e: any, q: number, r: number, s: number) => void
}

const Tile = (props: TileProps) => {
  const { radius, x, y, q, r, s, fill, onTileDraw: handleTileDraw } = props

  const handleMouseUp = (e: any) => {
    handleTileDraw(e, q, r, s)
  }

  const handleMouseMove = (e: any) => {
    handleTileDraw(e, q, r, s)
  }

  return (
    <RegularPolygon
      sides={6}
      radius={radius * 0.99}
      fill={fill}
      x={x}
      y={y}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  )
}

export default Tile
