import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Banner } from '../../componentes/Banner/index.jsx';
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx';
import { DetalheProduto } from '../../componentes/DetalheProduto/index.jsx';
import { Botao } from '../../componentes/Botao/index.jsx';
import api from '../../services/api.js'; // Importando nossa API configurada

export const Produto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState(null); // Começa nulo enquanto carrega

    // 1. Busca os dados do produto ao carregar a página
    useEffect(() => {
        const carregarProduto = async () => {
            try {
                const resposta = await api.get(`/shop/${id}`);
                setProduto(resposta.data);
            } catch (erro) {
                console.error("Erro ao buscar produto:", erro);
                alert("Erro ao carregar o produto!");
                navigate('/'); // Volta para home se der erro
            }
        };
        carregarProduto();
    }, [id, navigate]);

    // 2. Função para excluir o produto
    const excluirProduto = async () => {
        // Pergunta de segurança
        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            try {
                await api.delete(`/shop/${id}`);
                alert("Produto excluído com sucesso!");
                navigate('/'); // Volta para a lista de produtos
            } catch (erro) {
                console.error("Erro ao excluir:", erro);
                alert("Não foi possível excluir o produto.");
            }
        }
    };

    // Exibe um carregando enquanto a requisição não termina
    if (!produto) {
        return (
            <>
                <Banner />
                <div style={{ textAlign: 'center', margin: '50px' }}>
                    <h2>Carregando detalhes...</h2>
                </div>
                <BarraRodape />
            </>
        );
    }

    return (
        <>
            <Banner />
            {/* Passamos os dados que vieram da API. 
                Nota: A API retorna 'name', 'description', 'price', 'imageUrl'.
                O componente DetalheProduto espera 'nome', 'descricao', 'preco', 'img'. */}
            <DetalheProduto 
                nome={produto.name} 
                descricao={produto.description} 
                preco={`R$ ${produto.price}`} 
                img={produto.imageUrl || 'https://github.com/kawevk.png'}
            />
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                {/* Botão de Editar */}
                <Link to={`/cadastro-produto`} state={{ produtoParaEditar: produto }}>
                    <Botao className={'botao-padrao'}>Editar Produto</Botao>
                </Link>
                
                {/* Botão de Excluir */}
                <div onClick={excluirProduto}>
                    <Botao className={'botao-excluir'}>Excluir Produto</Botao>
                </div>
            </div>

            <BarraRodape />
        </>
    )
}