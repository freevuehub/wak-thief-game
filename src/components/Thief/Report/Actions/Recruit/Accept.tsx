import { Thief, Button } from '@/components'
import type { Member } from '@/types'
import { PROMPT_KEY, MEMBER_STATUS, MEMBER_TEAM } from '@/constants'
import { useStore } from '@/hooks'

type Props = Member & {
  onClose: () => void
}

const Accept: React.FC<Props> = (props) => {
  const { updateThief } = useStore()

  const onAccept = () => {
    updateThief({ ...props, status: MEMBER_STATUS.IDLE, team: MEMBER_TEAM.OUR })
    props.onClose()
  }

  return (
    <Thief.Talk data={props} prompt={PROMPT_KEY.GENERATE_MEMBER_RECRUITMENT}>
      <ul className="flex justify-center gap-2">
        <li className="flex-1">
          <Button className="bg-gray-500/70 hover:bg-gray-500" type="button" onClick={onAccept}>
            닫기
          </Button>
        </li>
      </ul>
    </Thief.Talk>
  )
}

export default Accept
