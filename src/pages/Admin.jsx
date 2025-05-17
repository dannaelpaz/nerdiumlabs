import { useContext, useEffect, useState } from 'react';
import { SupabaseContext } from '../lib/supabaseContext';

export default function Admin() {
  const supabase = useContext(SupabaseContext);
  const [produtos, setProdutos] = useState([]);

  const fetchProdutos = async () => {
    const { data } = await supabase.from('produtos').select('*');
    setProdutos(data);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleChange = (id, field, value) => {
    setProdutos(prev =>
      prev.map(p => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSave = async (produto) => {
    await supabase.from('produtos').update(produto).eq('id', produto.id);
    alert('Produto atualizado com sucesso!');
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-purple-400 mb-6">Painel Administrativo</h2>
      <ul className="space-y-6">
        {produtos.map(prod => (
          <li key={prod.id} className="border border-copper rounded p-4 space-y-2">
            <input className="w-full bg-gray-800 p-2 rounded" value={prod.nome} onChange={e => handleChange(prod.id, 'nome', e.target.value)} />
            <textarea className="w-full bg-gray-800 p-2 rounded" value={prod.descricao} onChange={e => handleChange(prod.id, 'descricao', e.target.value)} />
            <input className="w-full bg-gray-800 p-2 rounded" value={prod.preco} onChange={e => handleChange(prod.id, 'preco', e.target.value)} />
            <input className="w-full bg-gray-800 p-2 rounded" value={prod.link_compra} onChange={e => handleChange(prod.id, 'link_compra', e.target.value)} />
            <button onClick={() => handleSave(prod)} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded mt-2">Salvar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}