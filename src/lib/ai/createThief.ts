import { GenerateContentResponse } from '@google/genai'
import { ai } from '.'

type Params = {
  name: string
  personality?: string
  background?: string
}
type ThiefProfile = {
  name: string
  personality: string
  background: string
  dialogue: string[]
}

const createThief =
  (prompt: string) =>
  async (params: Params): Promise<ThiefProfile> => {
    prompt = prompt.replace(/\$\{name\}/g, params.name)
    prompt = prompt.replace(/\$\{personality\}/g, params.personality || '')
    prompt = prompt.replace(/\$\{background\}/g, params.background || '')

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
      return JSON.parse(jsonStr) as ThiefProfile
    } catch (error) {
      console.error('Failed to parse JSON from Gemini:', error)
      return {
        name: 'John Doe',
        personality: 'Mysterious',
        background: 'Ex-spy',
        dialogue: [
          '보스, 일을 하러 왔습니다.',
          '시키는 건 뭐든지 하죠.',
          '과거는 묻지 말아 주십시오.',
        ],
      }
    }
  }

export default createThief
