import { useState, useEffect } from 'react'
import { Thief, Dialog, StatCard, Side, Map, Footer, Spinner } from '@/components'
import { useStore } from '@/hooks'

const App: React.FC = () => {
  const { thieves, storeLoading, stat } = useStore()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [createLoading, setCreateLoading] = useState(false)

  useEffect(() => {
    if (thieves.length === 0 && !storeLoading.createThief) setIsDialogOpen(true)
  }, [thieves, storeLoading.createThief])
  useEffect(() => {
    setCreateLoading(false)
  }, [stat.day])

  return (
    <>
      <div className="relative min-h-screen bg-gray-900 text-gray-200">
        <Side createLoading={createLoading} onCreateThief={() => setIsDialogOpen(true)} />
        <StatCard />
        <div className="pl-[300px] pb-[70px] h-screen">
          <Map />
        </div>
        <Footer />
      </div>
      {isDialogOpen && (
        <Dialog
          onBackgroundClick={() => {
            thieves.length && setIsDialogOpen(false)
          }}
        >
          <Thief.Create
            onSubmit={() => {
              setCreateLoading(true)
              setIsDialogOpen(false)
            }}
          />
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
