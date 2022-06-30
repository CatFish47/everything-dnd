import { useState, useRef } from 'react'
import { RegularPolygon } from 'react-konva'
import {
  keyGen,
  cartesianToCube,
  cubeToCartesian,
  distance,
  generateLine,
  getTilesInRadius,
} from 'src/utilities/honeycombUtils'

type PlayerProps = {
  radius: number
  x: number
  y: number
  q: number
  r: number
  s: number
  fill: string
  name: string
  onTileClick: (e: any, q: number, r: number, s: number) => void
  onPlayerMove: (e: any, name: string, q: number, r: number, s: number) => void
  onPlayerMouseIn: (e: any, name: string) => void
  onPlayerMouseOut: (e: any, name: string) => void
}

const Player = (props: PlayerProps) => {
  const {
    radius,
    x,
    y,
    q,
    r,
    s,
    fill,
    name,
    onTileClick: handleTileClick,
    onPlayerMove: handlePlayerMove,
    onPlayerMouseIn: handlePlayerMouseIn,
    onPlayerMouseOut: handlePlayerMouseOut,
  } = props

  const [moving, setMoving] = useState(false)
  const [tileLine, setTileLine] = useState([])
  const ref = useRef(null)

  const handleClick = (e: any) => {
    // console.log(ref)
    console.log(`${name} at (${q}, ${r}, ${s}) has been clicked.`)
    // console.log(getTilesInRadius(q, r, s))
  }

  const handleDragStart = (e: any) => {
    setMoving(true)
  }

  const handleDragMove = (e: any) => {
    const {
      q: qApprox,
      r: rApprox,
      s: sApprox,
    } = cartesianToCube(ref.current.attrs.x, ref.current.attrs.y, radius)

    const { x: xSnap, y: ySnap } = cubeToCartesian(
      qApprox,
      rApprox,
      sApprox,
      radius
    )

    setTileLine(generateLine(q, r, s, qApprox, rApprox, sApprox, radius))

    ref.current.attrs.x = xSnap
    ref.current.attrs.y = ySnap
  }

  const handleDragEnd = (e: any) => {
    const {
      q: newQ,
      r: newR,
      s: newS,
    } = cartesianToCube(ref.current.attrs.x, ref.current.attrs.y, radius)

    handlePlayerMove(e, name, newQ, newR, newS)

    setMoving(false)
  }

  return (
    <>
      {moving &&
        tileLine.map((tile) => {
          const { q: qTile, r: rTile, s: sTile, i } = tile

          const { x: tileX, y: tileY } = cubeToCartesian(
            qTile,
            rTile,
            sTile,
            radius
          )

          return (
            <RegularPolygon
              sides={6}
              radius={radius * 0.9}
              fill={fill}
              opacity={0.3}
              x={tileX}
              y={tileY}
              key={i}
            />
          )
        })}
      {/* {moving && (
        <RegularPolygon
          sides={6}
          radius={radius * 0.9}
          fill={fill}
          opacity={0.3}
          x={x}
          y={y}
        />
      )} */}
      <RegularPolygon
        sides={6}
        radius={radius * 0.9}
        fill={fill}
        x={x}
        y={y}
        onClick={handleClick}
        draggable={true}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onMouseEnter={(e) => {
          handlePlayerMouseIn(e, name)
        }}
        onMouseLeave={(e) => {
          handlePlayerMouseOut(e, name)
        }}
        ref={ref}
      />
    </>
  )
}

export default Player
