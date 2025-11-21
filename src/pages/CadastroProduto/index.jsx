import { Banner } from '../../componentes/Banner/index.jsx'
import { Formulario } from '../../componentes/Formulario/index.jsx'
import { BarraRodape } from '../../componentes/BarraRodape/index.jsx'
import api from '../../services/api.js'
import { jwtDecode } from "jwt-decode"; 
import { useNavigate, useLocation } from 'react-router-dom' // <--- Importe useLocation

export const CadastroProduto = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para pegar os dados da navegação
  
  // Verifica se existe um produto passado pelo state do Link
  const produtoParaEditar = location.state?.produtoParaEditar;

  const categorias = [
    'TECNOLOGIA', 'MOVEL', 'ELETRODOMESTICO', 'CELULAR', 
    'COMPUTADOR', 'NOTEBOOK', 'PAPELARIA', 'COMIDA'
  ];

  const salvarProduto = async (produtoDoFormulario) => {
    try {
        const token = localStorage.getItem('token');
        if(!token) {
            alert("Você precisa estar logado!");
            navigate('/auth/login');
            return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.id;

        const payload = {
            name: produtoDoFormulario.nome,
            description: produtoDoFormulario.descricao,
            amount: parseInt(produtoDoFormulario.quantidade),
            price: parseFloat(produtoDoFormulario.preco),
            imageUrl: produtoDoFormulario.imagem,
            category: produtoDoFormulario.categoria, // Já deve vir em maiúsculo do form
            soldById: userId
        };

        if (produtoParaEditar) {
            // --- MODO EDIÇÃO (PUT) ---
            // Passamos o ID na URL
            await api.put(`/shop/${produtoParaEditar.id}`, payload);
            alert("Produto atualizado com sucesso!");
        } else {
            // --- MODO CRIAÇÃO (POST) ---
            await api.post('/shop', payload);
            alert("Produto cadastrado com sucesso!");
        }

        navigate('/'); 

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
        <Banner />
        <Formulario 
            aoCadastrarProduto={salvarProduto} 
            categorias={categorias}
            produtoEdicao={produtoParaEditar} // <--- Passamos o produto para o formulário
        />
        <BarraRodape />
      </div>
    </>
  )
}