import { Card } from '@/components'
import type { Thief } from '@/types'
import * as Actions from './Actions'

type Props = Thief & {
  type: 'thief' | 'recruitment'
}

const Report: React.FC<Props> = (props) => {
  return (
    <Card className="shadow-2xl w-full max-w-md w-screen py-4">
      <ul className="flex px-4 mb-4">
        <li className="flex-1 text-lg">
          급료: <span className="text-green-500">${props.cost}</span>
        </li>
        <li className="flex-1 text-lg">
          충성도: <span className="text-red-500">{props.loyalty}</span>
        </li>
      </ul>
      <div className="w-full aspect-square overflow-hidden bg-gray-700 mb-4">
        {props.image && (
          <img src={props.image} alt={props.name} className="size-full object-cover" />
        )}
      </div>
      <div className="flex flex-col gap-2 items-center justify-center px-4">
        <p className="text-xl truncate w-full text-center">{props.name}</p>
      </div>
      {props.type === 'thief' ? <Actions.Default {...props} /> : <Actions.Recruitment {...props} />}
    </Card>
  )
}

export default Report
