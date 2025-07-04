import { pipe, concat, join } from '@fxts/core'

type Props = {
  children: React.ReactNode
  className?: string
}

const Card: React.FC<Props> = (props) => {
  return (
    <div
      className={pipe(
        ['bg-gray-800', 'border-2', 'border-red-500', 'rounded-lg', 'text-white'],
        concat([props.className ?? '']),
        join(' ')
      )}
    >
      {props.children}
    </div>
  )
}

export default Card
