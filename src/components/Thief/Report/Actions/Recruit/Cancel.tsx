import { Thief, Button } from '@/components'
import type { Thief as ThiefType } from '@/types'
import { usePrompt } from '@/hooks'
import { PROMPT_KEY, THIEF_STATUS, THIEF_TEAM } from '@/constants'
import { useStore } from '@/hooks'

type Props = ThiefType & {
  onClose: () => void
}

const Cancel: React.FC<Props> = (props) => {
  const { prompt } = usePrompt()
  const { updateThief } = useStore()

  const onCancel = () => {
    updateThief({ ...props, status: THIEF_STATUS.IDLE, team: THIEF_TEAM.NEUTRAL })
    props.onClose()
  }

  return (
    <Thief.Talk thief={props} prompt={prompt[PROMPT_KEY.RECREATE_THIEF].ko}>
      <ul className="flex justify-center gap-2">
        <li className="flex-1">
          <Button className="bg-gray-500/70 hover:bg-gray-500" type="button" onClick={onCancel}>
            닫기
          </Button>
        </li>
      </ul>
    </Thief.Talk>
  )
}

export default Cancel
