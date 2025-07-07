import { useStore } from '@/hooks'
import { pipe, toArray, map } from '@fxts/core'
import { Thief } from '@/components'
import { THIEF_SELECTED_TYPE } from '@/constants'
import { Dialog } from '@/components'
import { useState } from 'react'
import type { Thief as ThiefType } from '@/types'

type Props = {
  onCreateThief: () => void
  createLoading: boolean
}

const Side: React.FC<Props> = (props) => {
  const [selectedThief, setSelectedThief] = useState<ThiefType | null>(null)
  const [dialogType, setDialogType] = useState<THIEF_SELECTED_TYPE>(THIEF_SELECTED_TYPE.THIEF)
  const { thieves, createdThief } = useStore()

  const onThiefClick = (thief: ThiefType) => {
    setSelectedThief(thief)
    setDialogType(THIEF_SELECTED_TYPE.THIEF)
  }

  const onRecruitmentThiefClick = (thief: ThiefType) => {
    setSelectedThief(thief)
    setDialogType(THIEF_SELECTED_TYPE.RECRUITMENT)
  }

  return (
    <>
      {selectedThief && (
        <Dialog>
          <Thief.Report
            {...selectedThief}
            type={dialogType}
            onClose={() => setSelectedThief(null)}
          />
        </Dialog>
      )}
      <div className="fixed top-0 left-0 w-[300px] bottom-0 bg-gray-800 flex flex-col pb-20">
        <h1 className="text-2xl font-display text-red-500 p-4">Syndicate</h1>
        {props.createLoading ? (
          <div className="p-4 text-center">영입중...</div>
        ) : createdThief ? (
          <div className="p-4">
            <Thief.ListItem {...createdThief} onClick={onRecruitmentThiefClick} />
          </div>
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
            map((thief) => <Thief.ListItem key={thief.id} {...thief} onClick={onThiefClick} />),
            toArray
          )}
        </ul>
      </div>
    </>
  )
}

export default Side
