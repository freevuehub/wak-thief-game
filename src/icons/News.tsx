import React from 'react'
import { Svg } from '.'

type Props = {
  className?: string
}

const News: React.FC<Props> = (props) => (
  <Svg className={props.className || ''} viewBox={[0, 0, 24, 24]} width={24} height={24}>
    <path
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h3m-3 4h3m-3 4h3m-3 4h3"
    />
  </Svg>
)

export default News
