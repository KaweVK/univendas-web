import { Banner } from "../../componentes/Banner/index.jsx"
import { BarraRodape } from "../../componentes/BarraRodape/index.jsx"
import { FormularioLogin } from "../../componentes/FormularioLogin/index.jsx"

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