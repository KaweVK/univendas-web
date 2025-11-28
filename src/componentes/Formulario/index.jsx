/* eslint-disable react-hooks/set-state-in-effect */
import './Formulario.css'
import { CampoTexto } from '../CampoTexto'
import { ListaSuspensa } from '../ListaSuspensa'
import { Botao } from '../Botao'
import { useState, useEffect } from 'react'

export const Formulario = (props) => {

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [preco, setPreco] = useState('')
    const [categoria, setCategoria] = useState('')
    const [imagem, setImagem] = useState('')


    useEffect(() => {
        if (props.produtoEdicao) {
            setNome(props.produtoEdicao.name || '');
            setDescricao(props.produtoEdicao.description || '');
            setQuantidade(props.produtoEdicao.amount || '');
            setPreco(props.produtoEdicao.price || '');
            setImagem(props.produtoEdicao.imageUrl || '');
            setCategoria(props.produtoEdicao.category || '');
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
            setImagem('')
            setCategoria('')
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
                    obrigatorio={true}
                    label='Imagem'
                    placeholder='Digite o link da imagem do produto'
                    valor={imagem}
                    aoAlterado={valor => setImagem(valor)} />
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