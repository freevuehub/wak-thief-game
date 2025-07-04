import { useStore } from '@/hooks'
import { pipe, toArray, map } from '@fxts/core'
import { Thief } from '@/components'

const Side: React.FC = () => {
  const { thieves } = useStore()

  return (
    <div className="fixed top-0 left-0 w-[300px] bottom-0 bg-gray-800 flex flex-col">
      <h1 className="text-2xl font-display text-red-500 p-4">Syndicate</h1>
      <ul className="flex flex-col gap-2 flex-1 overflow-y-auto p-4">
        {pipe(
          thieves,
          map((thief) => <Thief.Profile key={thief.id} {...thief} />),
          toArray
        )}
      </ul>
    </div>
  )
}

export default Side
