import { ai } from '.'
import type { ImageParams } from '@/types'

const createThiefImage =
  (prompt: string) =>
  async (params: ImageParams): Promise<string> => {
    prompt = prompt.replace(/\$\{character\}/g, params.character)
    prompt = prompt.replace(/\$\{background\}/g, params.background)

    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: prompt,
      config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    })

    if (!response.generatedImages) return ''

    return response.generatedImages[0].image
      ? `data:image/jpeg;base64,${response.generatedImages[0].image.imageBytes}`
      : ''
  }

export default createThiefImage
