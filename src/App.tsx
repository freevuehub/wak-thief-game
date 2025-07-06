import { useState, useEffect } from 'react'
import { Thief, Dialog, StatCard, Side, Map, Footer, Spinner } from '@/components'
import { useStore, useAI } from '@/hooks'
import { THIEF_SELECTED_TYPE } from '@/constants'

const App: React.FC = () => {
  const { aiLoading } = useAI()
  const { thieves, storeLoading } = useStore()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    if (thieves.length === 0) setIsDialogOpen(true)
  }, [thieves])

  return (
    <>
      <div className="relative min-h-screen bg-gray-900 text-gray-200">
        <Side onCreateThief={() => setIsDialogOpen(true)} />
        <StatCard />
        {/* <div className="pl-[300px] pb-[70px] h-screen">
          <Map />
        </div> */}
        <Footer />
      </div>
      {isDialogOpen && (
        <Dialog
          onBackgroundClick={() => {
            thieves.length && setIsDialogOpen(false)
          }}
        >
          <Thief.Create onSubmit={() => setIsDialogOpen(false)} />
        </Dialog>
      )}
      {storeLoading.createNews && (
        <Dialog>
          <div className="h-screen flex items-center justify-center">
            <Spinner />
          </div>
        </Dialog>
      )}
    </>
  )
}

export default App
