import { createContext, useEffect, useMemo, useState } from 'react'
import { Thief, GameStat, Area } from '@/types'
import { DEFAULT_GAME_STAT, PROMPT_KEY, THIEF_STATUS, THIEF_TEAM } from '@/constants'
import { filter, find, pipe, toArray, values } from '@fxts/core'
import { usePrompt } from '@/hooks'
import { syndicateAI, replacePrompt } from '@/lib'
import { Spinner } from '@/components'

type Props = {
  children: React.ReactNode
}
type GroupLog = {
  day: number
  message: string
  type: PROMPT_KEY
  thiefId?: string
}
type State = {
  stat: GameStat
  thieves: Map<
    string,
    Thief & {
      status: THIEF_STATUS
      team: THIEF_TEAM
      day: number
    }
  >
  work: Map<string, Thief>
  log: Array<GroupLog>
}
type Context = {
  state: State
  storeLoading: Record<string, boolean>
  areas: Array<Area>
  stat: GameStat
  thieves: Array<Thief>
  createdThief?: Thief & {
    status: THIEF_STATUS
    team: THIEF_TEAM
    day: number
  }
  createThief: (
    thief: Thief & {
      status: THIEF_STATUS
      team: THIEF_TEAM
    }
  ) => void
  updateLoading: (value: Record<string, boolean>) => void
  createGroupLog: (log: GroupLog) => void
  updateDays: () => void
  updateThief: (
    thief: Thief & {
      status: THIEF_STATUS
      team: THIEF_TEAM
    }
  ) => void
  updateWork: (
    thief: Thief & {
      status: THIEF_STATUS
      team: THIEF_TEAM
    }
  ) => void
}

export const StoreContext = createContext<Context>({
  state: {
    stat: DEFAULT_GAME_STAT,
    thieves: new Map(),
    work: new Map(),
    log: [],
  },
  storeLoading: { createThief: false, createNews: false },
  areas: [],
  stat: DEFAULT_GAME_STAT,
  thieves: [],
  createdThief: undefined,
  createThief: () => {},
  updateLoading: () => {},
  createGroupLog: () => {},
  updateDays: () => {},
  updateThief: () => {},
  updateWork: () => {},
})

