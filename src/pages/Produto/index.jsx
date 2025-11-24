import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx';
import { DetalheProduto } from '../../componentes/DetalheProduto/index.jsx';
import { Botao } from '../../componentes/Botao/index.jsx';
import api from '../../services/api.js';
import { NavBar } from '../../componentes/NavBar/index.jsx';

export const Produto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState(null);

    useEffect(() => {
        const carregarProduto = async () => {
            try {
                const resposta = await api.get(`/shop/${id}`);
                setProduto(resposta.data);
            } catch (erro) {
                console.error("Erro ao buscar produto:", erro);
                alert("Erro ao carregar o produto!");
                navigate('/');
            }
        };
        carregarProduto();
    }, [id, navigate]);

    const excluirProduto = async () => {
        const token = localStorage.getItem('token');
        let usuarioLogadoId = null;

        if (token) {
            const decoded = jwtDecode(token);
            usuarioLogadoId = decoded.id;
        }

        if (String(usuarioLogadoId) !== String(id)) {
            alert("Você não pode excluir um produto de outro usuário!")
            navigate(`/produto/${id}`)
            return;
        }

        if (window.confirm("Tem certeza que deseja excluir este produto?")) {
            try {
                await api.delete(`/shop/${id}`);
                alert("Produto excluído com sucesso!");
                navigate('/produtos');
            } catch (erro) {
                console.error("Erro ao excluir:", erro);
                alert("Não foi possível excluir o produto.");
            }
        }
    };

    if (!produto) {
        return (
            <>
                <div style={{ textAlign: 'center', margin: '50px' }}>
                    <h2>Carregando detalhes...</h2>
                </div>
                <BarraRodape />
            </>
        );
    }

    const verificarEdição = async () => {
        const token = localStorage.getItem('token');
        let usuarioLogadoId = null;

        if (token) {
            const decoded = jwtDecode(token);
            usuarioLogadoId = decoded.id;
        }

        const idVendedor = produto.soldBy

        if (String(usuarioLogadoId) !== String(idVendedor)) {
            alert("Você não pode editar o produto de outro usuário!")
            navigate(`/produto/${id}`)
            return;
        }

        navigate("/cadastro-produto", { state: { produtoParaEditar: produto } })
    }


    return (
        <>
            <NavBar />
            <DetalheProduto
                nome={produto.name}
                descricao={produto.description}
                preco={`R$ ${produto.price}`}
                img={produto.imageUrl || 'https://github.com/kawevk.png'}
            />

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <div onClick={verificarEdição}>
                    <Botao className={'botao-padrao'}>Editar Produto</Botao>
                </div>

                <div onClick={excluirProduto}>
                    <Botao className={'botao-excluir'}>Excluir Produto</Botao>
                </div>

                <Link to='/produtos'>
                    <Botao className={'botao-padrao'}>Voltar</Botao>
                </Link>
            </div>

            <BarraRodape />
        </>
    )
}