import { MetaTags, useQuery } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import { Stage, Layer, Rect } from 'react-konva'
import CharacterCard from 'src/components/Menu/NormalMode/CharacterCard'
import Honeycomb from 'src/components/Honeycomb/Honeycomb'
import { CharInfo } from 'src/types/CharactersInfo'
import { getTilesInRadius, keyGen } from 'src/utilities/honeycombUtils'
import useWindowSize from 'src/utilities/useWindowSize'
import { TOOLS } from 'src/utilities/consts'
import ToolSelection from 'src/components/Menu/EditMode/ToolSelection'
import NumberInput from 'src/components/Menu/EditMode/NumberInput'
import ColorPicker from 'src/components/Menu/EditMode/ColorPicker'
import CharacterActions from 'src/components/Menu/NormalMode/CharacterActions'
import { Character } from 'types/graphql'
import CharacterAdd from 'src/components/Menu/NormalMode/CharacterAdd'
import npcTagGen from 'src/utilities/npcTagGen'

/**
 * Tomorrows TODO:
 * - Add characters into the database
 * - Functionality to add characters onto the map
 * If extra time:
 * - Distinguish between PCs and NPCs
 */

const GET_CHARACTERS = gql`
  query {
    characters {
      id
      image
      isPlayer
      name
      str
      dex
      con
      int
      wis
      cha
      hp
      ac
      lvl
      speed
    }
  }
`

