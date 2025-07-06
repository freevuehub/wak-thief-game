import { useEffect, useRef, useState } from 'react'
import { Thief } from '@/components'
import { pipe } from '@fxts/core'
import { useAI, usePrompt, useStore } from '@/hooks'
import type { Thief as ThiefType } from '@/types'
import { PROMPT_KEY } from '@/constants'
import { syndicateAI } from '@/lib'
import Button from '../Button'

type Props = ThiefType

const Default: React.FC<Props> = (props) => {
  const { throwOutThief, restThief } = useAI()
  const { createGroupLog, stat } = useStore()
  const { prompt } = usePrompt()
  const [loading, setLoading] = useState(false)
  const [dialogue, setDialogue] = useState<Array<string>>([])
  const report = useRef<HTMLDivElement>(null)

  const onThrowOut = async () => {
    try {
      setLoading(true)
      const { dialogue, feelings } = await throwOutThief(props)
      createGroupLog({
        day: stat.day,
        message: feelings,
        type: PROMPT_KEY.THROW_OUT_THIEF,
        thiefId: props.id,
      })
      setLoading(false)
    } catch (error) {
      alert('오류가 발생했습니다.')
    }
  }

  const onRest = async () => {
    try {
      setLoading(true)
      const { dialogue, feelings } = await restThief(props)
      createGroupLog({
        day: stat.day,
        message: feelings,
        type: PROMPT_KEY.REST_THIEF,
        thiefId: props.id,
      })
      setLoading(false)
    } catch (error) {
      alert('오류가 발생했습니다.')
    }
  }

  return (
    <>
      <div className="px-4 my-4">
        <Thief.Talk thief={props} prompt={prompt[PROMPT_KEY.TALK_THIEF].ko}>
          <ul className="flex justify-center gap-2">
            <li className="flex-1">
              <Button
                className="hover:bg-red-500 bg-red-500/70"
                disabled={loading}
                onClick={onThrowOut}
              >
                퇴출
              </Button>
            </li>
            <li className="flex-1">
              <Button
                className="hover:bg-yellow-500 bg-yellow-500/70"
                disabled={loading}
                onClick={onRest}
              >
                휴식
              </Button>
            </li>
          </ul>
        </Thief.Talk>
      </div>
    </>
  )
}

export default Default
