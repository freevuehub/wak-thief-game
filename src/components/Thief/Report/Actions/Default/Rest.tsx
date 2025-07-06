import { Thief, Button } from '@/components'
import type { Thief as ThiefType } from '@/types'
import { usePrompt } from '@/hooks'
import { PROMPT_KEY } from '@/constants'

type Props = ThiefType & {
  onClose: () => void
}

const Rest: React.FC<Props> = (props) => {
  const { prompt } = usePrompt()

  return (
    <Thief.Talk thief={props} prompt={prompt[PROMPT_KEY.REST_THIEF].ko}>
      <ul className="flex justify-center gap-2">
        <li className="flex-1">
          <Button
            className="bg-gray-500/70 hover:bg-gray-500"
            type="button"
            onClick={props.onClose}
          >
            닫기
          </Button>
        </li>
      </ul>
    </Thief.Talk>
  )
}

export default Rest
