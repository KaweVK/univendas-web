import CardProduto from "../CardProduto";
import "./Categoria.css";

export const Categoria = (props) => {

    const cssSection = {backgroundColor: props.corSecundaria}

    const cssH3 = {borderColor: props.corPrimaria}

    return(
        (props.produtos.length > 0) && <section className="categoria" style={cssSection}>
            <h3 style={cssH3}>{props.nome}</h3>
            <div className="produtos">
                {props.produtos.map( produto => <CardProduto key={produto.nome} corPrimaria={props.corPrimaria} nome={produto.nome} descricao={produto.descricao} img={produto.imagem}/>)}
            </div>
        </section>
    )
}
