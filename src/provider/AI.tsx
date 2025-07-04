import { createContext } from 'react'
import { thiefAI } from '@/lib'
import { usePrompt } from '@/hooks'
import { PROMPT_KEY } from '@/constants'
import { pipe } from '@fxts/core'
import { Profile } from '@/types'

export const AIContext = createContext({
  createThief: (_: Profile) => new Promise(() => {}),
})

type Props = {
  children: React.ReactNode
}

const AIProvider: React.FC<Props> = (props) => {
  const { prompt } = usePrompt()

  return (
    <AIContext.Provider
      value={{
        createThief: (profile: Profile) => {
          return new Promise((resolve) => {
            pipe(profile, thiefAI.createThief(prompt[PROMPT_KEY.CREATE_THIEF].ko), (data) => {
              resolve(data)
            })
          })
        },
      }}
    >
      {props.children}
    </AIContext.Provider>
  )
}

export default AIProvider
