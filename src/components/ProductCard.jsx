export default function ProductCard({ produto }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow p-4 hover:scale-105 transition">
      <img src={produto.imagem} alt={produto.nome} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-4 text-xl font-bold text-purple-300">{produto.nome}</h3>
      <p className="text-lg mt-1">{produto.preco}</p>
    </div>
  );
}