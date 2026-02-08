import { useEffect, useState } from 'react'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { CardProduto } from '../../componentes/CardProduto/index.jsx'
import { Link } from 'react-router-dom'
import './Produtos.css'
import { Botao } from '../../componentes/Botao/index.jsx'
import api from '../../services/api.js'
import { NavBar } from '../../componentes/NavBar/index.jsx'
import { CampoBusca } from '../../componentes/CampoBusca/index.jsx'

export const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtosBusca, setProdutosBusca] = useState([])
    const [busca, setBusca] = useState('')
    const [buscou, setBuscou] = useState(false);

    useEffect(() => {
        const buscarProdutos = async () => {
            try {
                const resposta = await api.get('/shop/all');
                // Retorna Page, a lista em .content
                setProdutos(resposta.data.content);
            } catch (error) {
                console.error("Erro ao buscar produtos", error);
            }
        }
        buscarProdutos();
    }, []);

    const aoPesquisar = async (evento) => {
        evento.preventDefault()

        if (busca === '') {
            setProdutosBusca([])
            setBuscou(false)
            return;
        }

        try {
            let url = `/shop/search?name=${busca}`
            const resposta = await api.get(url);
            setProdutosBusca(resposta.data.content);
            setBuscou(true)
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
            setProdutosBusca([]);
        }
    }

    const aoDigitar = (valor) => {
        setBusca(valor);
        if (valor === '') {
            setProdutosBusca([]);
            setBuscou(false);
        }
    }

    return (
        <>
            <NavBar />
            <CampoBusca label={'Busque'} aoDigitar={aoDigitar} placeholder={'Nome do produto'} valor={busca} pesquisa={aoPesquisar} />
            <div className='lista-produtos'>
                <h2>{buscou ? `Resultado para "${busca}"` : 'Produtos à venda'}</h2>
                {buscou ? (
                    produtosBusca.length > 0 ? (
                        produtosBusca.map(produto => (
                            <Link to={`/produto/${produto.id}`} key={produto.id} style={{ textDecoration: 'none' }}>
                                <CardProduto
                                    nome={produto.name}
                                    descricao={produto.description}
                                    img={produto.image || 'public/imagens/Logos/avatar.webp'}
                                />
                            </Link>
                        ))
                    ) : (
                        <p>Nenhum intem encontrado na busca.</p>
                    )
                ) : (
                    produtos.length > 0 ? (
                        produtos.map(produto => (
                            <Link to={`/produto/${produto.id}`} key={produto.id} style={{ textDecoration: 'none' }}>
                                <CardProduto
                                    nome={produto.name}
                                    descricao={produto.description}
                                    img={produto.image || 'public/imagens/Logos/avatar.webp'}
                                />
                            </Link>
                        ))
                    ) : (
                        <p>Carregando produtos ou nenhum item encontrado...</p>
                    )
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
                <Link to='/cadastro-produto'>
                    <Botao className="botao-padrao">Cadastrar Produto</Botao>
                </Link>
                <Link to='/usuarios'>
                    <Botao className="botao-padrao">Ver Usuarios</Botao>
                </Link>
            </div>
            <BarraRodape />
        </>
    )
}