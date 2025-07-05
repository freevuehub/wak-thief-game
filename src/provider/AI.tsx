import { createContext } from 'react'
import { thiefAI } from '@/lib'
import { usePrompt } from '@/hooks'
import { PROMPT_KEY } from '@/constants'
import { pipe } from '@fxts/core'
import { Profile, Thief, ImageParams, ThrowOutThiefParams, RestThiefParams } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export const AIContext = createContext({
  createThief: (_: Profile) => new Promise<Thief>(() => {}),
  createThiefImage: (_: ImageParams) => new Promise<string>(() => {}),
  throwOutThief: (_: ThrowOutThiefParams) => new Promise<{ dialogue: Array<string> }>(() => {}),
  restThief: (_: RestThiefParams) => new Promise<{ dialogue: Array<string> }>(() => {}),
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
          return new Promise<Thief>((resolve) => {
            pipe(profile, thiefAI.createThief(prompt[PROMPT_KEY.CREATE_THIEF].ko), (data) => {
              resolve({ ...data, id: uuidv4() })
            })
          })
        },
        createThiefImage: (params: ImageParams) => {
          return new Promise<string>((resolve) => {
            pipe(
              params,
              thiefAI.createThiefImage(prompt[PROMPT_KEY.CREATE_PROFILE_IMAGE].ko),
              (data) => {
                resolve(data)
              }
            )
          })
        },
        throwOutThief: (params: ThrowOutThiefParams) => {
          return new Promise<{ dialogue: Array<string> }>((resolve) => {
            pipe(params, thiefAI.throwOutThief(prompt[PROMPT_KEY.THROW_OUT_THIEF].ko), (data) => {
              resolve(data)
            })
          })
        },
        restThief: (params: RestThiefParams) => {
          return new Promise<{ dialogue: Array<string> }>((resolve) => {
            pipe(params, thiefAI.restThief(prompt[PROMPT_KEY.REST_THIEF].ko), (data) => {
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
