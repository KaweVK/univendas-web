/* eslint-disable react-hooks/set-state-in-effect */
import { CampoTexto } from '../CampoTexto'
import { Botao } from '../Botao'
import { PreviewImagem } from '../PreviewImagem'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const FormularioCadastroUsuario = (props) => {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [numero, setNumero] = useState('')
    const [cidade, setCidade] = useState('')
    const [imagem, setImagem] = useState(null)
    const [previewImagem, setPreviewImagem] = useState(null)

    useEffect(() => {
        if (props.usuarioEdicao) {
            setNome(props.usuarioEdicao.name || '');
            setEmail(props.usuarioEdicao.email || '');
            setNumero(props.usuarioEdicao.phoneNumber || '');
            setCidade(props.usuarioEdicao.city || '');
            setPreviewImagem(props.usuarioEdicao.image || null);
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
            setImagem(null)
            setPreviewImagem(null)
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
                    aoAlterado={valor => setSenha(valor)}
                    type={'password'} />

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
                    label='Foto (Opcional)'
                    placeholder='Selecione a imagem'
                    valor={imagem}
                    aoAlterado={valor => setImagem(valor)}
                    type={'file'} />

                {props.usuarioEdicao && previewImagem && (
                    <PreviewImagem p={'Imagem atual:'} imagem={previewImagem} />
                )}

                <Botao className={'botao-padrao'}>
                    {props.usuarioEdicao ? 'Salvar Alterações' : 'Cadastrar'}
                </Botao>

                {!props.usuarioEdicao && <Link to={props.href}>Já tenho conta</Link>}
            </form>
        </section>
    )
}