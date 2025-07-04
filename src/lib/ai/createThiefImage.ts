import { ai } from '.'
import type { Profile } from '@/types'

const createThiefImage =
  (prompt: string) =>
  async (params: Profile): Promise<string> => {
    prompt = prompt.replace(/\$\{name\}/g, params.name)
    prompt = prompt.replace(/\$\{personality\}/g, params.personality || '')
    prompt = prompt.replace(/\$\{background\}/g, params.background || '')

    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: prompt,
      config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    })

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes

    return `data:image/jpeg;base64,${base64ImageBytes}`
  }

export default createThiefImage
