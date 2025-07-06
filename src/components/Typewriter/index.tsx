import { useState, useEffect, useRef } from 'react'
import { pipe, join } from '@fxts/core'

type Props = {
  children: string
  className?: string
  speed?: number
}

const Typewriter: React.FC<Props> = (props) => {
  const interval = useRef<NodeJS.Timeout | null>(null)

  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let i = 0

    interval.current = setInterval(() => {
      if (i < props.children.length) {
        setDisplayText(props.children.slice(0, i))
        i++
      } else {
        interval.current && clearInterval(interval.current)
        setIsTyping(false)
      }
    }, props.speed || 30)

    return () => {
      interval.current && clearInterval(interval.current)
      setIsTyping(false)
    }
  }, [props.children, props.speed])

  return (
    <p
      className={pipe(
        [props.className || '', 'whitespace-pre-wrap leading-loose', 'break-keep'],
        join(' ')
      )}
    >
      {displayText}
      {isTyping && <span className="animate-pulse">|</span>}
    </p>
  )
}

export default Typewriter
