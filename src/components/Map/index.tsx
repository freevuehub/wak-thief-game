import React from 'react'
import { Sector } from '@/legacyType'
import { map, pipe, range, toArray } from '@fxts/core'

const getAlertColor = (level: number): string => {
  if (level > 80) return 'bg-red-800 border-red-500 hover:bg-red-700'
  if (level > 60) return 'bg-red-600 border-red-400 hover:bg-red-500'
  if (level > 40) return 'bg-yellow-700 border-yellow-500 hover:bg-yellow-600'
  if (level > 20) return 'bg-yellow-500 border-yellow-300 hover:bg-yellow-400'
  return 'bg-green-700 border-green-500 hover:bg-green-600'
}

const Map: React.FC = () => {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ perspective: '500px' }}
    >
      <div className="grid grid-cols-4 gap-1 rotate-y-90">
        {pipe(
          16,
          range,
          map((sector) => {
            return (
              <button
                key={sector}
                className={`p-2 size-32 rounded-md border-2 transition-all flex flex-col justify-between text-left`}
              >
                <div>
                  <div className="font-bold text-sm">{sector}</div>
                  <div className="text-right">
                    <div className="text-xs">경계도</div>
                    <div className="font-bold text-lg">{100}%</div>
                  </div>
                </div>
                {/* {wasScoutedRecently && sector.scoutedInfo && !isSelectionMode && (
                    <div className="text-xs mt-1 p-1 bg-black/40 rounded">
                      <p className="font-bold text-yellow-300">정보:</p>
                      <p>{sector.scoutedInfo}</p>
                    </div>
                  )} */}
              </button>
            )
          }),
          toArray
        )}
      </div>
    </div>
  )
}

export default Map