const GridPage = () => {
  const dimensions = useWindowSize()

  const { loading, error, data } = useQuery(GET_CHARACTERS)
  const charsDataArr: Character[] = data?.characters

  const [charsData, setCharsData] = useState({})

  const [stickyChar, setStickyChar] = useState('')
  const [currChar, setCurrChar] = useState('')
  const [charsInfo, setCharsInfo] = useState({})

  const [stageProps, setStageProps] = useState({
    scaleX: 1,
    scaleY: 1,
    draggable: true,
  })

  const [tileInfos, setTileInfos] = useState({})
  const [defaultFill, setDefaultFill] = useState('#888')

  const [editMode, setEditMode] = useState(false)
  const [brushColor, setBrushColor] = useState('#000000')
  const [gridSize, setGridSize] = useState(3)

  const [mouseDown, setMouseDown] = useState(false)

  const [toolMode, setToolMode] = useState(TOOLS.pan)

  const { width, height } = dimensions
  const { scaleX, scaleY } = stageProps
  const scaleBy = 1.1

  useEffect(() => {
    charsDataArr?.forEach((char) => {
      setCharsData((prevState) => {
        let newState = { ...prevState }
        newState[char.name] = {
          ...char,
        }

        return newState
      })
    })
  }, [loading])

  // Taken from https://konvajs.org/docs/sandbox/Zooming_Relative_To_Pointer.html
  const handleScroll = (e: any) => {
    // stop default scrolling
    e.evt.preventDefault()

    const stage = e.target.getStage()

    var oldScale = scaleX
    var pointer = stage.getPointerPosition()

    var mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    }

    // how to scale? Zoom in? Or zoom out?
    let direction = e.evt.deltaY > 0 ? -1 : 1

    // when we zoom on trackpad, e.evt.ctrlKey is true
    // in that case lets revert direction
    if (e.evt.ctrlKey) {
      direction = -direction
    }

    var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy

    // stage.scale({ x: newScale, y: newScale })
    setStageProps((prevState) => ({
      ...prevState,
      scaleX: newScale,
      scaleY: newScale,
    }))

    var newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    }
    stage.position(newPos)
  }

  const handleModeToggle = () => {
    setEditMode((prevState) => !prevState)
    setStickyChar('')
  }

  const handleTileDraw = (e: any, q: number, r: number, s: number) => {
    if (editMode) {
      if (toolMode === TOOLS.brush && mouseDown) {
        setTileInfos((prevState) => {
          let newState = {
            ...prevState,
          }
          newState[keyGen(q, r, s)] = { fill: brushColor }

          return newState
        })
      }

      if (toolMode === TOOLS.erase && mouseDown) {
        setTileInfos((prevState) => {
          let newState = { ...prevState }
          newState[keyGen(q, r, s)] = null

          return newState
        })
      }
    }
  }

  const handlePlayerMove = (
    e: any,
    name: string,
    q: number,
    r: number,
    s: number
  ) => {
    setCharsInfo((prevState) => {
      let newState = { ...prevState }
      newState[name] = {
        ...newState[name],
        q,
        r,
        s,
      }

      return newState
    })
  }

  const handleCharClick = (e: any, name: string) => {
    if (e.evt.which === 1) {
      setStickyChar(name)
    }
    if (e.evt.which === 3) {
      console.log('Right mouse button clicked')
    }
  }

  const handleHpChange = (value: number) => {
    if (!stickyChar) return
    if (!charsInfo[stickyChar]) return

    const currHP = charsInfo[stickyChar].hp
    const maxHP = charsInfo[stickyChar].stats.hp

    if (value < 0) {
      setCharsInfo((prevState) => {
        let newState = {
          ...prevState,
        }
        newState[stickyChar].hp = Math.max(0, currHP + value)

        return newState
      })
    } else {
      setCharsInfo((prevState) => {
        let newState = {
          ...prevState,
        }
        newState[stickyChar].hp = Math.min(maxHP, currHP + value)

        return newState
      })
    }
  }

  const handleCharDelete = () => {
    if (!stickyChar) return
    if (!charsInfo[stickyChar]) return

    setCharsInfo((prevState) => {
      let newState = {...prevState}
      delete newState[stickyChar]

      return newState
    })
  }

  const handleAddCharacter = (name: string) => {
    setCharsInfo((prevState) => {
      const char = charsData[name]

      let newState = { ...prevState }

      if (!char) {
        return newState
      }

      let newName = name

      if (!char.isPlayer) {
        newName = `${name}#${npcTagGen(4)}`
      }

      newState[newName] = {
        q: 0,
        r: 0,
        s: 0,
        hp: char.hp,
        stats: { ...char, name: newName },
      }

      return newState
    })
  }

  let currCharInfo: CharInfo

  if (currChar) {
    currCharInfo = charsInfo[currChar]
  } else if (stickyChar) {
    currCharInfo = charsInfo[stickyChar]
  } else {
    currCharInfo = null
  }

  const widthMod = width * 0.99
  const heightMod = height * 0.99

  return (
    <>
      <MetaTags title="Grid" description="Grid page" />

      <div className="w-screen h-screen grid grid-cols-4">
        <Stage
          width={widthMod || 0}
          height={heightMod || 0}
          className="col-span-3"
          draggable={toolMode === TOOLS.pan}
          onWheel={handleScroll}
          scaleX={scaleX}
          scaleY={scaleY}
          offsetX={(-widthMod / 2) || 0}
          offsetY={(-heightMod / 2) || 0}
          onMouseDown={() => setMouseDown(true)}
          onMouseUp={() => {
            setMouseDown(false)
            setStickyChar('')
          }}
          onContextMenu={(e) => {
            e.evt.preventDefault()
          }}
        >
          <Layer>
            <Honeycomb
              gridSize={gridSize}
              tileSize={50}
              x={0}
              y={0}
              xMax={widthMod}
              yMax={heightMod}
              onTileDraw={handleTileDraw}
              onPlayerMove={handlePlayerMove}
              tileInfos={tileInfos}
              defaultFill={defaultFill}
              charsInfo={charsInfo}
              onCharMouseIn={(e: any, name: string) => setCurrChar(name)}
              onCharMouseOut={() => setCurrChar('')}
              onCharClick={handleCharClick}
            />
          </Layer>
        </Stage>
        <div className="bg-gray-100 flex flex-col items-start p-3">
          <label className="swap self-center place-items-center text-2xl">
            <input type="checkbox" onClick={handleModeToggle} />
            <div className="swap-off">Normal Mode</div>
            <div className="swap-on">Edit Mode</div>
          </label>

          <div className="divider" />

          <div
            tabIndex={0}
            className={`w-full collapse ${
              !editMode ? 'collapse-open' : 'collapse-close'
            }`}
          >
            <div className="collapse-content">
              {!currCharInfo && (
                <CharacterAdd
                  characterDataArr={charsDataArr}
                  onAdd={handleAddCharacter}
                />
              )}
              {currCharInfo && <CharacterCard charInfo={currCharInfo} />}
              {currCharInfo?.stats.name === stickyChar && (
                <>
                  <div className="divider" />
                  <CharacterActions onDelete={handleCharDelete} onApply={handleHpChange} />
                </>
              )}
            </div>
          </div>
          <div
            tabIndex={0}
            className={`w-full collapse ${
              editMode ? 'collapse-open' : 'collapse-close'
            }`}
          >
            <div className="collapse-content">
              {/*
                Things to add:
                  Dropdown for map presets
                  Toggle button to show/hide characters on top
               */}

              <ToolSelection setToolMode={setToolMode} />
              <ColorPicker
                name="Background Color"
                onChange={(e: any) => setDefaultFill(e.target.value)}
              />
              <ColorPicker
                name="Brush Color"
                onChange={(e: any) => setBrushColor(e.target.value)}
              />

              <div className="divider" />

              <NumberInput
                value={gridSize}
                onChange={(e: any) => {
                  setGridSize(Math.max(0, Math.floor(e.target.value)))
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



export default GridPage
