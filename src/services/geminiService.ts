import { GoogleGenAI, GenerateContentResponse } from '@google/genai'
import { Thief, ThiefAction } from '../legacyType'
import { ACTION_DETAILS, ACTION_RESPONSE_DIALOGUES } from '../constants'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('API_KEY environment variable not set')
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

interface ThiefProfile {
  name: string
  personality: string
  background: string
  dialogue: string[]
}

export const generateThiefProfile = async (
  name: string,
  personality: string,
  background: string
): Promise<ThiefProfile> => {
  const prompt = `
    당신은 어둡고 누아르 분위기의 범죄 조직 경영 게임의 게임 마스터입니다.
    새로운 도둑의 프로필을 생성해야 합니다.
    아래 항목 중 비어있는 것이 있다면 적절한 값으로 채워주세요:
    - 이름: "${name}"
    - 성격 (하나의 형용사 태그): "${personality}"
    - 배경 (짧은 문구 태그): "${background}"

    완성된 프로필 바탕으로, 이 도둑이 조직에 막 합류하여 보스에게 할 자기소개 대사를 생성해주세요.
    이 대사는 **최소 4~5문장 이상으로 길고 상세하게** 이 캐릭터가 살아있는 인물처럼 느껴지게 해야 합니다.
    성격, 배경, 포부, 혹은 약간의 불안감 등이 드러나야 합니다.
    대사는 짧은 문장 단위로 나누어 배열 형태로 만들어주세요.

    다음 구조를 가진 유효한 JSON 객체만 반환해주세요:
    {
      "name": "...",
      "personality": "...",
      "background": "...",
      "dialogue": [
        "첫 번째 문장입니다.",
        "여기는 두 번째 문장이고요.",
        "이런 식으로...",
        "마지막 문장입니다."
      ]
    }
  `

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-04-17',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
    },
  })

  let jsonStr = response.text.trim()
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s
  const match = jsonStr.match(fenceRegex)
  if (match && match[2]) {
    jsonStr = match[2].trim()
  }

  try {
    return JSON.parse(jsonStr) as ThiefProfile
  } catch (e) {
    console.error('Failed to parse JSON from Gemini:', e)
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

export const generateThiefPortrait = async (
  name: string,
  personality: string,
  background: string
): Promise<string> => {
  const visionPrompt = `
    이 이미지의 아트 스타일, 색감, 조명, 구도를 분석해서 
    새로운 캐릭터 포트레이트를 그릴 때 참고할 수 있는 
    상세한 스타일 가이드를 만들어주세요.
  `

  // resource/image.png 파일을 Base64로 읽기
  // public 폴더의 이미지를 fetch로 가져와서 Base64로 변환
  const imageResponse = await fetch('/resource/image2.png')
  const imageBlob = await imageResponse.blob()

  const base64Image = await new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      resolve(base64.split(',')[1]) // data:image/png;base64, 부분 제거
    }
    reader.readAsDataURL(imageBlob)
  })

  // Gemini Pro Vision으로 스타일 분석
  const visionResponse = await ai.models.generateContent({
    model: 'gemini-2.0-flash-exp', // 또는 "gemini-1.5-flash"
    contents: [
      {
        role: 'user',
        parts: [
          { text: visionPrompt },
          {
            inlineData: {
              mimeType: 'image/png',
              data: base64Image,
            },
          },
        ],
      },
    ],
  })

  // 분석된 스타일 정보를 바탕으로 Imagen 프롬프트 생성
  const styleGuide = visionResponse.text || ''

  const prompt = `
    You are a character illustrator. Create a high-quality digital painting portrait of a character for a game. The visual style of the portrait should be **entirely dictated by the character's profile**.

    **Character Profile:**
    - **Name:** ${name}
    - **Personality:** '${personality}'
    - **Background:** '${background}'

    ---

    **CRITICAL INSTRUCTIONS - FOLLOW THESE EXACTLY:**

    1.  **PERSONALITY DRIVES EXPRESSION AND MOOD:** The character's facial expression and the overall mood of the image are the top priority. They **MUST** be a direct and obvious representation of the 'Personality' tag.
        -   **If the personality is positive (e.g., '해맑음' (Cheerful), '긍정적' (Positive), '유쾌함' (Jovial), '웃음' (Laughter)), the character MUST be visibly smiling or laughing.** The entire portrait should feel bright and optimistic. A neutral or serious expression is an absolute failure in this case.
        -   If the personality is negative (e.g., '염세적' (Pessimistic), '우울한' (Gloomy)), the expression and lighting must reflect this.

    2.  **BACKGROUND DRIVES APPEARANCE:** The character's clothing and environment **MUST** reflect their 'Background' tag.
        -   For example, an '어부' (Fisherman) should look like a fisherman, with appropriate clothing (like a beanie or weathered jacket, NOT a suit) and perhaps a hint of the sea in the background.
        -   An '전직 군인' (Ex-soldier) might have a disciplined posture or a specific haircut.

    3.  **DIVERSITY IS REQUIRED:** Create unique individuals. Vary gender, age, and ethnicity. Do not rely on common stereotypes or always generate middle-aged men.

    4.  **TECHNICAL DETAILS:**
        -   **Style:** Digital painting, character concept art. The style should be clean and expressive.
        -   **Framing:** Head-and-shoulders portrait.
        -   **Visibility:** The face and expression must be clear and fully visible. NO masks, NO heavy obscuring shadows.
        -   **Quality:** Clean, high-quality art. No text or watermarks.
  `
  const response = await ai.models.generateImages({
    model: 'imagen-3.0-generate-002',
    prompt: prompt,
    config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
  })

  const base64ImageBytes: string = response.generatedImages[0].image.imageBytes
  return `data:image/jpeg;base64,${base64ImageBytes}`
}

