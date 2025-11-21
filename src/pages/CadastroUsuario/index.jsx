import Banner from '../../componentes/Banner/'
import BarraRodape from '../../componentes/BarraRodape'
import { FormularioCadastroUsuario } from '../../componentes/FormularioCadastroUsuario'

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