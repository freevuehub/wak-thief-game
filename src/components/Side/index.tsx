import { useStore } from '@/hooks'
import { pipe, toArray, map } from '@fxts/core'
import { Thief } from '@/components'
import { MEMBER_SELECTED_TYPE } from '@/constants'
import { Dialog } from '@/components'
import { useState } from 'react'
import type { Member } from '@/types'

type Props = {
  onCreate: () => void
  createLoading: boolean
}

const Side: React.FC<Props> = (props) => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [dialogType, setDialogType] = useState<MEMBER_SELECTED_TYPE>(MEMBER_SELECTED_TYPE.DEFAULT)
  const { ourMembers, newMember } = useStore()

  const onMemberClick = (member: Member) => {
    setSelectedMember(member)
    setDialogType(MEMBER_SELECTED_TYPE.DEFAULT)
  }

  const onRecruitmentMemberClick = (member: Member) => {
    setSelectedMember(member)
    setDialogType(MEMBER_SELECTED_TYPE.RECRUITMENT)
  }

  return (
    <>
      {selectedMember && (
        <Dialog>
          <Thief.Report
            {...selectedMember}
            type={dialogType}
            onClose={() => setSelectedMember(null)}
          />
        </Dialog>
      )}
      <div className="fixed top-0 left-0 w-[300px] bottom-0 bg-gray-800 flex flex-col pb-20">
        <h1 className="text-2xl font-display text-red-500 p-4">Syndicate</h1>
        {props.createLoading ? (
          <div className="p-4 text-center">영입중...</div>
        ) : newMember ? (
          <div className="p-4">
            <Thief.ListItem key={newMember.id} {...newMember} onClick={onRecruitmentMemberClick} />
          </div>
        ) : (
          <div className="p-4">
            <button
              className="flex cursor-pointer hover:bg-gray-700/50 items-center gap-4 block w-full p-2 rounded-lg justify-center"
              type="button"
              onClick={props.onCreate}
            >
              + 신규 영입
            </button>
          </div>
        )}
        <ul className="flex flex-col gap-2 flex-1 overflow-y-auto p-4 scroll-smooth">
          {pipe(
            ourMembers,
            map((member) => <Thief.ListItem key={member.id} {...member} onClick={onMemberClick} />),
            toArray
          )}
        </ul>
      </div>
    </>
  )
}

export default Side
