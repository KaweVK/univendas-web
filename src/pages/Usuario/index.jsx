import { Banner } from '../../componentes/Banner/index.jsx'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { DetalheUsuario } from '../../componentes/DetalheUsuario/index.jsx';
import { Botao } from '../../componentes/Botao/index.jsx';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Usuario.css';

export const Usuario = () => {
    const { id } = useParams();
    const usuario = { id:id, nome: 'Usuário Exemplo', email: 'exemplo@email.com', telefone: '(83) 99999-9999', cidade: 'João Pessoa', img: 'https://github.com/kawevk.png'};

    return (
        <>
            <Banner />
            <DetalheUsuario nome={usuario.nome} email={usuario.email} telefone={usuario.telefone} cidade={usuario.cidade} img={usuario.img}/>
            <Link to='/cadastro-usuario'>
                <Botao className={'botao-padrao'}>Editar Usuario</Botao>
            </Link>
            <Link to='/cadastro-usuario'>
                <Botao className={'botao-excluir'}>Excluir Usuario</Botao>
            </Link>
            <BarraRodape />
        </>
    )
}