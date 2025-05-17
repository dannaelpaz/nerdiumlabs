import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre';
import Produto from './pages/Produto';
import Admin from './pages/Admin';
import Header from './components/Header';
import Footer from './components/Footer';
import { useContext, useEffect, useState } from 'react';
import { SupabaseContext } from './lib/supabaseContext';

const ADMIN_EMAIL = 'admin@nerdiumlabs.com';

export default function App() {
  const supabase = useContext(SupabaseContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user || null));
  }, []);

  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <div className="bg-black text-white min-h-screen">
      <Header user={user} supabase={supabase} />
      <main className="pt-20 pb-16 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/:id" element={<Produto />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}