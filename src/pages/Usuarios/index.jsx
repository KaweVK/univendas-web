import { Banner } from '../../componentes/Banner/index.jsx'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { CardUsuario } from '../../componentes/CardUsuario/index.jsx'
import { Link } from 'react-router-dom'
import './usuarios.css'

export const Usuarios = () => {
    const usuarios = [
        { id: 1, nome: 'Kawê', email: 'kawe@email.com', cidade: 'João Pessoa' },
        { id: 2, nome: 'Silas', email: 'silas@email.com', cidade: 'Campina Grande' }
    ];

    return (
        <>
            <Banner />
            <div className='lista-usuarios'>
                <h2>Usuários Cadastrados</h2>
                {usuarios.map(usuario => (
                    <Link to={`/usuario/${usuario.id}`} key={usuario.id} style={{textDecoration: 'none'}}>
                        <CardUsuario nome={usuario.nome} email={usuario.email} cidade={usuario.cidade} />
                    </Link>
                ))}
            </div>
            <BarraRodape />
        </>
    )
}