import React from 'react'
import { Svg } from '.'

type Props = {
  className?: string
}

const Loyalty: React.FC<Props> = (props) => (
  <Svg className={props.className || ''} viewBox={[0, 0, 24, 24]} width={24} height={24}>
    <path
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </Svg>
)

export default Loyalty
