import {CampoTexto} from '../CampoTexto'
import {Botao} from '../Botao'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const FormularioCadastroUsuario = (props) => {

    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [numero, setNumero] = useState('')
    const [senha, setSenha] = useState('')
    const [cidade, setCidade] = useState('')

    const aoSalvar = (evento) => {
        evento.preventDefault()
        props.aoCadastrarUsuario({
            email,
            senha,
            nome,
            numero,
            cidade
        })
        setEmail('')
        setSenha('')
        setNome('')
        setNumero('')
        setCidade('')
    }

    return (
        <section className='formulario'>
            <form onSubmit={aoSalvar}>
                <h2>Cadastro</h2>
                <CampoTexto
                    obrigatorio={true}
                    label='Nome'
                    placeholder='Digite o seu nome do completo'
                    valor={nome}
                    aoAlterado={valor => setNome(valor)} />
                <CampoTexto
                    obrigatorio={true}
                    label='Email'
                    placeholder='Digite o email do login'
                    valor={email}
                    aoAlterado={valor => setEmail(valor)} />
                <CampoTexto
                    obrigatorio={true}
                    label='Senha'
                    placeholder='Digite a sua senha'
                    valor={senha}
                    aoAlterado={valor => setSenha(valor)} />
                <CampoTexto
                    obrigatorio={true}
                    label='Número de telefone'
                    placeholder='Digite o seu número de telefone'
                    valor={numero}
                    aoAlterado={valor => setNumero(valor)} />
                <CampoTexto
                    obrigatorio={true}
                    label='Cidade'
                    placeholder='Digite a cidade de residência'
                    valor={cidade}
                    aoAlterado={valor => setCidade(valor)} />
                <Botao className={'botao-padrao'}>
                    Cadastrar
                </Botao>
                <Link to={props.href}>Já tenho conta</Link>
            </form>
        </section>
    )

}
