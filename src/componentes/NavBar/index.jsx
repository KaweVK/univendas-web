import './NavBar.css'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'

export const NavBar = () => {
    const navigate = useNavigate();

    const realizarLogout = () => {
        window.confirm("Deseja realmente sair?")
        localStorage.removeItem('token');
        navigate('/auth/login');
    }

    return (<footer className="bar">
        <section>
            <ul>
                <li>
                    <Link to={`/produtos`} style={{ color: "#FFF", marginLeft:"-10pxpx" }}>
                        Produtos
                    </Link>
                </li>
                <li>
                    <Link to={`/usuarios`} style={{ color: "#FFF", marginLeft:"-10pxpx" }}>
                        Usuarios
                    </Link>
                </li>
            </ul>
        </section>
        <section>
            <Link onClick={realizarLogout} to={"/auth/login"} style={{ color: "#FFF"}}>
                Logout
            </Link>
        </section>
    </footer>
    )
}