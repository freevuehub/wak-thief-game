import { createContext } from 'react'
import { thiefAI } from '@/lib'
import { usePrompt } from '@/hooks'
import { PROMPT_KEY } from '@/constants'

export const AIContext = createContext({
  createThief: () => {},
})

type Props = {
  children: React.ReactNode
}

const AIProvider: React.FC<Props> = (props) => {
  const { prompt } = usePrompt()

  return (
    <AIContext.Provider
      value={{
        createThief: () => {
          thiefAI.createThief(prompt[PROMPT_KEY.CREATE_THIEF].ko)({
            name: 'John Doe',
            personality: 'Mysterious',
            background: 'Ex-spy',
          })
        },
      }}
    >
      {props.children}
    </AIContext.Provider>
  )
}

export default AIProvider
