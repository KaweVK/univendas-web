import './Botao.css';

export const Botao = (props) => {
    return(
        <button className={props.className}>{props.children}</button>
    )
}
