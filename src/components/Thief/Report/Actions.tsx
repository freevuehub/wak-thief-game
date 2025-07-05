import { useEffect, useRef, useState } from 'react'
import { Typewriter, Spinner } from '@/components'
import { concat, join, pipe } from '@fxts/core'
import { useAI, useStore } from '@/hooks'
import type { Thief } from '@/types'

type Props = Thief
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className={pipe(
        [
          'block',
          'w-full',
          'rounded-lg',
          'p-2',
          'disabled:opacity-50',
          'disabled:cursor-not-allowed',
          props.className || '',
        ],
        join(' ')
      )}
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}
const Actions: React.FC<Props> = (props) => {
  const { throwOutThief, restThief } = useAI()
  const { setSelectedThief } = useStore()
  const [loading, setLoading] = useState(false)
  const report = useRef<HTMLDivElement>(null)

  const onThrowOut = async () => {
    try {
      setLoading(true)
      const { dialogue } = await throwOutThief(props)
      setSelectedThief({ ...props, dialogue })
    } catch (error) {
      alert('오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const onRest = async () => {
    try {
      setLoading(true)
      const { dialogue } = await restThief(props)
      setSelectedThief({ ...props, dialogue })
    } catch (error) {
      alert('오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    requestAnimationFrame(() => {
      if (report.current) {
        report.current.scrollTop = report.current.scrollHeight
      }
    })
  }, [])

  return (
    <>
      <div className="px-4 my-4">
        <div
          ref={report}
          className={pipe(
            ['bg-gray-700', 'rounded-lg', 'h-40', 'overflow-y-auto', 'p-2'],
            concat(loading ? ['flex', 'items-center', 'justify-center'] : []),
            join(' ')
          )}
        >
          {loading ? (
            <Spinner />
          ) : (
            <Typewriter className="w-full whitespace-pre-wrap leading-loose">
              {join('\n', props.dialogue)}
            </Typewriter>
          )}
        </div>
      </div>
      <ul className="flex justify-center gap-2 px-4">
        <li className="flex-1">
          <Button
            className="hover:bg-yellow-500 bg-yellow-500/70"
            disabled={loading}
            onClick={onRest}
          >
            휴식
          </Button>
        </li>
        <li className="flex-1">
          <Button className="hover:bg-green-500 bg-green-500/70" disabled={loading}>
            탐색
          </Button>
        </li>
        <li className="flex-1">
          <Button className="hover:bg-blue-500 bg-blue-500/70" disabled={loading}>
            업무
          </Button>
        </li>
        <li className="flex-1">
          <Button
            className="hover:bg-red-500 bg-red-500/70"
            disabled={loading}
            onClick={onThrowOut}
          >
            퇴출
          </Button>
        </li>
      </ul>
    </>
  )
}

export default Actions
