import React from 'react'
import { Svg } from '.'

type Props = {
  className?: string
}

const Money: React.FC<Props> = (props) => (
  <Svg className={props.className || ''} viewBox={[0, 0, 24, 24]} width={24} height={24}>
    <path
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4v1m-4 0H8v-1h4v1zm-4 4v-1h12v1m-4 8v-1h4v1m-4 0H8v-1h4v1z"
    />
  </Svg>
)

export default Money
