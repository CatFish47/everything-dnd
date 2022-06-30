import { useEffect, useState } from 'react'
import Tile from 'src/components/Honeycomb/Tile'
import { keyGen, getTilesInRadius } from 'src/utilities/honeycombUtils'
import { TileGridInfo } from 'src/types/TileInfo'
import { CharactersInfo } from 'src/types/CharactersInfo'
import Player from 'src/components/Honeycomb/Player'

type HoneycombProps = {
  gridSize: number
  tileSize: number
  x: number
  y: number
  xMax: number
  yMax: number
  onTileClick: (e: any, q: number, r: number, s: number) => void
  onPlayerMove: (e: any, name: string, q: number, r: number, s: number) => void
  onCharMouseIn: (e: any, name: string) => void
  onCharMouseOut: (e: any, name: string) => void
  tileInfos: TileGridInfo
  defaultFill: string
  charsInfo: CharactersInfo
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
    onPlayerMove: handlePlayerMove,
    onCharMouseIn: handleCharMouseIn,
    onCharMouseOut: handleCharMouseOut,
    tileInfos,
    defaultFill,
    charsInfo,
  } = props
  const [tileGrid, setTileGrid] = useState([])

  const a = (Math.sqrt(3) / 2) * tileSize
  const b = (3 / 4) * tileSize

  useEffect(() => {
    setTileGrid(getTilesInRadius(0, 0, 0, gridSize))
    // setTileGrid([])

    // for (let q = -gridSize; q <= gridSize; q++) {
    //   for (let r = -gridSize; r <= gridSize; r++) {
    //     for (let s = -gridSize; s <= gridSize; s++) {
    //       if (q + r + s === 0) {
    //         setTileGrid((prevState) => [
    //           ...prevState,
    //           {
    //             q,
    //             r,
    //             s,
    //           },
    //         ])
    //       }
    //     }
    //   }
    // }
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
        const fill = !tileInfos[key] ? defaultFill : tileInfos[key]['fill']

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

      {Object.entries(charsInfo).map((entry) => {
        const charName = entry[0]
        const charInfo = entry[1]

        const xTile = x + a * charInfo.q - a * charInfo.s
        const yTile = y - b * charInfo.q + b * charInfo.r - b * charInfo.s

        return (
          <Player
            radius={tileSize}
            x={xTile}
            y={yTile}
            q={charInfo.q}
            r={charInfo.r}
            s={charInfo.s}
            fill={charInfo.fill}
            name={charName}
            key={charName}
            onTileClick={handleTileClick}
            onPlayerMove={handlePlayerMove}
            onPlayerMouseIn={handleCharMouseIn}
            onPlayerMouseOut={handleCharMouseOut}
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
