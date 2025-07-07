import { useEffect, useState } from 'react'
import { map, pipe, toArray, zipWithIndex } from '@fxts/core'
import { syndicateAI } from '@/lib'
import { usePrompt, useStore } from '@/hooks'
import { PROMPT_KEY } from '@/constants'
import type { Area } from '@/types'
import { Dialog, Spinner, Card } from '@/components'
import Actions from './Actions'

const Map: React.FC = () => {
  const { areas } = useStore()
  const [selectedArea, setSelectedArea] = useState<Area | null>(null)

  return (
    <>
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ perspective: '500px' }}
      >
        {areas.length === 0 ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-4 gap-1 rotate-y-90">
            {pipe(
              areas,
              zipWithIndex,
              map(([index, area]) => (
                <button
                  key={index}
                  className={`p-2 size-32 rounded-md border-2 transition-all flex flex-col justify-between text-left`}
                  type="button"
                  onClick={() => setSelectedArea(area)}
                >
                  <div>
                    <div className="font-bold text-sm">{area.name}</div>
                  </div>
                </button>
              )),
              toArray
            )}
          </div>
        )}
      </div>
      {selectedArea && (
        <Dialog onBackgroundClick={() => setSelectedArea(null)}>
          <Actions area={selectedArea} onClose={() => setSelectedArea(null)} />
        </Dialog>
      )}
    </>
  )
}

export default Map
