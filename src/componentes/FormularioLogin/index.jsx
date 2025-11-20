import './FormularioLogin.css'
import CampoTexto from '../CampoTexto'
import Botao from '../Botao'
import { useState } from 'react'

export const FormularioLogin = (props) => {

    const [email, setEmail] = useState('') 
    const [senha, setSenha] = useState('') 

    const aoSalvar = (evento) => {
        evento.preventDefault()
        props.aoCadastrarProduto({
            email,
            senha
        })
        setEmail('')
        setSenha('')
    }

    return (
        <section className='formulario'>
            <form onSubmit={aoSalvar}>
                <h2>Login</h2>
                <CampoTexto 
                    obrigatorio={true} 
                    label='Email' 
                    placeholder='Digite o email do login' 
                    valor={email}
                    aoAlterado={valor => setEmail(valor)}/>
                <CampoTexto 
                    obrigatorio={true} 
                    label='Senha' 
                    placeholder='Digite a sua senha'
                    valor={senha}
                    aoAlterado={valor => setSenha(valor)}/>
                <Botao>
                    Login
                </Botao>
                <a href="">Cadastrar-se</a>
            </form>
        </section>
    )

}
