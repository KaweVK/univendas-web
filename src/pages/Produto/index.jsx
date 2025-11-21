import { useParams } from 'react-router'
import {Banner} from '../../componentes/Banner/index.jsx'
import {BarraRodape} from '../../componentes/BarraRodape/index.jsx'
import { DetalheProduto } from '../../componentes/DetalheProduto/index.jsx'

export const Produto = () => {
    const { id } = useParams()

    const produto = { nome: 'Produto Exemplo', descricao: 'Descrição detalhada...', preco: 'R$ 2.500,00', img: 'https://github.com/kawevk.png'};

    return (
        <>
            <Banner />
            <DetalheProduto nome={produto.nome} id={id} descricao={produto.descricao} preco={produto.preco} img={produto.img}/>
            <BarraRodape />
        </>
    )
}