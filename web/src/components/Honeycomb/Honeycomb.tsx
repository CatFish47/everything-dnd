import { useEffect, useState } from 'react'
import Tile from 'src/components/Honeycomb/Tile'

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

  const a = (Math.sqrt(3) / 2) * tileSize
  const b = (3 / 4) * tileSize

  useEffect(() => {
    setTileGrid([])

    for (let q = -gridSize; q <= gridSize; q++) {
      for (let r = -gridSize; r <= gridSize; r++) {
        for (let s = -gridSize; s <= gridSize; s++) {
          if (q + r + s === 0) {
            setTileGrid((prevState) => [
              ...prevState,
              {
                q,
                r,
                s
              },
            ])
          }
        }
      }
    }
  }, [gridSize])

  return (
    <>
      {tileGrid.map((item) => {
        const xTile = x + a * item.q - a * item.s
        const yTile = y - b * item.q + b * item.r - b * item.s

        // if (
        //   xTile + tileSize < 0 ||
        //   yTile + tileSize < 0 ||
        //   xTile - tileSize > xMax ||
        //   yTile - tileSize > yMax
        // ) {
        //   return
        // }

        return (
          <Tile
            radius={tileSize}
            x={xTile}
            y={yTile}
            q={item.q}
            r={item.r}
            s={item.s}
            fill={"#888"}
            key={keyGen(item.q, item.r, item.s, gridSize)}
          />
        )
      })}
    </>
  )
}

function keyGen(q: number, r: number, s: number, gridSize: number) {
  const newQ = q + gridSize
  const newR = r + gridSize
  const newS = s + gridSize

  return `${newQ}${newR}${newS}`
}

export default Honeycomb
