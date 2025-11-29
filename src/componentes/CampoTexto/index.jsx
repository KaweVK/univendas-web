import './CampoTexto.css'

export const CampoTexto = (props) => {
    const aoDigitar = (evento) => {
        if (props.type === 'file') {
            props.aoAlterado(evento.target.files[0])
        } else {
            props.aoAlterado(evento.target.value)
        }
    }

    return (
        <div className="campo_texto">
            <label>
                {props.label}
            </label>
            <input value={props.type === 'file' ? undefined : props.valor} onChange={aoDigitar} required={props.obrigatorio} placeholder={props.placeholder} type={props.type} />
        </div>
    )
}