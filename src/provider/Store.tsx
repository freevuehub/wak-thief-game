import { createContext, useMemo, useState } from 'react'
import { Thief, GameStat } from '@/types'
import { DEFAULT_GAME_STAT, PROMPT_KEY, THIEF_STATUS, THIEF_TEAM } from '@/constants'
import { filter, find, pipe, toArray } from '@fxts/core'
import { usePrompt } from '@/hooks'
import { syndicateAI, replacePrompt } from '@/lib'

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
      day: number
    }
  >
  log: Array<GroupLog>
}
type Context = {
  state: State
  storeLoading: Record<string, boolean>
  stat: GameStat
  thieves: Array<Thief>
  createdThief?: Thief & {
    status: THIEF_STATUS
    team: THIEF_TEAM
    day: number
  }
  createThief: (
    thief: Thief & {
      status: THIEF_STATUS
      team: THIEF_TEAM
    }
  ) => void
  updateLoading: (value: Record<string, boolean>) => void
  createGroupLog: (log: GroupLog) => void
  updateDays: () => void
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
  createdThief: undefined,
  createThief: () => {},
  updateLoading: () => {},
  createGroupLog: () => {},
  updateDays: () => {},
})

const StoreProvider: React.FC<Props> = (props) => {
  const { prompt } = usePrompt()
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
        day: 0,
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
        thieves: useMemo(() => {
          return pipe(
            state.thieves,
            filter(({ team }) => team === THIEF_TEAM.OUR),
            toArray
          )
        }, [state.thieves]),
        createdThief: useMemo(() => {
          return pipe(
            state.thieves,
            find(({ status }) => status === THIEF_STATUS.RECRUITING)
          )
        }, [state.thieves]),
        updateLoading: (value: Record<string, boolean>) => {
          setStoreLoading((prev) => ({ ...prev, ...value }))
        },
        updateDays: async () => {
          setStoreLoading((prev) => ({ ...prev, createNews: true }))
          await pipe(
            {
              events: '',
              oldEvents: '',
            },
            replacePrompt(prompt[PROMPT_KEY.CREATE_NEWS].ko),
            syndicateAI.createNews,
            (data) => {
              setState((prev) => ({
                ...prev,
                stat: { ...prev.stat, day: prev.stat.day + 1 },
              }))
              setStoreLoading((prev) => ({ ...prev, createNews: false }))
              console.log(data)
            }
          )
        },
        createThief: (thief) => {
          console.log({ thief })
          setState((prev) => ({
            ...prev,
            thieves: [...prev.thieves, { ...thief, day: prev.stat.day }],
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
