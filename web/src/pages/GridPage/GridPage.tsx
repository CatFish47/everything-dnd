import { MetaTags } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import { Stage, Layer } from 'react-konva'
import Honeycomb from 'src/components/Honeycomb/Honeycomb'

const GridPage = () => {
  const dimensions = useWindowSize()

  const [stageProps, setStageProps] = useState({
    scaleX: 1,
    scaleY: 1,
  })

  const [editMode, setEditMode] = useState(false)

  const { width, height } = dimensions
  const { scaleX, scaleY } = stageProps
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
    setStageProps({
      scaleX: newScale,
      scaleY: newScale,
    })

    var newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    }
    stage.position(newPos)
  }

  const handleModeToggle = () => {
    setEditMode((prevState) => !prevState)
  }

  return (
    <>
      <MetaTags title="Grid" description="Grid page" />

      <div className="w-screen h-screen grid grid-cols-4">
        <Stage
          width={width}
          height={height}
          className="col-span-3"
          draggable={true}
          onWheel={handleScroll}
          scaleX={scaleX}
          scaleY={scaleY}
        >
          <Layer>
            <Honeycomb
              gridSize={3}
              tileSize={50}
              x={width / 2}
              y={height / 2}
              xMax={width}
              yMax={height}
            />
          </Layer>
        </Stage>
        <div className="bg-gray-100 flex flex-col items-start p-3">
          <div className="self-center">
            <h1 className="text-3xl m-3">Menu</h1>
          </div>
          <div className="flex self-center">
            <label className="mx-3">Normal Mode</label>
            <input
              type="checkbox"
              className="toggle toggle-primary mx-3"
              onChange={handleModeToggle}
            />
            <label className="mx-3">Edit Mode</label>
          </div>
          <div className="divider" />
          <div
            tabIndex={0}
            className={`collapse ${
              !editMode ? 'collapse-open' : 'collapse-close'
            }`}
          >
            <div className="collapse-content">Normal Mode</div>
          </div>
          <div
            tabIndex={0}
            className={`collapse ${
              editMode ? 'collapse-open' : 'collapse-close'
            }`}
          >
            <div className="collapse-content">Edit Mode</div>
          </div>
        </div>
      </div>
    </>
  )
}

// Taken from https://usehooks.com/useWindowSize/
// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: (window.innerWidth * 3) / 4,
        height: window.innerHeight,
      })
    }
    // Add event listener
    window.addEventListener('resize', handleResize)
    // Call handler right away so state gets updated with initial window size
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}

export default GridPage
