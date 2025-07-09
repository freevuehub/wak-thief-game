import { useState, useEffect } from 'react'
import { Thief, Dialog, StatCard, Side, Map, Footer, Spinner } from '@/components'
import { usePrompt, useStore } from '@/hooks'

const App: React.FC = () => {
  const { ourMembers, storeLoading } = useStore()
  const { loading } = usePrompt()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [createLoading, setCreateLoading] = useState(false)

  useEffect(() => {
    if (ourMembers.length === 0 && !storeLoading.createThief) setIsDialogOpen(true)
  }, [ourMembers, storeLoading.createThief])
  useEffect(() => {
    setCreateLoading(loading)
  }, [loading])

  return (
    <>
      <div className="relative min-h-screen bg-gray-900 text-gray-200">
        <Side createLoading={createLoading} onCreate={() => setIsDialogOpen(true)} />
        <StatCard />
        {/* <div className="pl-[300px] pb-[70px] h-screen">
          <Map />
        </div> */}
        <Footer />
      </div>
      {isDialogOpen && (
        <Dialog
          onBackgroundClick={() => {
            ourMembers.length && setIsDialogOpen(false)
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
      {loading && (
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
