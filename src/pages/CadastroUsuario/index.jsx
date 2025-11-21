import { Banner } from '../../componentes/Banner/index.jsx'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { FormularioCadastroUsuario } from '../../componentes/FormularioCadastroUsuario/index.jsx'

export const CadastroUsuario = () => {

  return (
    <>
      <div>
        <Banner />
            <FormularioCadastroUsuario aoCadastrarUsuario={produto => console.log(produto)} href={"/auth/login"}/>
        <BarraRodape />
      </div>
    </>
  )
}