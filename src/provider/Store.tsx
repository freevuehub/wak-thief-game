import { createContext, useState } from 'react'
import { Thief, Profile, GameStat } from '@/types'
import { useAI } from '@/hooks'
import { DEFAULT_GAME_STAT } from '@/constants'

export const StoreContext = createContext({
  loading: true,
  thieves: [] as Array<Thief>,
  gameStat: DEFAULT_GAME_STAT,
  setGameStat: (_: Record<keyof GameStat, GameStat[keyof GameStat]>) => {},
  createThief: (_: Profile) => new Promise(() => {}),
})

type Props = {
  children: React.ReactNode
}

const StoreProvider: React.FC<Props> = (props) => {
  const { createThief } = useAI()

  const [loading, setLoading] = useState<boolean>(false)
  const [thieves, setThieves] = useState<Array<Thief>>([
    {
      id: 'a',
      name: 'John Doe',
      personality: 'John Doe',
      background: 'John Doe',
      dialogue: [],
      character: '',
      loyalty: 0,
      cost: 0,
    },
    {
      id: 'b',
      name: 'Jane Doe',
      personality: 'Jane Doe',
      background: 'Jane Doe',
      dialogue: [],
      character: '',
      loyalty: 0,
      cost: 0,
    },
    {
      id: 'c',
      name: 'John Doe',
      personality: 'John Doe',
      background: 'John Doe',
      dialogue: [],
      character: '',
      loyalty: 0,
      cost: 0,
    },
    {
      id: 'd',
      name: 'John Doe',
      personality: 'John Doe',
      background: 'John Doe',
      dialogue: [],
      character: '',
      loyalty: 0,
      cost: 0,
    },
    {
      id: 'e',
      name: 'John Doe',
      personality: 'John Doe',
      background: 'John Doe',
      dialogue: [],
      character: '',
      loyalty: 0,
      cost: 0,
    },
    {
      id: 'f',
      name: 'John Doe',
      personality: 'John Doe',
      background: 'John Doe',
      dialogue: [],
      character: '',
      loyalty: 0,
      cost: 0,
    },
    {
      id: 'g',
      name: 'John Doe',
      personality: 'John Doe',
      background: 'John Doe',
      dialogue: [],
      character: '',
      loyalty: 0,
      cost: 0,
    },
    {
      id: 'h',
      name: 'John Doe',
      personality: 'John Doe',
      background: 'John Doe',
      dialogue: [],
      character: '',
      loyalty: 0,
      cost: 0,
    },
    {
      id: 'i',
      name: 'John Doe',
      personality: 'John Doe',
      background: 'John Doe',
      dialogue: [],
      character: '',
      loyalty: 0,
      cost: 0,
    },
    {
      id: 'j',
      name: 'John Doe',
      personality: 'John Doe',
      background: 'John Doe',
      dialogue: [],
      character: '',
      loyalty: 0,
      cost: 0,
    },
    {
      id: 'k',
      name: 'John Doe',
      personality: 'John Doe',
      background: 'John Doe',
      dialogue: [],
      character: '',
      loyalty: 0,
      cost: 0,
    },
    {
      id: 'l',
      name: 'John Doe',
      personality: 'John Doe',
      background: 'John Doe',
      dialogue: [],
      character: '',
      loyalty: 0,
      cost: 0,
    },
    {
      id: 'm',
      name: 'John Doe',
      personality: 'John Doe',
      background: 'John Doe',
      dialogue: [],
      character: '',
      loyalty: 0,
      cost: 0,
    },
  ])
  const [gameStat, setGameStat] = useState<GameStat>(DEFAULT_GAME_STAT)

  return (
    <StoreContext.Provider
      value={{
        loading,
        thieves,
        gameStat,
        setGameStat: (value: Record<keyof GameStat, GameStat[keyof GameStat]>) => {
          setGameStat((prev) => ({ ...prev, ...value }))
        },
        createThief: async (data: Profile) => {
          try {
            setLoading(true)
            const thief = await createThief(data)

            setThieves((prev) => [...prev, { ...thief }])
          } catch {
            alert('조직원 생성 중 오류가 발생했습니다. API 키를 확인하고 다시 시도해주세요.')
          } finally {
            setLoading(false)
          }
        },
      }}
    >
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
