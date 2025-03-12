import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'

createRoot(document.getElementById('root')!)
  .render(
    <StrictMode>
      <div>
        <p>Hello World</p>
      </div>
    </StrictMode>,
  )
