import { useState, useEffect } from 'react'
import Footer from './components/Footer'
import { Thief, Dialog, StatCard, Side } from '@/components'
import { useStore } from '@/hooks'

const App: React.FC = () => {
  const { thieves } = useStore()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  useEffect(() => {
    // if (thieves.length === 0) setIsDialogOpen(true)
  }, [thieves])

  return (
    <>
      <div className="relative min-h-screen bg-gray-900 text-gray-200">
        <Side />
        <StatCard />
        <Footer
          day={100}
          onEndDay={() => {}}
          isEndDayDisabled={false}
          onToggleMap={() => {}}
          onToggleNews={() => {}}
        />
      </div>
      {isDialogOpen && (
        <Dialog>
          <Thief.Create onSubmit={() => setIsDialogOpen(false)} />
        </Dialog>
      )}
    </>
  )
}

export default App
