
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { PackageSearch, ShoppingCart, UserCircle, LogOut, Shield } from 'lucide-react'; 
import { Button } from '@/components/ui/button';

const Header = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/'); 
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="sticky top-0 z-50 bg-card/80 backdrop-blur-md shadow-lg"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="flex items-center space-x-2"
          >
            <PackageSearch size={40} className="text-primary" />
            <h1 className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
              Nerdium LABS 3D
            </h1>
          </motion.div>
        </Link>
        <nav className="flex items-center space-x-4 sm:space-x-6">
          <motion.a
            href="#" 
            whileHover={{ scale: 1.1, color: 'hsl(var(--accent))' }}
            className="text-foreground hover:text-accent transition-colors duration-300 flex items-center text-sm sm:text-base"
          >
            <ShoppingCart size={20} className="mr-1" />
            Carrinho
          </motion.a>
          
          {isAuthenticated ? (
            <>
              <Link to="/admin">
                <motion.div
                  whileHover={{ scale: 1.1, color: 'hsl(var(--accent))' }}
                  className="text-foreground hover:text-accent transition-colors duration-300 flex items-center text-sm sm:text-base"
                >
                  <Shield size={20} className="mr-1" />
                  Admin
                </motion.div>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogoutClick} className="text-foreground hover:text-accent transition-colors duration-300 flex items-center">
                <LogOut size={20} className="mr-1" />
                Sair
              </Button>
            </>
          ) : (
            <Link to="/login">
              <motion.div
                whileHover={{ scale: 1.1, color: 'hsl(var(--accent))' }}
                className="text-foreground hover:text-accent transition-colors duration-300 flex items-center text-sm sm:text-base"
              >
                <UserCircle size={20} className="mr-1" />
                Login
              </motion.div>
            </Link>
          )}
        </nav>
      </div>
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
    </motion.header>
  );
};

export default Header;
  