import { createContext, useState, useEffect, useMemo } from 'react'
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
  const [prompt, setPrompt] = useState<Record<string, { ko: string; en: string }>>({})

  const isLoaded = useMemo(() => {
    return Object.values(prompt).length === 0
  }, [prompt])

  useEffect(() => {
    pipe(
      getGoogleSheets(),
      map(([key, ko, en]) => [key, { ko, en: en || ko }] as const),
      fromEntries,
      (data) => {
        setPrompt(data)
      }
    )
  }, [])

  console.log(prompt)

  return (
    <PromptContext.Provider value={{ prompt }}>
      {isLoaded ? 'Loading...' : props.children}
    </PromptContext.Provider>
  )
}

export default PromptProvider
