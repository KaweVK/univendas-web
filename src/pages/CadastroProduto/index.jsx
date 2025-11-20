import { useState } from 'react'
import Banner from '../../componentes/Banner/'
import Formulario from '../../componentes/Formulario'
import Categoria from '../../componentes/Categoria'
import BarraRodape from '../../componentes/BarraRodape'

function CadastroProduto() {
  const categorias = [
    {
      nome: 'Móvel',
      corPrimaria: '#57C278',
      corSecundaria: '#9efbcfff'
    },
    {
      nome: 'Celular',
      corPrimaria: '#82CFFA',
      corSecundaria: '#c5edfeff'
    },
    {
      nome: 'Eletrodoméstico',
      corPrimaria: '#A6D157',
      corSecundaria: '#e7f9c7ff'
    },
    {
      nome: 'Tecnologia',
      corPrimaria: '#E06B69',
      corSecundaria: '#fed0d2ff'
    },
    {
      nome: 'Computador',
      corPrimaria: '#DB6EBF',
      corSecundaria: '#f8d3edff'
    },
    {
      nome: 'Notebook',
      corPrimaria: '#FFBA05',
      corSecundaria: '#ffedbbff'
    },
    {
      nome: 'Papelaria',
      corPrimaria: '#FF8A29',
      corSecundaria: '#fddbbdff'
    },
    {
      nome: 'Comida',
      corPrimaria: '#d17a2fff',
      corSecundaria: '#fdcca2ff'
    }
  ]

  const [produtos, setProdutos] = useState([])

  const aoNovoProdutoAdicionado = (produto) => {
    setProdutos([...produtos, produto]) //espalha os produtos ja existentes (...produtos) e adiciona o novo
  }

  return (
    <>
      <div>
        <Banner />
        <Formulario aoCadastrarProduto={produto => aoNovoProdutoAdicionado(produto)} categorias={categorias.map(categoria => categoria.nome)} />

        {categorias.map(categoria => <Categoria
          key={categoria.nome}
          nome={categoria.nome}
          corPrimaria={categoria.corPrimaria}
          corSecundaria={categoria.corSecundaria}
          produtos={produtos.filter(produto => produto.categoria === categoria.nome)}
        />)}
        <BarraRodape />
      </div>
    </>
  )
}

export default CadastroProduto
