import { createContext, useState, useEffect, useMemo } from 'react'
import { getGoogleSheets } from '@/utils'
import { map, pipe, fromEntries } from '@fxts/core'
import { Spinner } from '@/components'
import { Gemini } from '@/lib'

type PromptValue = {
  prompt: Record<string, { ko: string; en: string }>
  gemini: Gemini
}

export const PromptContext = createContext<PromptValue>({
  prompt: {},
  gemini: new Gemini({}),
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

  const gemini = useMemo(
    () =>
      new Proxy(new Gemini(prompt), {
        get(target, prop) {
          return target[prop as keyof typeof target]
        },
        set(target, prop, value) {
          target[prop as keyof typeof target] = value
          return true
        },
      }),
    [prompt]
  )

  return (
    <PromptContext.Provider value={{ prompt, gemini }}>
      {isLoaded ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        props.children
      )}
    </PromptContext.Provider>
  )
}

export default PromptProvider
