import { Banner } from '../../componentes/Banner/index.jsx'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import {CardProduto } from '../../componentes/CardProduto/index.jsx'
import { Link } from 'react-router-dom'
import './Produtos.css'
import { Botao } from '../../componentes/Botao/index.jsx'

export const Produtos = () => {
    const produtos = [
        { id: 1, nome: 'Notebook Gamer', descricao: 'Rápido e potente', corPrimaria: '#57C278', img: 'https://github.com/kawevk.png' },
        { id: 2, nome: 'iPhone 15', descricao: 'Última geração', corPrimaria: '#82CFFA', img: 'https://github.com/kawevk.png' }
    ];

    return (
        <>
            <Banner />
            <div className='lista-produtos'>
                <h2>Produtos a venda</h2>
                {produtos.map(produto => (
                    <Link to={`/produto/${produto.id}`} key={produto.id} style={{textDecoration: 'none'}}>
                        <CardProduto 
                            nome={produto.nome} 
                            descricao={produto.descricao} 
                            img={produto.img} 
                            corPrimaria={produto.corPrimaria} 
                        />
                    </Link>
                ))}
            </div>
            <Link to='/cadastro-produto'>
                <Botao>Cadastrar Produto</Botao>
            </Link>
            <BarraRodape />
        </>
    )
}