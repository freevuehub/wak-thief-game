import React from 'react'
import { Calendar, Map, News } from '@/icons'

type Props = {
  day: number
  onEndDay: () => void
  onToggleMap: () => void
  onToggleNews: () => void
  isEndDayDisabled: boolean
}

const Footer: React.FC<Props> = (props) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm p-3 z-20 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={props.onToggleNews}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
          >
            <News className="w-5 h-5" />
            <span>뉴스 기록</span>
          </button>
          <button
            onClick={props.onToggleMap}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
          >
            <Map className="w-5 h-5" />
            <span>도시 지도</span>
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-gray-400" />
            <span className="text-xl font-bold">{props.day}일차</span>
          </div>
          <button
            onClick={props.onEndDay}
            disabled={props.isEndDayDisabled}
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-md hover:bg-red-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            하루 종료
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
