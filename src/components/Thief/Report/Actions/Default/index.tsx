import { useState } from 'react'
import { Thief, Button } from '@/components'
import { usePrompt } from '@/hooks'
import type { Thief as ThiefType } from '@/types'
import { PROMPT_KEY } from '@/constants'
import Section from '../Section'
import Rest from './Rest'
import ThrowOut from './ThrowOut'

type Props = ThiefType & {
  onClose: () => void
}

const Default: React.FC<Props> = (props) => {
  const { prompt } = usePrompt()
  const [actionType, setActionType] = useState<string | null>()

  const onThrowOut = async () => {
    setActionType('THROW_OUT')
    // try {
    //   setLoading(true)
    //   const { dialogue, feelings } = await throwOutThief(props)
    //   createGroupLog({
    //     day: stat.day,
    //     message: feelings,
    //     type: PROMPT_KEY.THROW_OUT_THIEF,
    //     thiefId: props.id,
    //   })
    //   setLoading(false)
    // } catch (error) {
    //   alert('오류가 발생했습니다.')
    // }
  }

  const onRest = async () => {
    setActionType('REST')
    // try {
    //   setLoading(true)
    //   const { dialogue, feelings } = await restThief(props)
    //   createGroupLog({
    //     day: stat.day,
    //     message: feelings,
    //     type: PROMPT_KEY.REST_THIEF,
    //     thiefId: props.id,
    //   })
    //   setLoading(false)
    // } catch (error) {
    //   alert('오류가 발생했습니다.')
    // }
  }

  return (
    <>
      <div className="px-4 my-4">
        <Section>
          <Thief.Talk thief={props} prompt={prompt[PROMPT_KEY.TALK_THIEF].ko}>
            <ul className="flex justify-center gap-2">
              {!actionType && (
                <li className="flex-1">
                  <Button className="hover:bg-gray-500 bg-gray-500/70" onClick={props.onClose}>
                    닫기
                  </Button>
                </li>
              )}
              {actionType !== 'REST' && (
                <li className="flex-1">
                  <Button
                    className="hover:bg-red-500 bg-red-500/70 disabled:bg-gray-500"
                    disabled={!!actionType}
                    onClick={onThrowOut}
                  >
                    퇴출
                  </Button>
                </li>
              )}
              {actionType !== 'THROW_OUT' && (
                <li className="flex-1">
                  <Button
                    className="hover:bg-yellow-500 bg-yellow-500/70 disabled:bg-gray-500"
                    disabled={!!actionType}
                    onClick={onRest}
                  >
                    휴식
                  </Button>
                </li>
              )}
            </ul>
          </Thief.Talk>
        </Section>
        {actionType && (
          <Section>
            {actionType === 'REST' && <Rest {...props} onClose={props.onClose} />}
            {actionType === 'THROW_OUT' && <ThrowOut {...props} onClose={props.onClose} />}
          </Section>
        )}
      </div>
    </>
  )
}

export default Default
