import { useMemo, useState } from 'react'
import { Card, Thief } from '@/components'
import type { Area, Thief as ThiefType } from '@/types'
import Button from './Button'
import { usePrompt, useStore } from '@/hooks'
import { filter, map, pipe, toArray } from '@fxts/core'
import { PROMPT_KEY, THIEF_STATUS } from '@/constants'
import { replacePrompt } from '@/lib'

type Props = {
  area: Area
  onClose: () => void
}

enum ACTION_TYPE {
  PATROL = 'patrol',
  WORK = 'work',
}

const Section: React.FC<{ children: React.ReactNode }> = (props) => {
  return <div className="mt-4 pt-4 border-t border-gray-200/50">{props.children}</div>
}

const Actions: React.FC<Props> = (props) => {
  const { thieves } = useStore()
  const { prompt } = usePrompt()
  const [actionType, setActionType] = useState<ACTION_TYPE | ''>('')
  const [thief, setThief] = useState<ThiefType | null>(null)
  const [workThief, setWorkThief] = useState<ThiefType | null>(null)
  const list = useMemo(() => {
    return pipe(
      thieves,
      filter(({ status }) => status === THIEF_STATUS.IDLE),
      toArray
    )
  }, [thieves])

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setActionType(event.currentTarget.value as ACTION_TYPE)
  }
  const onThiefClick = (thief: ThiefType) => {
    setThief(thief)
  }
  const onCancel = () => {
    setThief(null)
  }
  const onSelect = () => {
    setWorkThief(thief)
  }

  return (
    <Card className="p-4 max-w-md">
      <h1 className="text-lg">{props.area.name}</h1>
      <p className="text-sm">{props.area.function}</p>
      <ul className="flex gap-2 mt-4">
        {actionType !== ACTION_TYPE.WORK && (
          <li className="flex-1">
            <Button
              className="bg-blue-500 disabled:bg-blue-300"
              value={ACTION_TYPE.PATROL}
              type="button"
              onClick={onClick}
              disabled={!!actionType}
            >
              정찰
            </Button>
          </li>
        )}
        {actionType !== ACTION_TYPE.PATROL && (
          <li className="flex-1">
            <Button
              className="bg-green-500 disabled:bg-green-300"
              value={ACTION_TYPE.WORK}
              type="button"
              onClick={onClick}
              disabled={!!actionType}
            >
              활동
            </Button>
          </li>
        )}
      </ul>
      {!!actionType && (
        <Section>
          {!thief ? (
            list.length > 0 ? (
              <ul className="flex flex-col gap-2 mb-2">
                {pipe(
                  list,
                  map((thief) => (
                    <li key={thief.id} className="w-full">
                      <Thief.ListItem {...thief} onClick={onThiefClick} />
                    </li>
                  )),
                  toArray
                )}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 mb-2">
                <p className="text-sm">활동이 가능한 조직원이 없습니다.</p>
                <Button
                  className="bg-blue-500 disabled:bg-blue-300"
                  type="button"
                  onClick={props.onClose}
                >
                  닫기
                </Button>
              </div>
            )
          ) : (
            <>
              <div className="mb-2">
                <Thief.ListItem {...thief} onClick={onThiefClick} />
              </div>
              <Thief.Talk prompt={prompt[PROMPT_KEY.TALK_THIEF].ko} thief={thief}>
                <ul className="flex gap-2 mt-4">
                  {!workThief && (
                    <li className="flex-1">
                      <Button
                        className="bg-red-500 disabled:bg-red-300"
                        type="button"
                        onClick={onCancel}
                      >
                        취소
                      </Button>
                    </li>
                  )}
                  <li className="flex-1">
                    <Button
                      className="bg-blue-500 disabled:bg-blue-300"
                      type="button"
                      disabled={!!workThief}
                      onClick={onSelect}
                    >
                      선택
                    </Button>
                  </li>
                </ul>
              </Thief.Talk>
            </>
          )}
        </Section>
      )}
      {actionType === ACTION_TYPE.WORK && workThief && (
        <Section>
          <Thief.Talk
            prompt={replacePrompt(prompt[PROMPT_KEY.TALK_WORK_THIEF].ko)({
              area: props.area.name,
              function: props.area.function,
              police: props.area.police,
            })}
            thief={workThief}
          >
            <ul className="flex gap-2 mt-4">
              <li className="flex-1">
                <Button
                  className="bg-blue-500 disabled:bg-blue-300"
                  type="button"
                  onClick={onSelect}
                >
                  닫기
                </Button>
              </li>
            </ul>
          </Thief.Talk>
        </Section>
      )}
    </Card>
  )
}

export default Actions
