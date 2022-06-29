import { useState, useRef } from 'react'
import { RegularPolygon } from 'react-konva'
import { cartesianToAxial, axialToCartesian } from 'src/utilities/convertCoords'

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
    onPlayerMove: handlePlayerMove
  } = props

  const ref = useRef(null)

  const handleClick = (e: any) => {
    // console.log(ref)
    console.log(`${name} at (${q}, ${r}, ${s}) has been clicked.`)
  }

  const handleDragMove = (e: any) => {
    const { q, r, s } = cartesianToAxial(
      ref.current.attrs.x,
      ref.current.attrs.y,
      radius
    )

    const { x: xSnap, y: ySnap } = axialToCartesian(q, r, s, radius)

    ref.current.attrs.x = xSnap
    ref.current.attrs.y = ySnap
  }

  const handleDragEnd = (e: any) => {
    const { q: newQ, r: newR, s: newS } = cartesianToAxial(
      ref.current.attrs.x,
      ref.current.attrs.y,
      radius
    )

    handlePlayerMove(e, name, newQ, newR, newS)
  }

  return (
    <RegularPolygon
      sides={6}
      radius={radius * 0.95}
      fill={fill}
      x={x}
      y={y}
      onClick={handleClick}
      draggable={true}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      ref={ref}
    />
  )
}

export default Player
