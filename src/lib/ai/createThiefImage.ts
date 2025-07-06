import { ai } from '.'

const createThiefImage = async (prompt: string): Promise<string> => {
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
