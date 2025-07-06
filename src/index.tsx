import ReactDOM from 'react-dom/client'
import App from './App'
import { PromptProvider, AIProvider, StoreProvider } from './provider'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Could not find root element to mount to')
}

const root = ReactDOM.createRoot(rootElement)

root.render(
  <PromptProvider>
    <AIProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </AIProvider>
  </PromptProvider>
)
