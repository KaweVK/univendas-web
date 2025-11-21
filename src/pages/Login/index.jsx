import Banner from "../../componentes/Banner"
import BarraRodape from "../../componentes/BarraRodape"
import{ FormularioLogin }from "../../componentes/FormularioLogin/index.jsx"

export const Login = () => {
    return (
    <>
        <Banner />
        <div>
            <FormularioLogin aoFazerLogin={produto => console.log(produto)} href={"/auth/cadastro-usuario"}/>
        </div>
        <BarraRodape />
    </>
    )
}