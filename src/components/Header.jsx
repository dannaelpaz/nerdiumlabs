import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-black border-b border-copper z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-purple-400 text-2xl font-bold">NerdiumLabs 3D</h1>
        <nav className="space-x-6 text-sm uppercase">
          <Link to="/" className="hover:text-purple-300">Início</Link>
          <Link to="/produtos" className="hover:text-purple-300">Produtos</Link>
          <Link to="/sobre" className="hover:text-purple-300">Sobre</Link>
          <Link to="/contato" className="hover:text-purple-300">Contato</Link>
        </nav>
      </div>
    </header>
  );
}