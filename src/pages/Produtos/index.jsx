import { useEffect, useState } from 'react'
import { Banner } from '../../componentes/Banner/index.jsx'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { CardProduto } from '../../componentes/CardProduto/index.jsx'
import { Link } from 'react-router-dom'
import './Produtos.css'
import { Botao } from '../../componentes/Botao/index.jsx'
import api from '../../services/api.js'

export const Produtos = () => {
    const [produtos, setProdutos] = useState([]);

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

    return (
        <>
            <Banner />
            <div className='lista-produtos'>
                <h2>Produtos a venda</h2>
                {produtos.length > 0 ? (
                    produtos.map(produto => (
                        <Link to={`/produto/${produto.id}`} key={produto.id} style={{ textDecoration: 'none' }}>
                            <CardProduto
                                nome={produto.name}
                                descricao={produto.description}
                                img={produto.imageUrl || 'public/imagens/Logos/avatar.webp'}
                                corPrimaria={'#82CFFA'}
                            />
                        </Link>
                    ))
                ) : (
                    <p>Carregando produtos ou nenhum item encontrado...</p>
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