import { useStore } from '@/hooks'
import { pipe, toArray, map } from '@fxts/core'
import { Thief } from '@/components'

type Props = {
  onCreateThief: () => void
}

const Side: React.FC<Props> = (props) => {
  const { thieves, createdThieves, gameStat } = useStore()

  return (
    <div className="fixed top-0 left-0 w-[300px] bottom-0 bg-gray-800 flex flex-col pb-20">
      <h1 className="text-2xl font-display text-red-500 p-4">Syndicate</h1>
      {createdThieves ? (
        createdThieves.day === gameStat.day || createdThieves.thief === null ? (
          <div className="p-4">영입중...</div>
        ) : (
          <div className="p-4">
            <Thief.Profile {...createdThieves.thief} />
          </div>
        )
      ) : (
        <div className="p-4">
          <button
            className="flex cursor-pointer hover:bg-gray-700/50 items-center gap-4 block w-full p-2 rounded-lg justify-center"
            type="button"
            onClick={props.onCreateThief}
          >
            + 신규 영입
          </button>
        </div>
      )}
      <ul className="flex flex-col gap-2 flex-1 overflow-y-auto p-4 scroll-smooth">
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
