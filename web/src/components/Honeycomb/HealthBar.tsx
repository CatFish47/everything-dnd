import { Rect } from 'react-konva'

type HealthBarProps = {
  hp: number
  hpMax: number
  tileRadius: number
  x: number
  y: number
}

const HealthBar = (props: HealthBarProps) => {
  const { hp, hpMax, tileRadius: r, x, y } = props

  const a = (Math.sqrt(3) / 2) * r * 0.9
  const hpPercent = hp / hpMax
  const height = r * 0.1

  return (
    <>
      <Rect x={x - a} y={y - r} width={2 * a} height={height} fill={'#f00'} />
      <Rect
        x={x - a}
        y={y - r}
        width={2 * a * hpPercent}
        height={height}
        fill={'#0f0'}
      />
    </>
  )
}

export default HealthBar
