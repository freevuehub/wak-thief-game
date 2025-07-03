import { ThiefAction } from './types'

export const INITIAL_CASH = 5000
export const RECRUITMENT_COST = 500
export const SECTOR_COUNT = 16
export const DAILY_COST_PER_THIEF = 100
export const INITIAL_LOYALTY = 50
export const INITIAL_HEIST_SUCCESS_RATE = 50
export const INITIAL_CONDITION = 100

export const ACTION_DETAILS: { [key in ThiefAction]: { name: string; description: string } } = {
  [ThiefAction.Rest]: {
    name: '휴식',
    description: '조직원의 컨디션을 회복합니다. 하루를 소모합니다.',
  },
  [ThiefAction.Steal]: {
    name: '도둑질',
    description: '지도에서 구역을 선택하여 돈을 훔칩니다. 발각될 위험이 있습니다.',
  },
  [ThiefAction.Scout]: {
    name: '정찰',
    description: '특정 구역의 경찰 동향과 예상 수익을 파악합니다.',
  },
  [ThiefAction.Execute]: {
    name: '처형',
    description: '조직원을 처형합니다. 다른 조직원의 충성심이 오르지만, 성공률은 하락합니다.',
  },
}

export const ACTION_RESPONSE_DIALOGUES: {
  [key in ThiefAction]: { responseDialogue: string; closingNarration: string }
} = {
  [ThiefAction.Rest]: {
    responseDialogue: '알겠습니다, 보스. 좀 쉬어야겠습니다.',
    closingNarration: '그는 꾸벅 인사를 하고는, 지친 기색으로 방을 나갔다.',
  },
  [ThiefAction.Steal]: {
    responseDialogue: '맡겨만 주십시오. 실망시키지 않겠습니다.',
    closingNarration: '그의 눈이 탐욕으로 번뜩였다. 그는 어둠 속으로 조용히 사라졌다.',
  },
  [ThiefAction.Scout]: {
    responseDialogue: '정보가 힘이죠. 바로 다녀오겠습니다.',
    closingNarration: '그는 그림자처럼 소리 없이 사무실을 빠져나갔다.',
  },
  [ThiefAction.Execute]: {
    responseDialogue: '...보스의 뜻이라면.',
    closingNarration: '그는 감정을 드러내지 않은 채, 무겁게 고개를 끄덕였다.',
  },
}

export enum PROMPT_KEY {
  CREATE_THIEF = 'CREATE_PROFILE',
}
