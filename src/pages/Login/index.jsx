import { Banner } from "../../componentes/Banner/index.jsx"
import { BarraRodape } from "../../componentes/BarraRodape/index.jsx"
import { FormularioLogin } from "../../componentes/FormularioLogin/index.jsx"
import api from "../../services/api" // Importamos a api configurada
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const navigate = useNavigate();

    const realizarLogin = async (dados) => {
        try {
            // Mapeando os dados para o formato que o Java espera (AuthenticationDataDto)
            const payload = {
                email: dados.email,
                password: dados.senha 
            };

            const resposta = await api.post('/login', payload);

            // O Backend retorna { token: "..." }
            const token = resposta.data.token;

            // Salvamos no armazenamento do navegador
            localStorage.setItem('token', token);

            alert('Login realizado com sucesso!');
            navigate('/'); // Redireciona para a home (Produtos)

        } catch (erro) {
            console.error("Erro ao logar:", erro);
            alert('Email ou senha incorretos!');
        }
    }

    return (
    <>
        <Banner />
        <div>
            {/* Passamos a função realizarLogin para o componente */}
            <FormularioLogin aoFazerLogin={realizarLogin} href={"/auth/cadastro-usuario"}/>
        </div>
        <BarraRodape />
    </>
    )
}