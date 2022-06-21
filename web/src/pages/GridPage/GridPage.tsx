import { MetaTags } from '@redwoodjs/web'
import { useState } from 'react'
import { Stage, Layer, RegularPolygon, Text } from 'react-konva'

const GridPage = () => {
  return (
    <>
      <MetaTags title="Grid" description="Grid page" />

      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <RegularPolygon sides={6} radius={50} fill={`blue`} x={100} y={100} />
        </Layer>
      </Stage>
    </>
  )
}

export default GridPage
