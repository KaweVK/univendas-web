import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CadastroProduto } from './pages/CadastroProduto/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CadastroProduto />
  </StrictMode>,
)
