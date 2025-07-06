export * from './thief'

export type GameStat = {
  day: number
  cash: number
  globalAlertLevel: number
}

export type NewsParams = {
  events: string
  oldEvents: string
}

export type NewsResponse = {
  main: Array<string>
  etc: Array<string>
}
