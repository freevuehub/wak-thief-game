import React from 'react'
import { Svg } from '.'

type Props = {
  className?: string
}

const Calendar: React.FC<Props> = (props) => (
  <Svg className={props.className || ''} viewBox={[0, 0, 24, 24]} width={24} height={24}>
    <path
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </Svg>
)

export default Calendar
