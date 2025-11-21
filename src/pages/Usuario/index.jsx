import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Banner } from '../../componentes/Banner/index.jsx';
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx';
import { DetalheUsuario } from '../../componentes/DetalheUsuario/index.jsx';
import { Botao } from '../../componentes/Botao/index.jsx';
import api from '../../services/api.js';
import './Usuario.css';

export const Usuario = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);

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

    const excluirUsuario = async () => {
        if (window.confirm(`Tem certeza que deseja excluir o usuário ${usuario.name}?`)) {
            if (usuario.id !== id) {
                alert("Você não pode excluir o perfil de outro usuário")
                return;
            }
            try {
                await api.delete(`/users/${id}`);
                alert("Usuário excluído com sucesso!");
                navigate('/usuarios');
            } catch (erro) {
                console.error("Erro ao excluir:", erro);
                alert("Erro ao excluir usuário. Verifique permissões.");
            }
        }
    }

    if (!usuario) {
        return <div>Carregando...</div>
    }

    return (
        <>
            <Banner />
            <DetalheUsuario 
                id={usuario.id}
                nome={usuario.name} 
                email={usuario.email} 
                telefone={usuario.phoneNumber} 
                cidade={usuario.city} 
                img={usuario.imageUrl || '../../../public/imagens/Logos/avatar.webp'}
            />
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
                <Link to='/auth/cadastro-usuario' state={{ usuarioParaEditar: usuario }}>
                    <Botao className={'botao-padrao'}>Editar Perfil</Botao>
                </Link>
                
                <div onClick={excluirUsuario}>
                    <Botao className={'botao-excluir'}>Excluir Conta</Botao>
                </div>

                <Link to='/usuarios' state={{ usuarioParaEditar: usuario }}>
                    <Botao className={'botao-padrao'}>Voltar</Botao>
                </Link>
            </div>
            <BarraRodape />
        </>
    )
}