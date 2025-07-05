import { createContext, useState } from 'react'
import { Thief, Profile, GameStat } from '@/types'
import { useAI } from '@/hooks'
import { DEFAULT_GAME_STAT } from '@/constants'

export const StoreContext = createContext({
  thiefCreateLoading: true,
  thieves: [] as Array<Thief>,
  gameStat: DEFAULT_GAME_STAT,
  selectedThief: null as Thief | null,
  setSelectedThief: (_: Thief | null) => {},
  setGameStat: (_: Record<keyof GameStat, GameStat[keyof GameStat]>) => {},
  createThief: (_: Profile) => new Promise(() => {}),
})

type Props = {
  children: React.ReactNode
}

const StoreProvider: React.FC<Props> = (props) => {
  const { createThief, createThiefImage } = useAI()

  const [thiefCreateLoading, setThiefCreateLoading] = useState<boolean>(false)
  const [selectedThief, setSelectedThief] = useState<Thief | null>(null)
  const [thieves, setThieves] = useState<Array<Thief>>([
    {
      id: 'a',
      name: '릴파',
      personality: '목청이 좋음, 극E, 극P',
      background: '어두운 게임을 좋아함.',
      dialogue: ['릴파!!!!!', '요고랑, 조고랑', '봐줘잉~~'],
      character: '목청이 좋은 외톨이',
      loyalty: 100,
      cost: 100,
      image: '',
    },
  ])
  const [gameStat, setGameStat] = useState<GameStat>(DEFAULT_GAME_STAT)

  return (
    <StoreContext.Provider
      value={{
        thiefCreateLoading,
        thieves,
        gameStat,
        selectedThief,
        setSelectedThief,
        setGameStat: (value: Record<keyof GameStat, GameStat[keyof GameStat]>) => {
          setGameStat((prev) => ({ ...prev, ...value }))
        },
        createThief: async (data: Profile) => {
          try {
            setThiefCreateLoading(true)
            const thief = await createThief(data)
            const image = await createThiefImage({
              character: thief.character,
              background: thief.background,
            })

            setThieves((prev) => [...prev, { ...thief, image: image }])
          } catch {
            alert('조직원 생성 중 오류가 발생했습니다. API 키를 확인하고 다시 시도해주세요.')
          } finally {
            setThiefCreateLoading(false)
          }
        },
      }}
    >
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
