import Banner from '../../componentes/Banner'
import BarraRodape from '../../componentes/BarraRodape'
import { DetalheUsuario } from '../../componentes/DetalheUsuario';

export const Usuario = () => {
    //const { id } = useParams();
    const usuario = { nome: 'Usuário Exemplo', email: 'exemplo@email.com', telefone: '(83) 99999-9999', cidade: 'João Pessoa', img: 'https://github.com/kawevk.png'};

    return (
        <>
            <Banner />
            <DetalheUsuario nome={usuario.nome} email={usuario.email} telefone={usuario.telefone} cidade={usuario.cidade} img={usuario.img}/>
            <BarraRodape />
        </>
    )
}