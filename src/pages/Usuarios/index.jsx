import { useEffect, useState } from 'react'
import { Banner } from '../../componentes/Banner/index.jsx'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { CardUsuario } from '../../componentes/CardUsuario/index.jsx'
import { Link } from 'react-router-dom'
import api from '../../services/api.js'
import './usuarios.css'

export const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const buscarUsuarios = async () => {
            try {
                const resposta = await api.get('/users/search');
                setUsuarios(resposta.data.content);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        }
        buscarUsuarios();
    }, []);

    return (
        <>
            <Banner />
            <div className='lista-usuarios'>
                <h2>Usuários Cadastrados</h2>
                {usuarios.length > 0 ? (
                    usuarios.map(usuario => (
                        <Link to={`/usuario/${usuario.id}`} key={usuario.id} style={{textDecoration: 'none'}}>
                            <CardUsuario 
                                nome={usuario.name} 
                                email={usuario.email} 
                                cidade={usuario.city}   
                                img={usuario.imageUrl || '../../../public/imagens/Logos/avatar.webp'}
                            />
                        </Link>
                    ))
                ) : (
                    <p>Nenhum usuário encontrado.</p>
                )}
            </div>
            <BarraRodape />
        </>
    )
}