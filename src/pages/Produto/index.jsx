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
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const carregarProduto = async () => {
            try {
                const resposta = await api.get(`/shop/${id}`);
                setProduto(resposta.data);
            } catch (erro) {
                console.error("Erro ao buscar produto:", erro);
                alert("Erro ao carregar o produto!");
                navigate('/produtos');
            }
        };
        carregarProduto();

    }, [id, navigate]);

    useEffect(() => {
        if (produto) {
            const carregarUsuario = async () => {
                const idVendedor = produto.soldById

                try {
                    const resposta = await api.get(`/users/${idVendedor}`);
                    setUsuario(resposta.data);
                } catch (erro) {
                    console.error("Erro ao buscar usuario:", erro);
                    alert("Erro ao carregar o usuario!");
                }
            };
            carregarUsuario();
        }
    }, [produto]);

    const excluirProduto = async () => {
        const token = localStorage.getItem('token');
        let usuarioLogadoId = null;

        if (token) {
            const decoded = jwtDecode(token);
            usuarioLogadoId = decoded.id;
        }

        if (String(usuarioLogadoId) !== String(produto.soldById)) {
            alert("Você não pode excluir um produto de outro usuário!")
            navigate(`/produto/${id}`) //erro
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

        const idVendedor = produto.soldById

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

                {usuario &&
                    (<Link to={`https://wa.me/${usuario.phoneNumber}`} target='_blank'>
                        <Botao className={'botao-whatsapp'}>Entrar em contato</Botao>
                    </Link>
                )}

                <Link to='/produtos'>
                    <Botao className={'botao-padrao'}>Voltar</Botao>
                </Link>
            </div>

            <BarraRodape />
        </>
    )
}