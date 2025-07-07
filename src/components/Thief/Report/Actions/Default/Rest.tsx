import { Thief, Button } from '@/components'
import type { Thief as ThiefType } from '@/types'
import { usePrompt } from '@/hooks'
import { PROMPT_KEY, THIEF_STATUS, THIEF_TEAM } from '@/constants'
import { useStore } from '@/hooks'
import { pick, pipe } from '@fxts/core'

type Props = ThiefType & {
  onClose: () => void
}

const Rest: React.FC<Props> = (props) => {
  const { prompt } = usePrompt()
  const { updateThief } = useStore()

  const onRest = () => {
    pipe(
      props,
      pick([
        'id',
        'name',
        'personality',
        'character',
        'background',
        'loyalty',
        'cost',
        'fatigue',
        'image',
      ]),
      (thief) => {
        updateThief({
          ...thief,
          status: THIEF_STATUS.RESTING,
          team: THIEF_TEAM.OUR,
        })
        props.onClose()
      }
    )
  }

  return (
    <Thief.Talk thief={props} prompt={prompt[PROMPT_KEY.REST_THIEF].ko}>
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
