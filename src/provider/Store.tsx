import { createContext, useEffect, useMemo, useState } from 'react'
import { Thief, Profile, GameStat } from '@/types'
import { useAI } from '@/hooks'
import { DEFAULT_GAME_STAT, PROMPT_KEY } from '@/constants'

type Props = {
  children: React.ReactNode
}
type GroupLog = {
  day: number
  message: string
  type: PROMPT_KEY
  thiefId?: string
}

export const StoreContext = createContext({
  storeLoading: { createThief: false, createNews: false } as Record<string, boolean>,
  thieves: [] as Array<Thief>,
  gameStat: DEFAULT_GAME_STAT,
  selectedThief: null as Thief | null,
  groupLog: [] as Array<GroupLog>,
  createdThieves: null as {
    thief: Thief | null
    day: number
  } | null,
  setGroupLog: (_: Array<GroupLog>) => {},
  setSelectedThief: (_: Thief | null) => {},
  setGameStat: (_: Record<keyof GameStat, GameStat[keyof GameStat]>) => {},
  createThief: (_: Profile) => new Promise(() => {}),
  updateDays: () => {},
})

const StoreProvider: React.FC<Props> = (props) => {
  const { createThief, createThiefImage } = useAI()

  const [storeLoading, setStoreLoading] = useState<Record<string, boolean>>({
    createThief: false,
    createNews: false,
  })

  const [createdThieves, setCreatedThieves] = useState<{
    thief: Thief | null
    day: number
  } | null>(null)
  const [selectedThief, setSelectedThief] = useState<Thief | null>(null)
  const [thieves, setThieves] = useState<Array<Thief>>([
    // {
    //   id: 'a',
    //   name: '릴파',
    //   personality: '목청이 좋음, 극E, 극P',
    //   background: '어두운 게임을 좋아함.',
    //   dialogue: ['릴파!!!!!', '요고랑, 조고랑', '봐줘잉~~'],
    //   character: '목청이 좋은 외톨이',
    //   loyalty: 100,
    //   cost: 100,
    //   image: '',
    // },
  ])
  const [gameStat, setGameStat] = useState<GameStat>(DEFAULT_GAME_STAT)
  const [groupLog, setGroupLog] = useState<Array<GroupLog>>([])

  return (
    <StoreContext.Provider
      value={{
        storeLoading,
        thieves,
        gameStat,
        selectedThief,
        groupLog,
        createdThieves,
        setSelectedThief,
        setGroupLog: (value: Array<GroupLog>) => {
          setGroupLog((prev) => [...prev, ...value])
        },
        setGameStat: (value: Record<keyof GameStat, GameStat[keyof GameStat]>) => {
          setGameStat((prev) => ({ ...prev, ...value }))
        },
        createThief: async (data: Profile) => {
          try {
            setStoreLoading((prev) => ({ ...prev, createThief: true }))
            setCreatedThieves({ thief: null, day: gameStat.day })

            const thief = await createThief(data)
            const image = await createThiefImage({
              character: thief.character,
              background: thief.background,
            })

            setCreatedThieves({ thief: { ...thief, image }, day: gameStat.day })

            // setThieves((prev) => [...prev, { ...thief, image: image }])
          } catch {
            alert('조직원 생성 중 오류가 발생했습니다. API 키를 확인하고 다시 시도해주세요.')
          } finally {
            setStoreLoading((prev) => ({ ...prev, createThief: false }))
          }
        },
        updateDays: () => {
          setStoreLoading((prev) => ({ ...prev, createNews: true }))
          setGameStat((prev) => ({ ...prev, day: prev.day + 1 }))

          setTimeout(() => {
            setStoreLoading((prev) => ({ ...prev, createNews: false }))
          }, 4000)
        },
      }}
    >
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
