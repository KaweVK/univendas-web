import { Banner } from '../../componentes/Banner/index.jsx'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { FormularioCadastroUsuario } from '../../componentes/FormularioCadastroUsuario/index.jsx'
import api from '../../services/api.js'
import { useNavigate, useLocation } from 'react-router-dom'

export const CadastroUsuario = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const usuarioParaEditar = location.state?.usuarioParaEditar;

  const gerenciarUsuario = async (dadosFormulario) => {
    try {
        const payload = {
            name: dadosFormulario.nome,
            email: dadosFormulario.email,
            password: dadosFormulario.senha,
            phoneNumber: dadosFormulario.numero, 
            city: dadosFormulario.cidade,
            imageUrl: dadosFormulario.imagem
        };

        if (usuarioParaEditar) {
            await api.put(`/users/${usuarioParaEditar.id}`, payload);
            alert("Dados atualizados com sucesso!");
            navigate(`/usuario/${usuarioParaEditar.id}`); 
        } else {
            await api.post('/users', payload);
            alert("Usuário cadastrado com sucesso! Faça login.");
            navigate('/auth/login');
        }

    } catch (error) {
        console.error("Erro:", error);
        if (error.response && error.response.data && error.response.data.fields) {
            const erros = error.response.data.fields.map(e => `${e.field}: ${e.error}`).join("\n");
            alert(`Erro de validação:\n${erros}`);
        } else if (error.response && error.response.data && error.response.data.message) {
             alert(error.response.data.message); 
        } else {
            alert("Erro ao salvar usuário. Verifique os dados.");
        }
    }
  }

  return (
    <>
      <div>
        <Banner />
        <FormularioCadastroUsuario 
            aoCadastrarUsuario={gerenciarUsuario} 
            href={"/auth/login"}
            usuarioEdicao={usuarioParaEditar}
        />
        <BarraRodape />
      </div>
    </>
  )
}