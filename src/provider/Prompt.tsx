import { createContext, useState, useEffect } from 'react'
import { getGoogleSheets } from '@/utils'
import { map, pipe, fromEntries } from '@fxts/core'
import { PROMPT_KEY } from '@/constants'

type PromptValue = {
  prompt: Record<string, { ko: string; en: string }>
}

export const PromptContext = createContext<PromptValue>({
  prompt: {
    [PROMPT_KEY.CREATE_THIEF]: { ko: '', en: '' },
  },
})

type Props = {
  children: React.ReactNode
}

const PromptProvider: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [prompt, setPrompt] = useState<Record<string, { ko: string; en: string }>>({})

  useEffect(() => {
    pipe(
      getGoogleSheets(),
      map(([key, ko, en]) => [key, { ko, en: en || ko }] as const),
      fromEntries,
      (data) => {
        setIsLoading(false)
        setPrompt(data)
      }
    )
  }, [])

  return (
    <PromptContext.Provider value={{ prompt }}>
      {isLoading ? 'Loading...' : props.children}
    </PromptContext.Provider>
  )
}

export default PromptProvider
