import { Thief } from '@/types'

type Props = Thief

const Profile: React.FC<Props> = (props) => {
  const onThiefClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    console.log(props)
  }

  return (
    <button
      className="flex cursor-pointer hover:bg-gray-700/50 items-center gap-4 block w-full p-2 rounded-lg"
      type="button"
      onClick={onThiefClick}
    >
      <div className="size-12 rounded-full bg-gray-700"></div>
      <div className="text-left">
        <h1 className="font-medium text-ms">{props.name}</h1>
        <p className="font-light text-sm opacity-80">대기중</p>
      </div>
    </button>
  )
}

export default Profile
