import Banner from '../../componentes/Banner'
import BarraRodape from '../../componentes/BarraRodape'
import CardProduto from '../../componentes/CardProduto'
import { Link } from 'react-router'
import './Produtos.css'

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
            <BarraRodape />
        </>
    )
}