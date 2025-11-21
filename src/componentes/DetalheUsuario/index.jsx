import './DetalheUsuario.css';

export const DetalheUsuario = ({ id, nome, email, telefone, img, cidade }) => {
    return (
        <>
            <div className='detalhe-usuario'>
                <h1>Perfil do Usuário {id}</h1>
                <img src={img} alt={`Foto de ${nome}`} />
                <h2>{nome}</h2>
                <p>Email: {email}</p>
                <p>Telefone: {telefone}</p>
                <p>Cidade: {cidade}</p>
            </div>
        </>
    )
}