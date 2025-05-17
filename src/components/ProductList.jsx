import ProductCard from './ProductCard';

const produtos = [
  {
    id: 1,
    nome: 'Forja Mística de Dados',
    preco: 'R$ 89,90',
    imagem: '/assets/forja.jpg'
  },
  {
    id: 2,
    nome: 'Torre de Dados com Dragão',
    preco: 'R$ 149,90',
    imagem: '/assets/torre.jpg'
  },
  {
    id: 3,
    nome: 'Separador Gandalf',
    preco: 'R$ 49,90',
    imagem: '/assets/gandalf.jpg'
  }
];

export default function ProductList() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {produtos.map(produto => (
        <ProductCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
}