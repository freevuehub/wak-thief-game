export type MemberProfile = {
  name: string
  personality: string
  character: string
  background: string
  cost: number
  loyalty: number
}
export type MemberState = MemberProfile & {
  fatigue: number
  character: string
  image: string
}
export type Member = MemberState & {
  id: string
  status: THIEF_STATUS
  team: THIEF_TEAM
  createdAt: number
}

export type ImageParams = {
  character: string
  background: string
}

export type Profile = {
  name: string
  personality: string
  background: string
}

export type Thief = Profile & {
  id: string
  image: string
  character: string
  loyalty: number
  cost: number
  fatigue: number
}

export type ThrowOutThiefParams = {
  name: string
  personality: string
  character: string
  background: string
  cost: number
  loyalty: number
  event?: string
}

export type RestThiefParams = {
  name: string
  personality: string
  character: string
  background: string
  cost: number
  loyalty: number
  event?: string
}

type ThiefResponse = {
  dialogue: Array<string>
  feelings: string
}

export type ThrowOutThiefResponse = ThiefResponse
export type RestThiefResponse = ThiefResponse
export type RecreateThiefResponse = ThiefResponse
