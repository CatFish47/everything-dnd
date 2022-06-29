import { MetaTags } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import { Stage, Layer } from 'react-konva'
import Honeycomb from 'src/components/Honeycomb/Honeycomb'
import keyGen from 'src/utilities/honeycombUtils'
import useWindowSize from 'src/utilities/useWindowSize'

const GridPage = () => {
  const dimensions = useWindowSize()

  const [charsInfo, setCharsInfo] = useState({
    testPlayer: {
      fill: '#a0f',
      isPlayer: true,
      q: 1,
      r: -1,
      s: 0,
    },
    grant: {
      fill: '#af0',
      isPlayer: true,
      q: -1,
      r: -1,
      s: 2,
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

  const TOOLS = {
    pointer: 'pointer',
    brush: 'brush',
    pan: 'pan',
    erase: 'erase',
  }
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
  }

  const handleTileClick = (e: any, q: number, r: number, s: number) => {
    if (editMode) {
      if (toolMode === TOOLS.brush) {
        setTileInfos((prevState) => {
          let newState = {
            ...prevState,
          }
          newState[keyGen(q, r, s, gridSize)] = { fill: brushColor }

          return newState
        })
      }

      if (toolMode === TOOLS.erase) {
        setTileInfos((prevState) => {
          let newState = { ...prevState }
          newState[keyGen(q, r, s, gridSize)] = null

          return newState
        })
      }
    }
  }

  const handleBrushColorChange = (e: any) => {
    setBrushColor(e.target.value)
  }

  const handleDefaultColorChange = (e: any) => {
    setDefaultFill(e.target.value)
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
        >
          <Layer>
            <Honeycomb
              gridSize={gridSize}
              tileSize={50}
              x={0}
              y={0}
              xMax={width}
              yMax={height}
              onTileClick={handleTileClick}
              onPlayerMove={handlePlayerMove}
              tileInfos={tileInfos}
              defaultFill={defaultFill}
              charsInfo={charsInfo}
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
            <div className="collapse-content">Normal Mode</div>
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
                  Text input for gridsize
                  Toggle button to show/hide characters on top

                  Button group for tool mode (select, brush, fill (add later))
                  Color picker/text input for color

               */}

              <div className="btn-group justify-center mb-5">
                <input
                  type="radio"
                  name="tool"
                  className="btn"
                  data-title="Pointer"
                  onClick={() => {
                    setToolMode(TOOLS.pointer)
                  }}
                  defaultChecked={true}
                />
                <input
                  type="radio"
                  name="tool"
                  className="btn"
                  data-title="Pan"
                  onClick={() => {
                    setToolMode(TOOLS.pan)
                  }}
                />
                <input
                  type="radio"
                  name="tool"
                  className="btn"
                  data-title="Brush"
                  onClick={() => {
                    setToolMode(TOOLS.brush)
                  }}
                />
                <input
                  type="radio"
                  name="tool"
                  className="btn"
                  data-title="Erase"
                  onClick={() => {
                    setToolMode(TOOLS.erase)
                  }}
                />
              </div>
              <div className="flex">
                <input
                  type="color"
                  onChange={handleDefaultColorChange}
                  className="mx-3"
                />
                <span className="mx-3">Background Color</span>
              </div>
              <div className="flex">
                <input
                  type="color"
                  onChange={handleBrushColorChange}
                  className="mx-3"
                />
                <span className="mx-3">Brush Color</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GridPage
