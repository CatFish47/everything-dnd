import { MetaTags } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import { Stage, Layer, RegularPolygon, Text } from 'react-konva'
import Honeycomb from 'src/components/Honeycomb/Honeycomb';

const GridPage = () => {
  const dimensions = useWindowSize();

  return (
    <>
      <MetaTags title="Grid" description="Grid page" />

      <div className="w-screen h-screen grid grid-cols-4">
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          className="col-span-3"
        >
          <Layer>
            <Honeycomb gridSize={3} tileSize={50} x={100} y={100} xMax={dimensions.width} yMax={dimensions.height} />
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
        width: (window.innerWidth * 3) / 4,
        height: window.innerHeight,
      })
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
