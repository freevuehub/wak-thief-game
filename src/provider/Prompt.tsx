import { createContext, useState, useEffect, useMemo, useRef } from 'react'
import { getGoogleSheets } from '@/utils'
import { map, pipe, fromEntries } from '@fxts/core'
import { Spinner } from '@/components'
import { Gemini } from '@/lib'

type PromptValue = {
  prompt: Record<string, { ko: string; en: string }>
  gemini: Gemini
  loading: boolean
}

export const PromptContext = createContext<PromptValue>({
  prompt: {},
  gemini: new Gemini({}, () => {}),
  loading: false,
})

type Props = {
  children: React.ReactNode
}

const PromptProvider: React.FC<Props> = (props) => {
  const [prompt, setPrompt] = useState<Record<string, { ko: string; en: string }>>({})
  const [loading, setLoading] = useState(false)

  const currentLoading = useRef(loading)

  const isLoaded = useMemo(() => {
    return Object.values(prompt).length === 0
  }, [prompt])
  const gemini = useMemo(() => {
    return new Gemini(prompt, (newsLoading, loadingCount) => {
      if (newsLoading || currentLoading.current) setLoading(loadingCount !== 0)
      if (newsLoading) setLoading(newsLoading)
    })
  }, [prompt])

  useEffect(() => {
    currentLoading.current = loading
  }, [loading])
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

  return (
    <PromptContext.Provider value={{ prompt, gemini, loading }}>
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
