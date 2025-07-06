import { Thief } from '@/types'
import { useStore } from '@/hooks'

type Props = Thief & {
  type: 'thief' | 'recruitment'
}

const Profile: React.FC<Props> = (props) => {
  const { setSelectedThief } = useStore()

  const onThiefClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    setSelectedThief({ type: props.type, thief: props })
  }

  return (
    <button
      className="flex cursor-pointer hover:bg-gray-700/50 items-center gap-4 block w-full p-2 rounded-lg"
      type="button"
      onClick={onThiefClick}
    >
      <div className="size-12 rounded-full bg-gray-700 overflow-hidden">
        {props.image && (
          <img src={props.image} alt={props.name} className="size-full object-cover" />
        )}
      </div>
      <div className="text-left">
        <h1 className="font-medium text-ms">{props.name}</h1>
        <p className="font-light text-sm opacity-80">대기중</p>
      </div>
    </button>
  )
}

export default Profile
