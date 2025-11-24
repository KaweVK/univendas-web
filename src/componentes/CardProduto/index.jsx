import './CardProduto.css';


export const CardProduto = ({img, nome, descricao}) => {

    return (
        <div className='cardProduto'>
            <div className='cabecalho'>
                <img src={img} alt="Imagem do produto" />
            </div>
            <div className='rodape'>
                <h4>{nome}</h4>
                <p>{descricao}</p>
            </div>
        </div>
    )
}