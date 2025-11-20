import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Login } from './pages/Login/index.jsx'
import { CadastroProduto } from './pages/CadastroProduto/index.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/auth'>
          <Route path="login" element={<Login />} />
        </Route>
        
        <Route path='/'>
          <Route path="cadastro-produto" element={<CadastroProduto />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
