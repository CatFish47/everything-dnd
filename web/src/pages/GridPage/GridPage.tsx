import { MetaTags } from '@redwoodjs/web'
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

const GridPage = () => {
  const dimensions = useWindowSize()

  const [stickyChar, setStickyChar] = useState('')
  const [currChar, setCurrChar] = useState('')
  const [charsInfo, setCharsInfo] = useState({
    CatFish: {
      fill: '#a0f',
      isPlayer: true,
      name: 'CatFish',
      q: 0,
      r: 0,
      s: 0,
      str: 10,
      dex: 13,
      con: 16,
      int: 12,
      wis: 19,
      cha: 8,
      hp: 57,
      maxhp: 57,
      ac: 15,
      lvl: 6,
      speed: 30,
    },
  })

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

  const [toolMode, setToolMode] = useState(TOOLS.pointer)

  const { width, height } = dimensions
  const { scaleX, scaleY, draggable } = stageProps
  const scaleBy = 1.1

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
      console.log('Left mouse button clicked')

      setStickyChar(name)
    }
    if (e.evt.which === 3) {
      console.log('Right mouse button clicked')
    }
  }

  const handleHpChange = (value: number) => {
    if (!stickyChar) return

    const currHP = charsInfo[stickyChar].hp
    const maxHP = charsInfo[stickyChar].maxhp

    if (value < 0) {
      setCharsInfo((prevState) => {
        let newState = {
          ...prevState
        }
        charsInfo[stickyChar].hp = Math.max(0, currHP + value)

        return newState
      })

    } else {
      setCharsInfo((prevState) => {
        let newState = {
          ...prevState,
        }
        charsInfo[stickyChar].hp = Math.min(maxHP, currHP + value)

        return newState
      })
    }
  }

  let currCharInfo: CharInfo

  if (currChar) {
    currCharInfo = charsInfo[currChar]
  } else if (stickyChar) {
    currCharInfo = charsInfo[stickyChar]
  } else {
    currCharInfo = null
  }

  return (
    <>
      <MetaTags title="Grid" description="Grid page" />

      <div className="w-screen h-screen grid grid-cols-4">
        <Stage
          width={width}
          height={height}
          className="col-span-3"
          draggable={toolMode === TOOLS.pan}
          onWheel={handleScroll}
          scaleX={scaleX}
          scaleY={scaleY}
          offsetX={-width / 2}
          offsetY={-height / 2}
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
              xMax={width}
              yMax={height}
              onTileDraw={handleTileDraw}
              onPlayerMove={handlePlayerMove}
              tileInfos={tileInfos}
              defaultFill={defaultFill}
              charsInfo={charsInfo}
              onCharMouseIn={(e: any, name: string) => setCurrChar(name)}
              onCharMouseOut={(e: any, name: string) => setCurrChar('')}
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
              {currCharInfo && <CharacterCard charInfo={currCharInfo} />}
              {currCharInfo && currCharInfo.name === stickyChar && (
                <>
                  <div className="divider" />
                  <CharacterActions onApply={handleHpChange} />
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
