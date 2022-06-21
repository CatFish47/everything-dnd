import { MetaTags } from '@redwoodjs/web'
import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, RegularPolygon, Text } from 'react-konva'

const GridPage = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  })

  const ref = useRef(null)

  useEffect(() => {
    updateSize()
  }, [])

  const updateSize = () => {
    setDimensions({
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    })
  }

  window.addEventListener('resize', updateSize)

  return (
    <>
      <MetaTags title="Grid" description="Grid page" />

      <div ref={ref} className="w-screen h-screen">
        <Stage width={dimensions.width} height={dimensions.height}>
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
      </div>
    </>
  )
}

export default GridPage
