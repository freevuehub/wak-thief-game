import React, { useState } from 'react'
import { Profile } from '@/types'
import { usePrompt, useStore } from '@/hooks'
import { Card } from '@/components'
import { syndicateAI } from '@/lib'
import { v4 as uuidv4 } from 'uuid'
import { pipe } from '@fxts/core'
import { replacePrompt } from '@/lib'
import { PROMPT_KEY, THIEF_STATUS, THIEF_TEAM } from '@/constants'

type Props = {
  onSubmit: () => void
}

const Create: React.FC<Props> = (props) => {
  const { prompt } = usePrompt()
  const { createThief, updateLoading } = useStore()
  const [data, setData] = useState<Profile>({
    name: '',
    personality: '',
    background: '',
  })

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget

    setData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async () => {
    updateLoading({ createThief: true })
    pipe(
      data,
      replacePrompt(prompt[PROMPT_KEY.CREATE_THIEF].ko),
      syndicateAI.createThief,
      async (data) => ({
        ...data,
        id: uuidv4(),
        status: THIEF_STATUS.IDLE,
        team: THIEF_TEAM.OUR,
        image: await pipe(
          {
            character: data.character,
            background: data.background,
          },
          replacePrompt(prompt[PROMPT_KEY.CREATE_PROFILE_IMAGE].ko),
          syndicateAI.createThiefImage
        ),
      }),
      (data) => {
        createThief(data)
        updateLoading({ createThief: false })
      }
    )

    props.onSubmit()

    // const profile = await generateThiefProfile(data.name, data.personality, data.background)
    // const portraitUrl = await generateThiefPortrait(
    //   profile.name,
    //   profile.personality,
    //   profile.background
    // )
  }

  return (
    <Card className="p-8 shadow-2xl w-full max-w-md">
      <h2 className="text-3xl text-center mb-2 font-medium">조직원 생성</h2>
      <div className="space-y-4">
        <p className="text-center text-gray-400 font-light">
          새로운 조직원의 정보를 입력하세요. <br />
          비워두면 무작위로 생성됩니다.
        </p>
        <input
          type="text"
          value={data.name}
          name="name"
          onChange={onInputChange}
          placeholder="이름 (예: '사일러스')"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white font-light"
        />
        <input
          type="text"
          value={data.personality}
          name="personality"
          onChange={onInputChange}
          placeholder="성격 태그 (예: '대담함')"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white font-light"
        />
        <textarea
          value={data.background}
          name="background"
          onChange={onInputChange}
          rows={7}
          placeholder="배경 태그 (예: '전직 회계사')"
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white font-light resize-none"
        />
        <button
          onClick={onSubmit}
          className="w-full mt-4 p-3 bg-red-600 hover:bg-red-500 rounded-md transition-colors font-medium"
        >
          생성
        </button>
      </div>
    </Card>
  )
}

export default Create
