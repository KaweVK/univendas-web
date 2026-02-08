import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx';
import { DetalheUsuario } from '../../componentes/DetalheUsuario/index.jsx';
import { Botao } from '../../componentes/Botao/index.jsx';
import api from '../../services/api.js';
import './Usuario.css';
import { jwtDecode } from 'jwt-decode';
import { NavBar } from '../../componentes/NavBar/index.jsx';

export const Usuario = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [eDono, setEDono] = useState(false);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const usuarioLogadoId = String(decoded.id);

    useEffect(() => {
        const carregarUsuario = async () => {
            try {
                const resposta = await api.get(`/users/${id}`);
                setUsuario(resposta.data);
            } catch (erro) {
                console.error("Erro ao buscar usuário:", erro);
                alert("Erro ao carregar perfil.");
                navigate('/usuarios');
            }
        }
        carregarUsuario();
    }, [id, navigate]);

    useEffect(() => {
        if (usuario) {
            if (token) {
                try {
                    const idPerfil = String(id);

                    // eslint-disable-next-line react-hooks/set-state-in-effect
                    setEDono(usuarioLogadoId === idPerfil);
                } catch (erro) {
                    console.error("Erro ao decodificar token", erro);
                    setEDono(false);
                }
            };

        }
    }, [id, token, usuarioLogadoId, usuario]);

    const excluirUsuario = async () => {
        if (!eDono) {
            alert("Você não pode excluir outro usuário!")
            navigate(`/usuario/${id}`)
            return;
        }

        if (window.confirm(`Tem certeza que deseja excluir o usuário ${usuario.name}?`)) {
            try {
                await api.delete(`/users/${id}`);

                if (String(usuarioLogadoId) === String(id)) {
                    alert("Sua conta foi excluída. Você será desconectado.");
                    localStorage.removeItem('token');
                    navigate('/auth/login');
                }

            } catch (erro) {
                console.error("Erro ao excluir:", erro);
                alert("Erro ao excluir usuário. Verifique permissões.");
            }
        }
    }

    if (!usuario) {
        return <div>Carregando...</div>
    }

    const verificarEdição = async () => {
        if (!eDono) {
            alert("Você não pode editar outro usuário!")
            navigate(`/usuario/${id}`)
            return;
        }

        if (String(usuarioLogadoId) !== String(usuario.id)) {
            alert("Você não pode editar outro usuário!")
            navigate(`/usuario/${id}`)
            return;
        }

        navigate("/auth/cadastro-usuario", { state: { usuarioParaEditar: usuario } })
    }

    return (
        <>
            <NavBar />
            <DetalheUsuario
                id={usuario.id}
                nome={usuario.name}
                email={usuario.email}
                telefone={usuario.phoneNumber}
                cidade={usuario.city}
                img={usuario.image || '../../../public/imagens/Logos/avatar.webp'}
            />

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
                {eDono &&
                    (<div onClick={verificarEdição}>
                        <Botao className={'botao-padrao'}>Editar Perfil</Botao>
                    </div>
                    )
                }

                {eDono &&
                    (<div onClick={excluirUsuario}>
                        <Botao className={'botao-excluir'}>Excluir Conta</Botao>
                    </div>
                    )
                }

                <Link to='/usuarios'>
                    <Botao className={'botao-padrao'}>Voltar</Botao>
                </Link>
            </div>
            <BarraRodape />
        </>
    )
}