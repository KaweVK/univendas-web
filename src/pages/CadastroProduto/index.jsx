import { Banner } from '../../componentes/Banner/index.jsx'
import { Formulario } from '../../componentes/Formulario/index.jsx'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import api from '../../services/api.js'
import { jwtDecode } from "jwt-decode";
import { useNavigate, useLocation } from 'react-router-dom'
import { NavBar } from '../../componentes/NavBar/index.jsx';

export const CadastroProduto = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const produtoParaEditar = location.state?.produtoParaEditar;

  const categorias = [
    'TECNOLOGIA', 'MOVEL', 'ELETRODOMESTICO', 'CELULAR',
    'COMPUTADOR', 'NOTEBOOK', 'PAPELARIA', 'COMIDA'
  ];

  const salvarProduto = async (produtoDoFormulario) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Você precisa estar logado!");
        navigate('/auth/login');
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.id;

      const formData = new FormData();
      formData.append('name', produtoDoFormulario.nome);
      formData.append('description', produtoDoFormulario.descricao);
      formData.append('amount', produtoDoFormulario.quantidade);
      formData.append('price', produtoDoFormulario.preco);
      formData.append('category', produtoDoFormulario.categoria);
      formData.append('soldById', userId);

      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };

      if (produtoParaEditar) {
        await api.put(`/shop/${produtoParaEditar.id}`, formData, config);
        alert("Produto atualizado com sucesso!");
      } else {
        await api.post('/shop', formData, config);
        alert("Produto cadastrado com sucesso!");
      }

      navigate("/produtos");

    } catch (error) {
      console.error("Erro completo:", error);
      if (error.response && error.response.data && error.response.data.fields) {
        const errosDoBackend = error.response.data.fields;
        const mensagens = errosDoBackend.map(e => `${e.field}: ${e.error}`).join("\n");
        alert(`Erro de validação:\n${mensagens}`);
      } else {
        alert("Erro ao salvar produto.");
      }
    }
  }

  return (
    <>
      <div>
        <NavBar />
        <Formulario
          aoCadastrarProduto={salvarProduto}
          categorias={categorias}
          produtoEdicao={produtoParaEditar}
        />
        <BarraRodape />
      </div>
    </>
  )
}