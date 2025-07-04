import React, { useState } from 'react'
import { generateThiefProfile, generateThiefPortrait } from '@/services/geminiService'
import { Thief } from '@/legacyType'
import { RECRUITMENT_COST } from '@/constants'
import Form from './Form'

type Props = {
  isFirstThief: boolean
}

const LoadingSpinner: React.FC = () => (
  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
)

const CreationWrapper: React.FC<{
  children: React.ReactNode
  isFirstThief: boolean
  onClose: () => void
}> = ({ children, isFirstThief, onClose }) => {
  if (isFirstThief) {
    return (
      <div className="fixed inset-0 min-h-screen flex items-center justify-center bg-gray-900 z-50">
        <div className="bg-gray-800 border-2 border-red-500 p-8 rounded-lg shadow-2xl w-full max-w-md text-white">
          <h2 className="text-3xl font-display text-center mb-2">첫 번째 조직원 생성</h2>
          <p className="text-center text-gray-400 mb-6">모든 조직은 시작이 필요합니다.</p>
          {children}
        </div>
      </div>
    )
  }
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-40 backdrop-blur-sm">
      <div className="bg-gray-800 border-2 border-red-500 p-8 rounded-lg shadow-2xl w-full max-w-md text-white relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-white"
        >
          &times;
        </button>
        <h2 className="text-3xl font-display text-center mb-2">
          새 조직원 영입{' '}
          <span className="text-lg text-yellow-400">
            (비용: ${RECRUITMENT_COST.toLocaleString()})
          </span>
        </h2>
        {children}
      </div>
    </div>
  )
}

const ThiefCreation: React.FC<Props> = ({ isFirstThief }) => {
  const onClose = () => {
    console.log('close')
  }

  return <Form />
}

export default ThiefCreation
