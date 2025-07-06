import React from 'react'
import { Calendar, News } from '@/icons'
import { useStore } from '@/hooks'

const Footer: React.FC = () => {
  const { stat } = useStore()

  const onDayEnd = () => {
    // updateDays()
  }

  return (
    <footer className="fixed flex items-center justify-between px-4 bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm z-20 border-t border-gray-700 h-20">
      <button
        onClick={() => {}}
        className="flex items-center space-x-2 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
      >
        <News className="w-5 h-5" />
        <span>뉴스 기록</span>
      </button>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-gray-400" />
          <span className="text-xl font-bold">{stat.day}일차</span>
        </div>
        <button
          onClick={onDayEnd}
          className="px-6 py-2 bg-red-600 text-white font-bold rounded-md hover:bg-red-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-105"
        >
          하루 종료
        </button>
      </div>
    </footer>
  )
}

export default Footer
