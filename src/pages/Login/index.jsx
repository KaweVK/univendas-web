import { Banner } from "../../componentes/Banner/index.jsx"
import { BarraRodape } from "../../componentes/BarraRodape/index.jsx"
import { FormularioLogin } from "../../componentes/FormularioLogin/index.jsx"
import api from "../../services/api" 
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate();

    const realizarLogin = async (dados) => {
        try {
            const payload = {
                email: dados.email,
                password: dados.senha 
            };

            const resposta = await api.post('/login', payload);

            const token = resposta.data.token;

            localStorage.setItem('token', token);

            alert('Login realizado com sucesso!');
            navigate('/produtos'); 

        } catch (erro) {
            console.error("Erro ao logar:", erro);
            alert('Email ou senha incorretos!');
        }
    }

    return (
    <>
        <Banner />
        <div>
            <FormularioLogin aoFazerLogin={realizarLogin} href={"/auth/cadastro-usuario"}/>
        </div>
        <BarraRodape />
    </>
    )
}