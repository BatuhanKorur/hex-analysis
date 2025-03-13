import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { SocketContext } from './context/SocketContext'
import { Toaster } from './components/Toaster'

createRoot(document.getElementById('root')!)
  .render(
    <StrictMode>
      <SocketContext>
        <div className="p-6 max-w-7xl mx-auto">
          <App />
        </div>
        <Toaster />
      </SocketContext>
    </StrictMode>,
  )
