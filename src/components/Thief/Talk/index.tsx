import { Typewriter, Spinner } from '@/components'
import { useEffect, useState } from 'react'
import { pipe, join } from '@fxts/core'
import { MemberState } from '@/types'
import { usePrompt } from '@/hooks'
import { PROMPT_KEY } from '@/constants'

type Props = {
  prompt: PROMPT_KEY
  data: Omit<MemberState, 'image' | 'id'> & Record<string, string | number>
  children?: React.ReactNode
}

const Talk: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isEnded, setIsEnded] = useState(false)
  const [dialogue, setDialogue] = useState<Array<string>>([])
  const { gemini } = usePrompt()

  useEffect(() => {
    if (dialogue.length > 0) return

    setIsLoading(true)
    pipe(props.data, gemini.generateTalkResponse(props.prompt), ({ dialogue }) => {
      setDialogue(dialogue)
      setIsLoading(false)
    })
  }, [dialogue, props.prompt, props.data])

  return (
    <div className="flex flex-col gap-2">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <Typewriter onEnded={() => setIsEnded(true)}>{join('\n', dialogue)}</Typewriter>
          {isEnded && props.children}
        </>
      )}
    </div>
  )
}

export default Talk
