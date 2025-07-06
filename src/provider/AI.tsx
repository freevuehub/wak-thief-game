import { createContext, useState } from 'react'
import { syndicateAI } from '@/lib'
import { usePrompt } from '@/hooks'
import { PROMPT_KEY } from '@/constants'
import { pipe } from '@fxts/core'
import type {
  Profile,
  Thief,
  ImageParams,
  ThrowOutThiefParams,
  RestThiefParams,
  ThrowOutThiefResponse,
  RestThiefResponse,
  NewsParams,
  NewsResponse,
} from '@/types'
import { v4 as uuidv4 } from 'uuid'

export const AIContext = createContext({
  aiLoading: false,
  createThief: (_: Profile) =>
    new Promise<
      Pick<
        Thief,
        | 'name'
        | 'personality'
        | 'background'
        | 'dialogue'
        | 'character'
        | 'id'
        | 'cost'
        | 'loyalty'
        | 'fatigue'
      >
    >(() => {}),
  createThiefImage: (_: ImageParams) => new Promise<string>(() => {}),
  throwOutThief: (_: ThrowOutThiefParams) => new Promise<ThrowOutThiefResponse>(() => {}),
  restThief: (_: RestThiefParams) => new Promise<RestThiefResponse>(() => {}),
  createNews: (_: NewsParams) => new Promise<NewsResponse>(() => {}),
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
          return new Promise<
            Pick<
              Thief,
              | 'name'
              | 'personality'
              | 'background'
              | 'dialogue'
              | 'character'
              | 'id'
              | 'cost'
              | 'loyalty'
              | 'fatigue'
            >
          >((resolve, reject) => {
            try {
              setAiLoading(true)
              pipe(profile, syndicateAI.createThief(prompt[PROMPT_KEY.CREATE_THIEF].ko), (data) => {
                resolve({ ...data, id: uuidv4() })
                setAiLoading(false)
              })
            } catch (error) {
              reject(error)
            }
          })
        },
        createThiefImage: (params: ImageParams) => {
          return new Promise<string>((resolve, reject) => {
            try {
              setAiLoading(true)
              pipe(
                params,
                syndicateAI.createThiefImage(prompt[PROMPT_KEY.CREATE_PROFILE_IMAGE].ko),
                (data) => {
                  resolve(data)
                  setAiLoading(false)
                }
              )
            } catch (error) {
              reject(error)
            }
          })
        },
        throwOutThief: (params: ThrowOutThiefParams) => {
          return new Promise<ThrowOutThiefResponse>((resolve, reject) => {
            try {
              setAiLoading(true)
              pipe(
                params,
                syndicateAI.throwOutThief(prompt[PROMPT_KEY.THROW_OUT_THIEF].ko),
                (data) => {
                  resolve(data)
                  setAiLoading(false)
                }
              )
            } catch (error) {
              reject(error)
            }
          })
        },
        restThief: (params: RestThiefParams) => {
          return new Promise<RestThiefResponse>((resolve, reject) => {
            try {
              setAiLoading(true)
              pipe(params, syndicateAI.restThief(prompt[PROMPT_KEY.REST_THIEF].ko), (data) => {
                resolve(data)
                setAiLoading(false)
              })
            } catch (error) {
              reject(error)
            }
          })
        },
        createNews: (params: NewsParams) => {
          return new Promise<NewsResponse>((resolve, reject) => {
            try {
              setAiLoading(true)
              pipe(params, syndicateAI.createNews(prompt[PROMPT_KEY.CREATE_NEWS].ko), (data) => {
                resolve(data)
                setAiLoading(false)
              })
            } catch (error) {
              reject(error)
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
