import { createContext, useMemo, useState } from 'react'
import { Thief, GameStat } from '@/types'
import { DEFAULT_GAME_STAT, PROMPT_KEY, THIEF_STATUS, THIEF_TEAM } from '@/constants'
import { filter, pipe, toArray } from '@fxts/core'

type Props = {
  children: React.ReactNode
}
type GroupLog = {
  day: number
  message: string
  type: PROMPT_KEY
  thiefId?: string
}
type State = {
  stat: GameStat
  thieves: Array<
    Thief & {
      status: THIEF_STATUS
      team: THIEF_TEAM
    }
  >
  log: Array<GroupLog>
}
type Context = {
  state: State
  storeLoading: Record<string, boolean>
  stat: GameStat
  thieves: Array<Thief>
  createThief: (
    thief: Thief & {
      status: THIEF_STATUS
      team: THIEF_TEAM
    }
  ) => void
  updateLoading: (value: Record<string, boolean>) => void
  createGroupLog: (log: GroupLog) => void
}

export const StoreContext = createContext<Context>({
  state: {
    stat: DEFAULT_GAME_STAT,
    thieves: [],
    log: [],
  },
  storeLoading: { createThief: false, createNews: false },
  stat: DEFAULT_GAME_STAT,
  thieves: [],
  createThief: () => {},
  updateLoading: () => {},
  createGroupLog: () => {},
})

const StoreProvider: React.FC<Props> = (props) => {
  const [storeLoading, setStoreLoading] = useState<Record<string, boolean>>({
    createThief: false,
    createNews: false,
  })
  const [state, setState] = useState<State>({
    stat: DEFAULT_GAME_STAT,
    thieves: [
      {
        id: 'a',
        name: '릴파',
        personality: '목청이 좋음, 극E, 극P',
        background: '어두운 게임을 좋아함.',
        character: '목청이 좋은 외톨이',
        loyalty: 100,
        cost: 100,
        image: '',
        fatigue: 0,
        status: THIEF_STATUS.IDLE,
        team: THIEF_TEAM.OUR,
      },
    ],
    log: [],
  })

  return (
    <StoreContext.Provider
      value={{
        storeLoading,
        state,
        stat: useMemo(() => state.stat, [state.stat]),
        thieves: useMemo(
          () =>
            pipe(
              state.thieves,
              filter(({ team }) => team === THIEF_TEAM.OUR),
              toArray
            ),
          [state.thieves]
        ),
        updateLoading: (value: Record<string, boolean>) => {
          setStoreLoading((prev) => ({ ...prev, ...value }))
        },
        createThief: (thief) => {
          setState((prev) => ({
            ...prev,
            thieves: [...prev.thieves, thief],
          }))
        },
        createGroupLog: (log) => {
          setState((prev) => ({
            ...prev,
            log: [...prev.log, log],
          }))
        },
      }}
    >
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
