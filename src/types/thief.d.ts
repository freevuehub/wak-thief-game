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
  dialogue: Array<string>
  character: string
  loyalty: number
  cost: number
}
