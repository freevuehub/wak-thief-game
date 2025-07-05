import { useEffect, useRef } from 'react'
import { Typewriter, Spinner } from '@/components'
import { concat, join, pipe } from '@fxts/core'
import { useAI, useStore } from '@/hooks'
import type { Thief } from '@/types'
import { PROMPT_KEY } from '@/constants'

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
  const { throwOutThief, restThief, aiLoading } = useAI()
  const { setSelectedThief, setGroupLog, gameStat } = useStore()
  const report = useRef<HTMLDivElement>(null)

  const onThrowOut = async () => {
    try {
      const { dialogue, feelings } = await throwOutThief(props)
      setSelectedThief({ ...props, dialogue })
      setGroupLog([
        {
          day: gameStat.day,
          message: feelings,
          type: PROMPT_KEY.THROW_OUT_THIEF,
          thiefId: props.id,
        },
      ])
    } catch (error) {
      alert('오류가 발생했습니다.')
    }
  }

  const onRest = async () => {
    try {
      const { dialogue, feelings } = await restThief(props)
      setSelectedThief({ ...props, dialogue })
      setGroupLog([
        {
          day: gameStat.day,
          message: feelings,
          type: PROMPT_KEY.REST_THIEF,
          thiefId: props.id,
        },
      ])
    } catch (error) {
      alert('오류가 발생했습니다.')
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
            concat(aiLoading ? ['flex', 'items-center', 'justify-center'] : []),
            join(' ')
          )}
        >
          {aiLoading ? (
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
            disabled={aiLoading}
            onClick={onRest}
          >
            휴식
          </Button>
        </li>
        <li className="flex-1">
          <Button className="hover:bg-green-500 bg-green-500/70" disabled={aiLoading}>
            탐색
          </Button>
        </li>
        <li className="flex-1">
          <Button className="hover:bg-blue-500 bg-blue-500/70" disabled={aiLoading}>
            업무
          </Button>
        </li>
        <li className="flex-1">
          <Button
            className="hover:bg-red-500 bg-red-500/70"
            disabled={aiLoading}
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
