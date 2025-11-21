import './CardUsuario.css';

export const CardUsuario = ({ nome, email, cidade }) => {
    return (
        <div className='cardUsuario'>
            <div className='cabecalho'>
                <img src="/imagens/Banner/univendas_logo.png" alt="Avatar" /> 
            </div>
            <div className='rodape'>
                <h4>{nome}</h4>
                <h5>{email}</h5>
                <p>{cidade}</p>
            </div>
        </div>
    )
}   