import Header from './components/Header'
import Footer from './components/Footer'
import { Thief, Dialog } from '@/components'

const App: React.FC = () => {
  return (
    <>
      <div className="relative min-h-screen bg-gray-900 text-gray-200">
        <Header cash={100} globalAlertLevel={100} thiefCount={100} averageLoyalty={100} />
        <Footer
          day={100}
          onEndDay={() => {}}
          isEndDayDisabled={false}
          onToggleMap={() => {}}
          onToggleNews={() => {}}
        />
      </div>
      <Dialog>
        <Thief.Create isFirstThief={true} />
      </Dialog>
    </>
  )
}

export default App
