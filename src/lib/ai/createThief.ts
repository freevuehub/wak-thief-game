import { GenerateContentResponse } from '@google/genai'
import { ai } from '.'
import type { Thief, Profile } from '@/types'
import { GEMINI_MODELS } from '@/constants'

type ThiefResponse = Pick<
  Thief,
  'name' | 'personality' | 'background' | 'character' | 'cost' | 'loyalty' | 'fatigue'
>

const createThief = async (prompt: string): Promise<ThiefResponse> => {
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: GEMINI_MODELS.FLASH,
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  })

  let jsonStr = response.text?.trim() || ''

  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s
  const match = jsonStr.match(fenceRegex)
  if (match && match[2]) jsonStr = match[2].trim()

  try {
    return JSON.parse(jsonStr) as ThiefResponse
  } catch (error) {
    console.error('Failed to parse JSON from Gemini:', error)
    return {
      name: 'John Doe',
      personality: 'Mysterious',
      background: 'Ex-spy',
      character:
        '보스에게 절대적인 충성을 바치는 조직원. 과거의 정체를 철저히 숨기며, 명령에 무조건 복종하는 신뢰할 수 있는 부하.',
      cost: 100,
      loyalty: 50,
      fatigue: 0,
    }
  }
}

export default createThief
