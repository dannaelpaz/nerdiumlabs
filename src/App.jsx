import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-20 pb-16 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}