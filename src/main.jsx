import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Login } from './pages/Login/index.jsx'
import { CadastroProduto } from './pages/CadastroProduto/index.jsx'
import { CadastroUsuario } from './pages/CadastroUsuario/index.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Produtos } from './pages/Produtos/index.jsx'
import { Produto } from './pages/Produto/index.jsx'
import { Usuarios } from './pages/Usuarios/index.jsx'
import { Usuario } from './pages/Usuario/index.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/auth'>
          <Route path="login" element={<Login />} />
          <Route path="cadastro-usuario" element={<CadastroUsuario />} />
        </Route>
        
        <Route path='/'>
          <Route path='cadastro-produto' element={<CadastroProduto />} />
          <Route path='' element={ <Produtos/> }/>
          <Route path='usuarios' element={ <Usuarios/> }/>
          <Route path='produto/:id' element={ <Produto/> }/>
          <Route path='usuario/:id' element={ <Usuario/> }/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
