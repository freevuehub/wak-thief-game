import React from 'react'
import { Svg } from '.'

type Props = {
  className?: string
}

const Map: React.FC<Props> = (props) => (
  <Svg className={props.className || ''} viewBox={[0, 0, 24, 24]} width={24} height={24}>
    <path
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 13v-6m6-10v10"
    />
  </Svg>
)

export default Map
