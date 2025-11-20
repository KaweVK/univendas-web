import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Login } from './pages/Login/index.jsx'
import { CadastroProduto } from './pages/CadastroProduto/index.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-produto" element={<CadastroProduto />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
