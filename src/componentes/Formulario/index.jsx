import './Formulario.css'
import CampoTexto from '../CampoTexto'
import ListaSuspensa from '../ListaSuspensa'
import Botao from '../Botao'
import { useState } from 'react'

export const Formulario = (props) => {

    const [nome, setNome] = useState('') 
    const [descricao, setDescricao] = useState('') 
    const [quantidade, setQuantidade] = useState('') 
    const [preco, setPreco] = useState('') 
    const [categoria, setCategoria] = useState('')
    const [imagem, setImagem] = useState('') 

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
        setNome('')
        setDescricao('')
        setQuantidade('')
        setPreco('')
        setImagem('')
        setCategoria('')
    }


    return (
        <section className='formulario'>
            <form onSubmit={aoSalvar}>
                <h2>Preencha os dados para criar seu produto</h2>
                <CampoTexto 
                    obrigatorio={true} 
                    label='Nome' 
                    placeholder='Digite o nome do produto' 
                    valor={nome}
                    aoAlterado={valor => setNome(valor)}/>
                <CampoTexto 
                    obrigatorio={true} 
                    label='Descrição' 
                    placeholder='Digite a descrição do produto'
                    valor={descricao}
                    aoAlterado={valor => setDescricao(valor)}/>
                <CampoTexto
                    obrigatorio={true} 
                    label='Quantidade' 
                    placeholder='Digite quantidade do produto'
                    valor={quantidade}
                    aoAlterado={valor => setQuantidade(valor)}/>
                <CampoTexto 
                    obrigatorio={true} 
                    label='Preço' 
                    placeholder='Digite o preço do produto'
                    valor={preco}
                    aoAlterado={valor => setPreco(valor)}/>
                <CampoTexto 
                    obrigatorio={true} 
                    label='Imagem' 
                    placeholder='Digite o link da imagem do produto'
                    valor={imagem}
                    aoAlterado={valor => setImagem(valor)}/>
                <ListaSuspensa 
                    obrigatorio={true} 
                    itens={props.categorias} 
                    label='Categoria'
                    valor={categoria}
                    aoAlterado={valor => setCategoria(valor)}/>
                <Botao>
                    Cadastrar
                </Botao>
            </form>
        </section>
    )

}
