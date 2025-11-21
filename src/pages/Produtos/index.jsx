import { useEffect, useState } from 'react'
import { Banner } from '../../componentes/Banner/index.jsx'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { CardProduto } from '../../componentes/CardProduto/index.jsx'
import { Link } from 'react-router-dom'
import './Produtos.css'
import { Botao } from '../../componentes/Botao/index.jsx'
import api from '../../services/api.js' // Importar API

export const Produtos = () => {
    const [produtos, setProdutos] = useState([]);

    // useEffect executa quando a tela carrega
    useEffect(() => {
        const buscarProdutos = async () => {
            try {
                const resposta = await api.get('/shop/all');
                // O Spring retorna um objeto Page, a lista real está em .content
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
                {/* Verificamos se tem produtos antes de mapear */}
                {produtos.length > 0 ? (
                    produtos.map(produto => (
                        <Link to={`/produto/${produto.id}`} key={produto.id} style={{textDecoration: 'none'}}>
                            <CardProduto 
                                nome={produto.name}  // No Java é 'name'
                                descricao={produto.description} // No Java é 'description'
                                img={produto.imageUrl || 'https://github.com/kawevk.png'} // Usa imagem padrão se vier null
                                corPrimaria={'#82CFFA'} // Cor fixa ou vinda de uma lógica de categoria
                            />
                        </Link>
                    ))
                ) : (
                    <p>Carregando produtos ou nenhum item encontrado...</p>
                )}
            </div>
            <Link to='/cadastro-produto'>
                <Botao className="botao-padrao">Cadastrar Produto</Botao>
            </Link>
            <BarraRodape />
        </>
    )
}