interface DailyBriefing {
  narration: string
  dialogue: string[]
}

export const generateDailyDialogue = async (
  thief: Pick<Thief, 'name' | 'personality' | 'background' | 'condition' | 'loyalty'>,
  eventSummary: string
): Promise<DailyBriefing> => {
  const prompt = `
    당신은 누아르 범죄 게임의 게임 마스터입니다. 조직원 중 한 명이 하루를 마치고 보스에게 아침 보고를 하러 사무실에 들어왔습니다.
    
    조직원 정보:
    - 이름: ${thief.name}
    - 성격: ${thief.personality}
    - 배경: ${thief.background}
    - 현재 컨디션: ${thief.condition}/100
    - 현재 충성심: ${thief.loyalty}/100

    어제 있었던 주요 활동: ${eventSummary}

    이 상황에 대한 짧은 배경 나레이션과, 조직원의 보고 대사를 생성해주세요.
    - 나레이션은 조직원이 사무실에 들어서는 모습을 1-2 문장으로 간결하게 묘사합니다. (예: "밖에는 비가 쏟아지고 있었다. ${thief.name}이/가 젖은 코트를 벗으며 사무실로 들어섰다. 그의 얼굴에는 피곤한 기색이 역력했다.")
    - 대사는 조직원의 성격, 배경, 컨디션, 충성심을 **아주 강하게** 반영해야 합니다. 말투가 딱딱하지 않고 개성이 드러나도록 작성해주세요. (예: 냉소적인 성격이라면 비꼬는 투, 충성스럽다면 열정적인 투)
    - 컨디션이 50 미만이면 피곤함을, 충성심이 50 미만이면 불만을 반드시 대사에 포함시켜야 합니다.
    - 대사는 짧은 문장 단위로 나누어 배열 형태로 만들어주세요. (최소 3문장 이상)
    
    다음 구조를 가진 유효한 JSON 객체만 반환해주세요. 다른 설명은 붙이지 마세요.
    {
      "narration": "...",
      "dialogue": ["...", "...", "..."]
    }
  `

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-04-17',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
    },
  })

  try {
    let jsonStr = response.text.trim()
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s
    const match = jsonStr.match(fenceRegex)
    if (match && match[2]) {
      jsonStr = match[2].trim()
    }
    return JSON.parse(jsonStr) as DailyBriefing
  } catch (e) {
    console.error('Failed to parse dialogue JSON from Gemini:', e)
    return {
      narration: `${thief.name}이/가 사무실 문을 열고 들어왔다.`,
      dialogue: ['보고할 게 있습니다, 보스.', '어제는... 별일 없었습니다.'],
    }
  }
}

export const generateNewsReport = async (events: string[]): Promise<string> => {
  if (events.length === 0) {
    return '어젯밤 도시는 조용했습니다. 너무나도 조용했죠.'
  }

  const prompt = `
    당신은 범죄가 만연한 도시의 'KNIGHTLY NEWS' 소속 뉴스 앵커입니다.
    어젯밤 발생한 아래 사건들을 요약하는 짧고 드라마틱한 뉴스 방송을 작성해주세요.
    간결하게, 1940년대 누아르 스타일을 유지해야 합니다. 자극적인 묘사나 '지직' 같은 효과음은 빼주세요.
    사건들:
    - ${events.join('\n- ')}
  `

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-04-17',
    contents: prompt,
    config: { thinkingConfig: { thinkingBudget: 0 } },
  })

  return response.text
}

interface ActionResponse {
  responseDialogue: string
  closingNarration: string
}

export const generateActionResponse = async (
  thief: Pick<Thief, 'name' | 'personality' | 'loyalty'>,
  action: ThiefAction
): Promise<ActionResponse> => {
  const prompt = `
    당신은 누아르 범죄 게임의 게임 마스터입니다. 보스가 조직원에게 임무를 지시했습니다.
    
    조직원 정보:
    - 이름: ${thief.name}
    - 성격: ${thief.personality}
    - 충성심: ${thief.loyalty}/100

    지시된 임무: ${ACTION_DETAILS[action].name}

    이 상황에서 조직원이 할 짧은 대답(1문장)과, 그 후의 반응을 묘사하는 나레이션(1-2문장)을 생성해주세요.
    - 대답과 나레이션 모두 조직원의 성격과 충성심을 **아주 강하게** 반영해야 합니다.
    - 충성심이 높으면 기뻐하거나 열정적으로, 낮으면 마지못해 하거나 불만스럽게 반응해야 합니다.

    다음 구조를 가진 유효한 JSON 객체만 반환해주세요:
    {
      "responseDialogue": "...",
      "closingNarration": "..."
    }
  `
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    })
    let jsonStr = response.text.trim()
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s
    const match = jsonStr.match(fenceRegex)
    if (match && match[2]) {
      jsonStr = match[2].trim()
    }
    return JSON.parse(jsonStr) as ActionResponse
  } catch (e) {
    console.error('Failed to generate action response:', e)
    return ACTION_RESPONSE_DIALOGUES[action]
  }
}
