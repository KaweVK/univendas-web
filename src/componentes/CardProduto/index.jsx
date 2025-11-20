import './CardProduto.css';


const CardProduto = ({img, nome, descricao, corPrimaria}) => {

    const css = {
        backgroundColor: corPrimaria
    }

    return (
        <div className='cardProduto'>
            <div className='cabecalho' style={css}>
                <img src={img} alt="Imagem do produto" />
            </div>
            <div className='rodape'>
                <h4>{nome}</h4>
                <h5>{descricao}</h5>
            </div>
        </div>
    )
}

export default CardProduto;