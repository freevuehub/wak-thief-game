import { useState } from 'react'
import { Button, Thief } from '@/components'
import { usePrompt } from '@/hooks'
import type { Member } from '@/types'
import { PROMPT_KEY } from '@/constants'
import Accept from './Accept'
import Cancel from './Cancel'
import Section from '../Section'

type Props = Member & {
  onClose: () => void
}

const Actions: React.FC<Props> = (props) => {
  const [actionType, setActionType] = useState<string | null>(null)

  const onActionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionType(event.currentTarget.value)
  }

  return (
    <div className="px-4 my-4">
      <Section>
        <Thief.Talk data={props} prompt={PROMPT_KEY.GENERATE_MEMBER_RECRUITMENT_TALK}>
          <ul className="flex justify-center gap-2">
            {!actionType && (
              <li className="flex-1">
                <Button className="hover:bg-gray-500 bg-gray-500/70" onClick={props.onClose}>
                  닫기
                </Button>
              </li>
            )}
            {actionType !== 'ACCEPT' && (
              <li className="flex-1">
                <Button
                  className="hover:bg-yellow-500 bg-yellow-500/70"
                  disabled={!!actionType}
                  value="CANCEL"
                  onClick={onActionClick}
                >
                  취소
                </Button>
              </li>
            )}
            {actionType !== 'CANCEL' && (
              <li className="flex-1">
                <Button
                  className="hover:bg-red-500 bg-red-500/70"
                  disabled={!!actionType}
                  value="ACCEPT"
                  onClick={onActionClick}
                >
                  영입
                </Button>
              </li>
            )}
          </ul>
        </Thief.Talk>
      </Section>
      {actionType && (
        <Section>
          {actionType === 'ACCEPT' && <Accept {...props} onClose={props.onClose} />}
          {actionType === 'CANCEL' && <Cancel {...props} onClose={props.onClose} />}
        </Section>
      )}
    </div>
  )
}

export default Actions