const StoreProvider: React.FC<Props> = (props) => {
  const { prompt } = usePrompt()
  const [storeLoading, setStoreLoading] = useState<Record<string, boolean>>({
    createThief: false,
    createNews: false,
    createMap: false,
  })
  const [areas, setAreas] = useState<Array<Area>>([
    {
      name: '중앙 상업 지구',
      police: 25,
      function:
        '상업, 금융, 오피스 밀집 지역. 유동인구가 많아 절도 및 사기 범죄 발생 빈번하며, 강력한 치안 유지 필요.',
    },
    {
      name: '부유층 주거 지구',
      police: 15,
      function:
        '고급 주택 단지. 주거 침입 및 고가품 절도 예방에 중점을 두며, 순찰을 통한 위압감 조성.',
    },
    {
      name: '일반 주거 지구 A',
      police: 15,
      function: '중산층 주거 지역. 일상생활 관련 범죄(가정 폭력, 소규모 절도) 및 치안 유지에 중점.',
    },
    {
      name: '일반 주거 지구 B',
      police: 15,
      function: '중산층 주거 지역. 어린이 및 청소년 관련 범죄 예방, 학교 주변 순찰 강화.',
    },
    {
      name: '저소득층 주거 지구',
      police: 30,
      function:
        '다세대 주택 및 재개발 예정 지역. 강력 범죄 및 사회 문제(마약, 주취 폭력) 관련 범죄 집중 관리.',
    },
    {
      name: '유흥가',
      police: 30,
      function:
        '밤문화 및 유흥 시설 밀집 지역. 폭력, 마약, 풍속 관련 범죄 집중 단속 및 시민 불만도 관리.',
    },
    {
      name: '산업 단지',
      police: 15,
      function:
        '대규모 공장 및 물류 창고 지역. 산업 스파이, 대규모 절도, 환경 범죄 예방 및 노동 분쟁 개입.',
    },
    {
      name: '교통 허브',
      police: 20,
      function:
        '기차역, 버스 터미널 등 대중교통 이용객 밀집. 소매치기, 실종, 테러 위협 대비 및 혼잡 관리.',
    },
    {
      name: '공원 및 레저 지구',
      police: 10,
      function:
        '대형 공원 및 스포츠 시설. 소규모 절도, 청소년 비행, 음주 소란 관리 및 공공 질서 유지.',
    },
    {
      name: '문화/교육 지구',
      police: 15,
      function:
        '대학교, 박물관, 도서관 등 교육 및 문화 시설 밀집. 재물 손괴, 학내 문제, 소규모 절도 관리.',
    },
    {
      name: '항만/물류 단지',
      police: 20,
      function: '국제 무역항 및 대규모 물류창고. 밀수, 조직 범죄, 대규모 절도 예방 및 보안 강화.',
    },
    {
      name: '외곽 전원 주택 지구',
      police: 10,
      function: '도시 외곽의 한적한 주거 지역. 외부 침입 및 절도 예방, 외곽 순찰 강화.',
    },
    {
      name: '정부/행정 지구',
      police: 15,
      function: '시청, 경찰청, 법원 등 주요 공공 기관 밀집. 시위 관리 및 중요 시설 보안 유지.',
    },
    {
      name: '연구 단지',
      police: 10,
      function: '첨단 기술 연구소 및 R&D 센터. 지적 재산권 침해 및 기업 보안 관련 예방.',
    },
    {
      name: '병원/의료 단지',
      police: 10,
      function:
        '대형 병원 및 의료 시설. 응급 상황 지원, 내부 절도, 소란 행위 관리 및 특수 환자 대응.',
    },
    {
      name: '신흥 개발 지구',
      police: 15,
      function:
        '새롭게 개발 중인 주거 및 상업 복합 지역. 건설 현장 안전, 초기 범죄 예방 및 치안 질서 확립.',
    },
  ])
  const [state, setState] = useState<State>({
    stat: DEFAULT_GAME_STAT,
    thieves: new Map([
      [
        'a',
        {
          id: 'a',
          name: '릴파',
          personality: '목청이 좋음, 극E, 극P',
          background: '어두운 게임을 좋아함.',
          character: '목청이 좋은 외톨이',
          loyalty: 100,
          cost: 100,
          image: '',
          fatigue: 0,
          status: THIEF_STATUS.IDLE,
          team: THIEF_TEAM.OUR,
          day: 0,
        },
      ],
    ]),
    work: new Map(),
    log: [],
  })

  useEffect(() => {
    if (prompt[PROMPT_KEY.CREATE_MAP] && areas.length === 0) {
      pipe('', syndicateAI.createMap(prompt[PROMPT_KEY.CREATE_MAP].ko), ({ area }) => {
        setAreas(area)
        setStoreLoading((prev) => ({ ...prev, createMap: false }))
      })
    }
  }, [prompt, areas])

  return (
    <StoreContext.Provider
      value={{
        storeLoading,
        state,
        areas,
        stat: useMemo(() => state.stat, [state.stat]),
        thieves: useMemo(() => {
          return pipe(
            [...state.thieves.values()],
            filter(({ team }) => team === THIEF_TEAM.OUR),
            toArray
          )
        }, [state.thieves]),
        createdThief: useMemo(() => {
          console.log([...state.thieves.values()])
          return pipe(
            [...state.thieves.values()],
            find(({ status }) => status === THIEF_STATUS.RECRUITING)
          )
        }, [state.thieves]),
        updateLoading: (value: Record<string, boolean>) => {
          setStoreLoading((prev) => ({ ...prev, ...value }))
        },
        updateThief: (thief) => {
          setState((prev) => {
            prev.thieves.set(thief.id, { ...prev.thieves.get(thief.id)!, ...thief })

            return { ...prev, thieves: new Map(prev.thieves) }
          })
        },
        updateDays: async () => {
          setStoreLoading((prev) => ({ ...prev, createNews: true }))
          await pipe(
            {
              events: '',
              oldEvents: '',
            },
            replacePrompt(prompt[PROMPT_KEY.CREATE_NEWS].ko),
            syndicateAI.createNews,
            (data) => {
              setState((prev) => ({
                ...prev,
                stat: { ...prev.stat, day: prev.stat.day + 1 },
              }))
              setStoreLoading((prev) => ({ ...prev, createNews: false }))
              console.log(data)
            }
          )
        },
        updateWork: (thief) => {
          console.log(thief)
        },
        createThief: (thief) => {
          setState((prev) => {
            prev.thieves.set(thief.id, { ...thief, day: prev.stat.day })

            return { ...prev, thieves: new Map(prev.thieves) }
          })
        },
        createGroupLog: (log) => {
          setState((prev) => ({
            ...prev,
            log: [...prev.log, log],
          }))
        },
      }}
    >
      {storeLoading.createMap ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        props.children
      )}
    </StoreContext.Provider>
  )
}

export default StoreProvider
