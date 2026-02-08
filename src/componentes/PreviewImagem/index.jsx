
export const PreviewImagem = ({ p, imagem }) => {
    return (
        <>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <p style={{ color: 'white', marginBottom: '5px' }}>{p}</p>
                <img
                    src={imagem}
                    alt="Atual"
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px', border: '2px solid white' }}
                />
            </div>
        </>
    )

}