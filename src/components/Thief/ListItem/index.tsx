import { Thief } from '@/types'

type Props = Thief & {
  onClick: (thief: Thief) => void
}

const ListItem: React.FC<Props> = (props) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    props.onClick(props)
  }

  return (
    <button
      className="flex cursor-pointer hover:bg-gray-700/50 items-center gap-4 block w-full p-2 rounded-lg"
      type="button"
      onClick={onClick}
    >
      <div className="size-12 rounded-full bg-gray-700 overflow-hidden">
        {props.image && (
          <img src={props.image} alt={props.name} className="size-full object-cover" />
        )}
      </div>
      <div className="text-left">
        <h1 className="font-medium text-ms">{props.name}</h1>
        <p className="font-light text-sm opacity-80">여기 값은 고민중..</p>
      </div>
    </button>
  )
}

export default ListItem
