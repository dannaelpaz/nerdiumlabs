import ProductList from '../components/ProductList';

export default function Produtos() {
  return (
    <section>
      <h2 className="text-3xl font-semibold text-purple-400 mb-6">Catálogo de Produtos</h2>
      <ProductList />
    </section>
  );
}