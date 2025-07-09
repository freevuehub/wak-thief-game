import { Thief, Button } from '@/components'
import type { Member } from '@/types'
import { PROMPT_KEY } from '@/constants'

type Props = Member & {
  onClose: () => void
}

const ThrowOut: React.FC<Props> = (props) => {
  const onThrowOut = () => {
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
      prompt={PROMPT_KEY.GENERATE_MEMBER_THROW_OUT_TALK}
    >
      <ul className="flex justify-center gap-2">
        <li className="flex-1">
          <Button className="bg-gray-500/70 hover:bg-gray-500" type="button" onClick={onThrowOut}>
            닫기
          </Button>
        </li>
      </ul>
    </Thief.Talk>
  )
}

export default ThrowOut
