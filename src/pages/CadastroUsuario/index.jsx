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
      <main className="relative isolate overflow-hidden bg-[#f7eff8]">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(107,46,116,0.14),transparent)]"
        />
        <div
          aria-hidden="true"
          className="absolute left-[8%] top-24 h-64 w-64 rounded-full bg-fuchsia-200/60 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute right-[6%] top-1/3 h-72 w-72 rounded-full bg-violet-200/60 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/80 blur-3xl"
        />

        <section className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid overflow-hidden rounded-[32px] border border-white/60 bg-white/55 shadow-[0_32px_90px_-34px_rgba(62,16,68,0.45)] backdrop-blur-xl lg:grid-cols-[1.08fr_0.92fr]">
            <Banner />

            <div className="p-4 sm:p-6 lg:p-8">
              <FormularioCadastroUsuario
                aoCadastrarUsuario={gerenciarUsuario}
                href={usuarioParaEditar ? `/usuario/${usuarioParaEditar.id}` : "/auth/login"}
                usuarioEdicao={usuarioParaEditar}
              />
            </div>
          </div>
        </section>
      </main>
      <BarraRodape />
    </>
  )
}