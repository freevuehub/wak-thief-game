import { createContext, useState } from 'react'
import { thiefAI } from '@/lib'
import { usePrompt } from '@/hooks'
import { PROMPT_KEY } from '@/constants'
import { pipe } from '@fxts/core'
import { Profile, Thief, ImageParams, ThrowOutThiefParams, RestThiefParams } from '@/types'
import { v4 as uuidv4 } from 'uuid'

export const AIContext = createContext({
  aiLoading: false,
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
  const [aiLoading, setAiLoading] = useState(false)

  return (
    <AIContext.Provider
      value={{
        aiLoading,
        createThief: (profile: Profile) => {
          return new Promise<Thief>((resolve, reject) => {
            try {
              setAiLoading(true)
              pipe(profile, thiefAI.createThief(prompt[PROMPT_KEY.CREATE_THIEF].ko), (data) => {
                resolve({ ...data, id: uuidv4() })
              })
            } catch (error) {
              reject(error)
            } finally {
              setAiLoading(false)
            }
          })
        },
        createThiefImage: (params: ImageParams) => {
          return new Promise<string>((resolve, reject) => {
            try {
              setAiLoading(true)
              pipe(
                params,
                thiefAI.createThiefImage(prompt[PROMPT_KEY.CREATE_PROFILE_IMAGE].ko),
                (data) => {
                  resolve(data)
                }
              )
            } catch (error) {
              reject(error)
            } finally {
              setAiLoading(false)
            }
          })
        },
        throwOutThief: (params: ThrowOutThiefParams) => {
          return new Promise<{ dialogue: Array<string> }>((resolve, reject) => {
            try {
              setAiLoading(true)
              pipe(params, thiefAI.throwOutThief(prompt[PROMPT_KEY.THROW_OUT_THIEF].ko), (data) => {
                resolve(data)
              })
            } catch (error) {
              reject(error)
            } finally {
              setAiLoading(false)
            }
          })
        },
        restThief: (params: RestThiefParams) => {
          return new Promise<{ dialogue: Array<string> }>((resolve, reject) => {
            try {
              setAiLoading(true)
              pipe(params, thiefAI.restThief(prompt[PROMPT_KEY.REST_THIEF].ko), (data) => {
                resolve(data)
              })
            } catch (error) {
              reject(error)
            } finally {
              setAiLoading(false)
            }
          })
        },
      }}
    >
      {props.children}
    </AIContext.Provider>
  )
}

export default AIProvider
