import { useEffect, useState } from 'react'
import Tile from 'src/components/Honeycomb/Tile'
import keyGen from 'src/utilities/keygen'
import { TileGridInfo } from 'src/utilities/TileInfo'

type HoneycombProps = {
  gridSize: number
  tileSize: number
  x: number
  y: number
  xMax: number
  yMax: number
  onTileClick: (e: any, q: number, r: number, s: number) => void
  tileInfos: TileGridInfo,
  defaultFill: string
}

const Honeycomb = (props: HoneycombProps) => {
  const {
    gridSize,
    tileSize,
    x,
    y,
    xMax,
    yMax,
    onTileClick: handleTileClick,
    tileInfos,
    defaultFill
  } = props
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
                s,
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

        const key = keyGen(item.q, item.r, item.s, gridSize)
        const fill = !tileInfos[key] ? defaultFill : tileInfos[key]["fill"]

        return (
          <Tile
            radius={tileSize}
            x={xTile}
            y={yTile}
            q={item.q}
            r={item.r}
            s={item.s}
            fill={fill}
            key={key}
            onTileClick={handleTileClick}
          />
        )
      })}
    </>
  )
}

// function keyGen(q: number, r: number, s: number, gridSize: number) {
//   const newQ = q + gridSize
//   const newR = r + gridSize
//   const newS = s + gridSize

//   return `${newQ}${newR}${newS}`
// }

export default Honeycomb
