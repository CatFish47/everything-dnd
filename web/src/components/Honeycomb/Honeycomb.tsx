import { useEffect, useState } from 'react'
import { RegularPolygon } from 'react-konva'

type HoneycombProps = {
  gridSize: number
  tileSize: number
  x: number
  y: number
  xMax: number
  yMax: number
}

const Honeycomb = (props: HoneycombProps) => {
  const { gridSize, tileSize, x, y, xMax, yMax } = props
  const [tileGrid, setTileGrid] = useState([])

  useEffect(() => {
    setTileGrid([])

    const a = (Math.sqrt(3) / 2) * tileSize
    const b = (3 / 4) * tileSize

    for (let q = -gridSize; q <= gridSize; q++) {
      for (let r = -gridSize; r <= gridSize; r++) {
        for (let s = -gridSize; s <= gridSize; s++) {
          if (q + r + s === 0) {
            setTileGrid((prevState) => [
              ...prevState,
              {
                q,
                r,
                s,
                x: x + a * q - a * s,
                y: y - b * q + b * r - b * s,
              },
            ])
          }
        }
      }
    }
  }, [props])

  console.log(tileGrid)

  return (
    <>
      {tileGrid.map((item) => {
        if (
          item.x + tileSize < 0 ||
          item.y + tileSize < 0 ||
          item.x - tileSize > xMax ||
          item.y - tileSize > yMax
        ) {
          return
        }

        return (
          <RegularPolygon
            sides={6}
            radius={tileSize}
            fill={randomColor()}
            x={item.x}
            y={item.y}
            key={keyGen(item.q, item.r, item.s, gridSize)}
          />
        )
      })}
    </>
  )
}

function randomColor() {
  const hex = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
  ]

  return `#${randInt(hex.length)}${randInt(hex.length)}${randInt(hex.length)}`
}

function randInt(max: number) {
  return Math.floor(Math.random() * max)
}

function keyGen(q: number, r: number, s: number, gridSize: number) {
  const newQ = q + gridSize
  const newR = r + gridSize
  const newS = s + gridSize

  return `${newQ}${newR}${newS}`
}

export default Honeycomb
