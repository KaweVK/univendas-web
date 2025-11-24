import './CardUsuario.css';

export const CardUsuario = ({ nome, email, cidade, img}) => {
    return (
        <div className='cardUsuario'>
            <div className='cabecalho'>
                <img src={img} alt="Avatar" /> 
            </div>
            <div className='rodape'>
                <h4>{nome}</h4>
                <p>{email}</p>
                <p>{cidade}</p>
            </div>
        </div>
    )
}   