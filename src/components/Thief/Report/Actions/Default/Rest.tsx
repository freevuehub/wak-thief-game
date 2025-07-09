import { Thief, Button } from '@/components'
import type { Member } from '@/types'
import { PROMPT_KEY, MEMBER_STATUS } from '@/constants'
import { useStore } from '@/hooks'

type Props = Member & {
  onClose: () => void
}

const Rest: React.FC<Props> = (props) => {
  const { updateMember } = useStore()

  const onRest = () => {
    updateMember({ ...props, status: MEMBER_STATUS.RESTING })
    props.onClose()
  }

  return (
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
      prompt={PROMPT_KEY.GENERATE_MEMBER_REST_TALK}
    >
      <ul className="flex justify-center gap-2">
        <li className="flex-1">
          <Button className="bg-gray-500/70 hover:bg-gray-500" type="button" onClick={onRest}>
            닫기
          </Button>
        </li>
      </ul>
    </Thief.Talk>
  )
}

export default Rest
