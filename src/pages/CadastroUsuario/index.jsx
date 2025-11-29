import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import { FormularioCadastroUsuario } from '../../componentes/FormularioCadastroUsuario/index.jsx'
import { Banner } from '../../componentes/Banner/index.jsx'
import api from '../../services/api.js'
import { useNavigate, useLocation } from 'react-router-dom'

export const CadastroUsuario = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const usuarioParaEditar = location.state?.usuarioParaEditar;

  const gerenciarUsuario = async (dadosFormulario) => {
    try {
      const formData = new FormData();
      formData.append('name', dadosFormulario.nome);
      formData.append('email', dadosFormulario.email);
      formData.append('password', dadosFormulario.senha); 
      formData.append('phoneNumber', dadosFormulario.numero);
      formData.append('city', dadosFormulario.cidade);
      
      if (dadosFormulario.imagem instanceof File) {
          formData.append('image', dadosFormulario.imagem);
      }

      const config = {
          headers: { 'Content-Type': 'multipart/form-data' }
      };

      if (usuarioParaEditar) {
        await api.put(`/users/${usuarioParaEditar.id}`, formData, config);
        alert("Dados atualizados com sucesso!");
        navigate(`/usuario/${usuarioParaEditar.id}`);
      } else {
        await api.post('/users', formData, config);
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