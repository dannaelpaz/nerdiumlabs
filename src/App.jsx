
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster.jsx';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ProductList from '@/components/ProductList.jsx';
import FilterSidebar from '@/components/FilterSidebar.jsx';
import AdminPanel from '@/components/admin/AdminPanel.jsx';
import LoginPage from '@/components/admin/LoginPage.jsx'; 
import ProtectedRoute from '@/components/admin/ProtectedRoute.jsx';
import { initialProducts, categories } from '@/data/products.jsx';
import { ShoppingCart, Zap } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('nerdiumProducts')) || initialProducts;
    setProducts(storedProducts);
    setFilteredProducts(storedProducts);
    
    const authStatus = localStorage.getItem('nerdiumAdminAuth') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    toast({
      title: "Filtro Aplicado!",
      description: `Exibindo produtos da categoria: ${categories.find(c => c.value === category)?.label || 'Todas'}`,
      className: "bg-secondary text-secondary-foreground border-accent",
    });
  };

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('nerdiumCart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('nerdiumCart', JSON.stringify(cart));

    toast({
      title: "Produto Adicionado!",
      description: `${product.name} foi adicionado ao seu carrinho.`,
      action: (
        <a href="#" onClick={(e) => { e.preventDefault(); console.log("Ir para o carrinho") }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs flex items-center"
          >
            <ShoppingCart size={16} className="mr-1.5" /> Ver Carrinho
          </motion.button>
        </a>
      ),
      className: "bg-primary/90 text-primary-foreground border-accent shadow-glow-primary",
    });
  };

  const handleLogin = (status) => {
    setIsAuthenticated(status);
    if (status) {
      localStorage.setItem('nerdiumAdminAuth', 'true');
      toast({ title: "Login bem-sucedido!", description: "Bem-vindo ao painel administrativo.", className: "bg-primary text-primary-foreground" });
    } else {
      localStorage.removeItem('nerdiumAdminAuth');
      toast({ title: "Logout realizado.", description: "Você foi desconectado.", className: "bg-muted text-muted-foreground" });
    }
  };
  
  const updateProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem('nerdiumProducts', JSON.stringify(updatedProducts));
    toast({ title: "Produtos Atualizados!", description: "A lista de produtos foi salva.", className: "bg-secondary text-secondary-foreground" });
  };


  const MainLayout = () => (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted dark">
      <Header isAuthenticated={isAuthenticated} onLogout={() => handleLogin(false)} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary mb-2">
                Nosso Arsenal Nerd
              </h1>
              <p className="text-lg text-muted-foreground flex items-center justify-center md:justify-start">
                <Zap size={20} className="mr-2 text-accent" /> Explore os itens mais incríveis do universo geek!
              </p>
            </motion.div>
            <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainLayout />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={() => handleLogin(true)} />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AdminPanel products={products} categories={categories} onUpdateProducts={updateProducts} />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </>
  );
}

export default App;
  