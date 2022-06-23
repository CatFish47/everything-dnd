import { MetaTags } from '@redwoodjs/web'
import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, RegularPolygon, Text } from 'react-konva'

const GridPage = () => {
  const dimensions = useWindowSize();
  // const [dimensions, setDimensions] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // })

  // useEffect(() => {
  //   updateSize()
  // }, [])

  // const updateSize = () => {
  //   setDimensions({
  //     width: window.innerWidth,
  //     height: window.innerHeight
  //   })
  // }

  return (
    <>
      <MetaTags title="Grid" description="Grid page" />

      <div className="w-screen h-screen grid grid-cols-4">
        <Stage
          width={(dimensions.width * 3) / 4}
          height={dimensions.height}
          className="col-span-3"
        >
          <Layer>
            <RegularPolygon
              sides={6}
              radius={50}
              fill={`blue`}
              x={100}
              y={100}
            />
          </Layer>
        </Stage>
        <div className="bg-gray-100">
          <div className="m-3">
            <h1 className="text-3xl text-center">Menu</h1>
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
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default GridPage
