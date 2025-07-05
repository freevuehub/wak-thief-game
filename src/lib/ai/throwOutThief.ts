import { GenerateContentResponse } from '@google/genai'
import { ai } from '.'
import type { ThrowOutThiefParams } from '@/types'

const throwOutThief =
  (prompt: string) =>
  async (params: ThrowOutThiefParams): Promise<{ dialogue: Array<string> }> => {
    prompt = prompt.replace(/\$\{name\}/g, params.name)
    prompt = prompt.replace(/\$\{personality\}/g, params.personality || '')
    prompt = prompt.replace(/\$\{background\}/g, params.background || '')
    prompt = prompt.replace(/\$\{character\}/g, params.character || '')
    prompt = prompt.replace(/\$\{cost\}/g, params.cost.toString() || '')
    prompt = prompt.replace(/\$\{loyalty\}/g, params.loyalty.toString() || '')
    prompt = prompt.replace(/\$\{event\}/g, params.event || '')

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    })

    let jsonStr = response.text?.trim() || ''

    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s
    const match = jsonStr.match(fenceRegex)
    if (match && match[2]) jsonStr = match[2].trim()

    try {
      return JSON.parse(jsonStr) as { dialogue: Array<string> }
    } catch (error) {
      console.error('Failed to parse JSON from Gemini:', error)
      return {
        dialogue: [
          '보스... 제가 뭘 잘못했나요?',
          '다시 한번 기회를 주세요. 더 열심히 하겠습니다.',
          '이 조직에서 나가면 어디로 가야 할지 모르겠어요...',
        ],
      }
    }
  }

export default throwOutThief
