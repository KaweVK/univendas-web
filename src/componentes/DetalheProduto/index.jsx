import './DetalheProduto.css';

export const DetalheProduto = ({nome, descricao, preco, img }) => {
    return (
        <div className='detalhe-produto'>
            <h1>{nome}</h1>
            <img src={img} alt={nome} />
            <p>{descricao}</p>
            <h3>{preco}</h3>
        </div>
    )
}