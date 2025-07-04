export type Profile = {
  name: string
  personality: string
  background: string
}

export type Thief = Profile & {
  dialogue: string[]
}
