import { GenerateContentResponse, GoogleGenAI } from '@google/genai'
import { GEMINI_MODELS, PROMPT_KEY } from '@/constants'
import { replacePrompt } from '@/lib'
import { head, isNil, isUndefined, pipe, throwIf } from '@fxts/core'
import type { MemberProfile, MemberState } from '@/types'

export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

class Gemini {
  private loadingCount: number = 0

  constructor(private prompt: Record<string, { ko: string; en: string }>) {}

  public async generateThief(params: { name: string; personality: string; background: string }) {
    this.loadingCount++

    try {
      return pipe(
        params,
        replacePrompt(this.prompt[PROMPT_KEY.GENERATE_MEMBER].ko),
        (prompt) =>
          ai.models.generateContent({
            model: GEMINI_MODELS.FLASH,
            contents: prompt,
            config: { responseMimeType: 'application/json' },
          }),
        (response) => this.parseJson<MemberState>(response),
        throwIf(isNil, () => Error('')),
        async (thief) => {
          try {
            const image = await this.generateThiefImage({
              character: thief.character,
              background: thief.background,
            })

            return { ...thief, image }
          } catch {
            throw new Error('조직원 이미지를 생성하지 못했습니다. 다시 시도해주세요.')
          }
        }
      )
    } catch {
      throw new Error('조직원을 생성하지 못했습니다. 다시 시도해주세요.')
    } finally {
      this.loadingCount--
    }
  }
  public async generateThiefImage(params: { character: string; background: string }) {
    this.loadingCount++

    try {
      return pipe(
        params,
        replacePrompt(this.prompt[PROMPT_KEY.GENERATE_MEMBER_IMAGE].ko),
        (prompt) =>
          ai.models.generateImages({
            model: GEMINI_MODELS.IMAGE,
            prompt,
            config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
          }),
        (response) => response.generatedImages,
        throwIf(isUndefined, () => Error('')),
        head,
        throwIf(isUndefined, () => Error('')),
        ({ image }) => (image ? `data:image/jpeg;base64,${image.imageBytes}` : '')
      )
    } catch {
      return ''
    } finally {
      this.loadingCount--
    }
  }
  public generateTalkResponse(key: PROMPT_KEY) {
    return async (params: MemberProfile & Record<string, string | number>) => {
      try {
        return pipe(
          params,
          replacePrompt(this.prompt[key].ko),
          (prompt) =>
            ai.models.generateContent({ model: GEMINI_MODELS.FLASH_LIGHT, contents: prompt }),
          (response) => this.parseJson<{ dialogue: string[]; feelings: string }>(response),
          throwIf(isNil, () => Error('')),
          (response) => response
        )
      } catch {
        return {
          dialogue: [],
          feelings: '',
        }
      }
    }
  }
  public async generateNews() {
    this.loadingCount++

    try {
    } catch {
      return ''
    } finally {
      this.loadingCount--
    }
  }

  private parseJson<T>(response: GenerateContentResponse) {
    let jsonStr = response.text?.trim() || ''

    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s
    const match = jsonStr.match(fenceRegex)
    if (match && match[2]) jsonStr = match[2].trim()

    try {
      return JSON.parse(jsonStr) as T
    } catch (error) {
      return null
    }
  }
}

export default Gemini
