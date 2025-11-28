/* eslint-disable react-hooks/set-state-in-effect */
import { CampoTexto } from '../CampoTexto'
import { Botao } from '../Botao'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const FormularioCadastroUsuario = (props) => {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [numero, setNumero] = useState('')
    const [cidade, setCidade] = useState('')
    const [imagem, setImagem] = useState('') 

    useEffect(() => {
        if (props.usuarioEdicao) {
            setNome(props.usuarioEdicao.name || '');
            setEmail(props.usuarioEdicao.email || '');
            setNumero(props.usuarioEdicao.phoneNumber || '');
            setCidade(props.usuarioEdicao.city || '');
            setImagem(props.usuarioEdicao.imageUrl || '');
        }
    }, [props.usuarioEdicao]);

    const aoSalvar = (evento) => {
        evento.preventDefault()
        props.aoCadastrarUsuario({
            nome,
            email,
            senha,
            numero,
            cidade,
            imagem
        })
        
        if (!props.usuarioEdicao) {
            setNome('')
            setEmail('')
            setSenha('')
            setNumero('')
            setCidade('')
            setImagem('')
        }
    }

    return (
        <section className='formulario'>
            <form onSubmit={aoSalvar}>
                <h2>{props.usuarioEdicao ? 'Editar Dados' : 'Cadastro de Usuário'}</h2>
                
                <CampoTexto
                    obrigatorio={true}
                    label='Nome Completo'
                    placeholder='Digite o seu nome completo'
                    valor={nome}
                    aoAlterado={valor => setNome(valor)} />
                
                <CampoTexto
                    obrigatorio={true}
                    label='Email (@dcx.ufpb.br)'
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
                    label='Telefone'
                    placeholder='Digite o seu número de telefone'
                    valor={numero}
                    aoAlterado={valor => setNumero(valor)} />
                
                <CampoTexto
                    obrigatorio={true}
                    label='Cidade'
                    placeholder='Digite a cidade de residência'
                    valor={cidade}
                    aoAlterado={valor => setCidade(valor)} />

                <CampoTexto
                    obrigatorio={false}
                    label='URL da Foto (Opcional)'
                    placeholder='Link da imagem de perfil'
                    valor={imagem}
                    aoAlterado={valor => setImagem(valor)} />

                <Botao className={'botao-padrao'}>
                    {props.usuarioEdicao ? 'Salvar Alterações' : 'Cadastrar'}
                </Botao>
                
                {!props.usuarioEdicao && <Link to={props.href}>Já tenho conta</Link>}
            </form>
        </section>
    )
}