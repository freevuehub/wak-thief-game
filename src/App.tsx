import { useState, useEffect } from 'react'
import { Thief, Dialog, StatCard, Side, Map, Footer, Spinner } from '@/components'
import { useStore, useAI } from '@/hooks'

const App: React.FC = () => {
  const { aiLoading } = useAI()
  const { thieves, thiefCreateLoading, selectedThief, setSelectedThief } = useStore()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    if (thieves.length === 0) setIsDialogOpen(true)
  }, [thieves])

  return (
    <>
      <div className="relative min-h-screen bg-gray-900 text-gray-200">
        <Side />
        <StatCard />
        <div className="pl-[300px] pb-[70px] h-screen">
          <Map />
        </div>
        <Footer />
      </div>
      {isDialogOpen && (
        <Dialog>
          <Thief.Create onSubmit={() => setIsDialogOpen(false)} />
        </Dialog>
      )}
      {selectedThief && (
        <Dialog
          onBackgroundClick={() => {
            if (!aiLoading) setSelectedThief(null)
          }}
        >
          <Thief.Report {...selectedThief} />
        </Dialog>
      )}
      {thiefCreateLoading && (
        <Dialog>
          <Spinner />
        </Dialog>
      )}
    </>
  )
}

export default App
