import { Typewriter, Spinner } from '@/components'
import { useEffect, useState } from 'react'
import { pipe, join } from '@fxts/core'
import { syndicateAI } from '@/lib'
import { Thief } from '@/types'

type Props = {
  prompt: string
  thief: Thief
  children?: React.ReactNode
}

const Talk: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isEnded, setIsEnded] = useState(false)
  const [dialogue, setDialogue] = useState<Array<string>>([])

  useEffect(() => {
    setIsLoading(true)
    pipe(props.thief, syndicateAI.createThiefResponse(props.prompt), ({ dialogue }) => {
      setDialogue(dialogue)
      setIsLoading(false)
    })
  }, [props.prompt, props.thief])

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
