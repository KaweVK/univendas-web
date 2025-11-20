import Banner from "../../componentes/Banner"
import BarraRodape from "../../componentes/BarraRodape"
import{ FormularioLogin }from "../../componentes/FormularioLogin/index.jsx"

export const Login = () => {
    return (
    <>
        <Banner />
        <div>
            <FormularioLogin aoCadastrarProduto={produto => console.log(produto)}/>
        </div>
        <BarraRodape />
    </>
    )
}