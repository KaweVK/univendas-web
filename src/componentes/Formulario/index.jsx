/* eslint-disable react-hooks/set-state-in-effect */
import './Formulario.css'
import { CampoTexto } from '../CampoTexto'
import { ListaSuspensa } from '../ListaSuspensa'
import { Botao } from '../Botao'
import { useState, useEffect } from 'react'

export const Formulario = (props) => {
    console.log("Formulario recebeu:", props.produtoEdicao);

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [preco, setPreco] = useState('')
    const [categoria, setCategoria] = useState('')
    const [imagem, setImagem] = useState(null)

    const [previewImagem, setPreviewImagem] = useState(null)

    useEffect(() => {
        if (props.produtoEdicao) {
            setNome(props.produtoEdicao.name || '');
            setDescricao(props.produtoEdicao.description || '');
            setQuantidade(props.produtoEdicao.amount || '');
            setPreco(props.produtoEdicao.price || '');
            setCategoria(props.produtoEdicao.category || '');
            setPreviewImagem(props.produtoEdicao.image || null);
        }
    }, [props.produtoEdicao]);

    const aoSalvar = (evento) => {
        evento.preventDefault()
        props.aoCadastrarProduto({
            nome,
            descricao,
            quantidade,
            preco,
            imagem,
            categoria
        })
        if (!props.produtoEdicao) {
            setNome('')
            setDescricao('')
            setQuantidade('')
            setPreco('')
            setImagem(null)
            setCategoria('')
            setPreviewImagem(null)
        }
    }

    return (
        <section className='formulario'>
            <form onSubmit={aoSalvar}>
                <h2>{props.produtoEdicao ? 'Editar Produto' : 'Preencha os dados para criar seu produto'}</h2>

                <CampoTexto
                    obrigatorio={true}
                    label='Nome'
                    placeholder='Digite o nome do produto'
                    valor={nome}
                    aoAlterado={valor => setNome(valor)} />
                <CampoTexto
                    obrigatorio={true}
                    label='Descrição'
                    placeholder='Digite a descrição do produto'
                    valor={descricao}
                    aoAlterado={valor => setDescricao(valor)} />
                <CampoTexto
                    obrigatorio={true}
                    label='Quantidade'
                    placeholder='Digite quantidade do produto'
                    valor={quantidade}
                    aoAlterado={valor => setQuantidade(valor)} />
                <CampoTexto
                    obrigatorio={true}
                    label='Preço'
                    placeholder='Digite o preço do produto'
                    valor={preco}
                    aoAlterado={valor => setPreco(valor)} />
                <CampoTexto
                    obrigatorio={false}
                    label='Imagem'
                    placeholder='Imagem do produto'
                    valor={imagem}
                    aoAlterado={valor => setImagem(valor)}
                    type={'file'} />
                {props.produtoEdicao && previewImagem && (
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <p style={{ color: 'white', marginBottom: '5px' }}>Imagem Atual:</p>
                        <img
                            src={previewImagem}
                            alt="Atual"
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px', border: '2px solid white' }}
                        />
                        <p style={{ fontSize: '12px', color: '#ddd' }}>(Envie outra apenas se quiser alterar)</p>
                    </div>
                )}
                <ListaSuspensa
                    obrigatorio={true}
                    itens={props.categorias}
                    label='Categoria'
                    valor={categoria}
                    aoAlterado={valor => setCategoria(valor)} />

                <Botao className={'botao-padrao'}>
                    {props.produtoEdicao ? 'Salvar Alterações' : 'Cadastrar'}
                </Botao>
            </form>
        </section>
    )
}