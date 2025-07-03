import React from 'react'
import { join } from '@fxts/core'

type SVGProps = {
  className?: string
  children: React.ReactNode
  viewBox: [number, number, number, number]
  width: number
  height: number
}

export const Svg: React.FC<SVGProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={props.className || ''}
      fill="none"
      viewBox={join(' ', props.viewBox)}
      width={props.width}
      height={props.height}
      stroke="currentColor"
    >
      {props.children}
    </svg>
  )
}
