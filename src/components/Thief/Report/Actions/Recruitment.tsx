import { useEffect, useRef, useState } from 'react'
import { Typewriter, Spinner } from '@/components'
import { concat, join, pipe } from '@fxts/core'
import { usePrompt, useStore } from '@/hooks'
import type { Thief } from '@/types'
import { PROMPT_KEY, THIEF_SELECTED_TYPE } from '@/constants'
import { syndicateAI } from '@/lib'

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
  const { createThief } = useStore()
  const { prompt } = usePrompt()
  const [loading, setLoading] = useState(false)
  const [isEnd, setIsEnd] = useState(false)
  const [dialogue, setDialogue] = useState<Array<string>>([])
  const report = useRef<HTMLDivElement>(null)

  const onRecruitment = async () => {
    try {
      setLoading(true)
      // pipe(
      //   props,
      //   syndicateAI.createThiefResponse(prompt[PROMPT_KEY.RECRUITMENT_THIEF].ko),
      //   (data) => {
      //     setSelectedThief({
      //       type: THIEF_SELECTED_TYPE.RECRUITMENT,
      //       thief: { ...props },
      //     })
      //     setDialogue(data.dialogue)
      //     setThieves([{ ...props }])
      //     setGroupLog([
      //       {
      //         day: gameStat.day,
      //         message: data.feelings,
      //         type: PROMPT_KEY.RECRUITMENT_THIEF,
      //         thiefId: props.id,
      //       },
      //     ])
      //     setLoading(false)
      //     setIsEnd(true)
      //   }
      // )
    } catch (error) {
      alert('오류가 발생했습니다.')
    }
  }

  const onClose = async () => {
    // setSelectedThief({ type: THIEF_SELECTED_TYPE.RECRUITMENT, thief: null })
    setIsEnd(false)
  }

  const onRecreate = async () => {
    try {
      setLoading(true)
      // pipe(props, syndicateAI.createThiefResponse(prompt[PROMPT_KEY.RECREATE_THIEF].ko), (data) => {
      //   setSelectedThief({
      //     type: THIEF_SELECTED_TYPE.RECRUITMENT,
      //     thief: { ...props },
      //   })
      //   setDialogue(data.dialogue)
      //   setThieves([{ ...props }])
      //   setGroupLog([
      //     {
      //       day: gameStat.day,
      //       message: data.feelings,
      //       type: PROMPT_KEY.RECREATE_THIEF,
      //       thiefId: props.id,
      //     },
      //   ])
      //   setLoading(false)
      //   setIsEnd(true)
      // })
    } catch (error) {
      alert('오류가 발생했습니다.')
    }
  }

  useEffect(() => {
    if (dialogue.length > 0) return
    setLoading(true)
    pipe(
      props,
      syndicateAI.createThiefResponse(prompt[PROMPT_KEY.TALK_CREATE_THIEF].ko),
      (data) => {
        setDialogue(data.dialogue)
        setLoading(false)
      }
    )
  }, [dialogue])

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
              {join('\n', dialogue)}
            </Typewriter>
          )}
        </div>
      </div>
      <ul className="flex justify-center gap-2 px-4">
        {isEnd && (
          <>
            <li className="flex-1">
              <Button
                className="hover:bg-yellow-500 bg-yellow-500/70"
                disabled={loading}
                onClick={onClose}
              >
                닫기
              </Button>
            </li>
          </>
        )}
        {isEnd || (
          <>
            <li className="flex-1">
              <Button
                className="hover:bg-yellow-500 bg-yellow-500/70"
                disabled={loading}
                onClick={onRecreate}
              >
                재탐색
              </Button>
            </li>
            <li className="flex-1">
              <Button
                className="hover:bg-red-500 bg-red-500/70"
                disabled={loading}
                onClick={onRecruitment}
              >
                영입
              </Button>
            </li>
          </>
        )}
      </ul>
    </>
  )
}

export default Actions
