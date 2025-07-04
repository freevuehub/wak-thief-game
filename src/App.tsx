import { useState } from 'react'
import Footer from './components/Footer'
import { Thief, Dialog, StatCard, Side } from '@/components'

const App: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

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
