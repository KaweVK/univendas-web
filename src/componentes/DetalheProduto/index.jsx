import './DetalheProduto.css';

export const DetalheProduto = ({id, nome, descricao, preco, img }) => {
    return (
        <div className='detalhe-produto'>
            <h1>Produto {id}</h1>
            <img src={img} alt={nome} />
            <h2>{nome}</h2>
            <p>{descricao}</p>
            <h3>{preco}</h3>
        </div>
    )
}