import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
    ChatBubbleLeftRightIcon,
    PencilSquareIcon,
    TrashIcon,
    ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { Botao } from '../../componentes/Botao/index.jsx';
import { DetalheProduto } from '../../componentes/DetalheProduto/index.jsx';
import api from '../../services/api.js';
import { FundoDecorado } from '../../componentes/FundoDecorado';
import { Link } from 'react-router-dom';

export const Produto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produto, setProduto] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [eDono, setEDono] = useState(false);

    useEffect(() => {
        const carregarProduto = async () => {
            try {
                const resposta = await api.get(`/shop/${id}`);
                setProduto(resposta.data);
            } catch (erro) {
                console.error('Erro ao buscar produto:', erro);
                navigate('/produtos');
            }
        };

        carregarProduto();
    }, [id, navigate]);

    useEffect(() => {
        if (produto?.soldBy?.id) {
            const carregarUsuario = async () => {
                try {
                    const resposta = await api.get(`/users/${produto.soldBy.id}`);
                    setUsuario(resposta.data);
                } catch (erro) {
                    console.error('Erro ao buscar usuario:', erro);
                }
            };

            carregarUsuario();
        }
    }, [produto]);

    useEffect(() => {
        if (produto?.soldBy?.id) {
            const token = localStorage.getItem('token');

            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const usuarioLogadoId = String(decoded.id);
                    const idVendedor = String(produto.soldBy.id);

                    setEDono(usuarioLogadoId === idVendedor);
                } catch (erro) {
                    console.error('Erro ao decodificar token', erro);
                    setEDono(false);
                }
            } else {
                setEDono(false);
            }
        }
    }, [produto]);

    const excluirProduto = async () => {
        if (!eDono) {
            alert('Voce nao pode excluir um produto de outro usuario!');
            navigate(`/produto/${id}`);
            return;
        }

        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            try {
                await api.delete(`/shop/${id}`);
                alert('Produto excluido com sucesso!');
                navigate('/produtos');
            } catch (erro) {
                console.error('Erro ao excluir:', erro);
                alert('Nao foi possivel excluir o produto.');
            }
        }
    };

    const verificarEdicao = () => {
        if (!eDono) {
            alert('Voce nao pode editar o produto de outro usuario!');
            navigate(`/produto/${id}`);
            return;
        }

        navigate('/cadastro-produto', { state: { produtoParaEditar: produto } });
    };

    if (!produto) {
        return (
            <FundoDecorado>
                <div className="rounded-[32px] border border-white/60 bg-white/75 p-10 text-center shadow-[0_32px_90px_-34px_rgba(62,16,68,0.45)] backdrop-blur-xl">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#6b2e74]/70">
                        Produto
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                        Carregando detalhes do produto...
                    </h2>
                </div>
            </FundoDecorado>
        );
    }

    const numeroWhatsapp = usuario?.phoneNumber?.replace(/\D/g, '');

    return (
        <FundoDecorado>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <Link
                    to="/produtos"
                    className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm font-semibold text-[#4c1454] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
                >
                    <ArrowLeftIcon className="size-4" />
                    Voltar
                </Link>
                {eDono ? (
                    <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                        Este anúncio é seu
                    </span>
                ) : null}
            </div>
            <DetalheProduto
                nome={produto.name}
                descricao={produto.description}
                preco={produto.price}
                img={produto.image}
                categoria={produto.category}
                quantidade={produto.amount}
                vendedor={usuario}
                acoes={
                    <>
                        {eDono ? (
                            <Botao
                                type="button"
                                onClick={verificarEdicao}
                                className={"botao-padrao"}
                            >
                                <PencilSquareIcon className="size-5" />
                                Editar produto
                            </Botao>
                        ) : null}

                        {eDono ? (
                            <Botao
                                type="button"
                                onClick={excluirProduto}
                                className={"botao-excluir"}
                            >
                                <TrashIcon className="size-5" />
                                Excluir produto
                            </Botao>
                        ) : null}

                        {usuario && numeroWhatsapp ? (
                            <Botao
                                as="a"
                                href={`https://wa.me/${numeroWhatsapp}`}
                                target="_blank"
                                rel="noreferrer"
                                className={"botao-whatsapp"}
                            >
                                <ChatBubbleLeftRightIcon className="size-5" />
                                Falar com vendedor
                            </Botao>
                        ) : null}
                    </>
                }
            />
        </FundoDecorado>
    );
};
