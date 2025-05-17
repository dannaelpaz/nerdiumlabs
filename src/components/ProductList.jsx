
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';

const ProductList = ({ products, onAddToCart }) => {
  if (!products || products.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-10"
      >
        <p className="text-2xl text-muted-foreground font-semibold">Nenhum produto encontrado.</p>
        <p className="text-md text-muted-foreground">Tente ajustar seus filtros ou volte mais tarde!</p>
      </motion.div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <AnimatePresence>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductList;
  