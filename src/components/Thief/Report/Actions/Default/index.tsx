import { useState } from 'react'
import { Thief, Button } from '@/components'
import type { Member } from '@/types'
import { PROMPT_KEY } from '@/constants'
import Section from '../Section'
import Rest from './Rest'
import ThrowOut from './ThrowOut'

type Props = Member & {
  onClose: () => void
}

const Default: React.FC<Props> = (props) => {
  const [actionType, setActionType] = useState<string | null>()

  const onActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionType(event.currentTarget.value)
  }

  return (
    <>
      <div className="px-4 my-4">
        <Section>
          <Thief.Talk
            data={{
              name: props.name,
              personality: props.personality,
              character: props.character,
              background: props.background,
              cost: props.cost,
              loyalty: props.loyalty,
              fatigue: props.fatigue,
              events: '',
            }}
            prompt={PROMPT_KEY.GENERATE_MEMBER_IDLE_TALK}
          >
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
                    onClick={onActionClick}
                    value="THROW_OUT"
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
                    onClick={onActionClick}
                    value="REST"
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
