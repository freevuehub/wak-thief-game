import { createContext, useState } from 'react'

import { Profile } from '@/types'
import { useAI } from '@/hooks'

export const StoreContext = createContext({
  loading: true,
  createThief: (_: Profile) => new Promise(() => {}),
})

type Props = {
  children: React.ReactNode
}

const StoreProvider: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const { createThief } = useAI()

  return (
    <StoreContext.Provider
      value={{
        loading,
        createThief: async (data: Profile) => {
          try {
            setLoading(true)
            const profile = await createThief(data)

            console.log(profile)
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
