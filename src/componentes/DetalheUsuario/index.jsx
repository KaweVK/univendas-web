import './DetalheUsuario.css';

export const DetalheUsuario = ({ nome, email, telefone, img, cidade }) => {
    return (
        <>
            <div className='detalhe-usuario'>
                <h1>Perfil do Usuário</h1>
                <img src={img} alt={`Foto de ${nome}`} />
                <h2><strong>Nome:</strong> {nome}</h2>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Telefone:</strong> {telefone}</p>
                <p><strong>Cidade:</strong> {cidade}</p>
            </div>
        </>
    )
}