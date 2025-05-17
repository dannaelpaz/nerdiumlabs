
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card.jsx';
import { PlusCircle, Edit, Trash2, PackageOpen } from 'lucide-react';
import ProductFormModal from '@/components/admin/ProductFormModal.jsx';
import { useToast } from '@/components/ui/use-toast';

const AdminPanel = ({ products: initialProductsData, categories, onUpdateProducts }) => {
  const [products, setProducts] = useState(initialProductsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const openModalForNew = () => {
    setCurrentProduct({
      id: `prod_${Date.now()}`,
      name: '',
      description: '',
      price: 0,
      category: categories[0]?.value || '',
      imageUrlPlaceholder: '',
      isNew: true,
      variations: [],
      marketplaceLinks: [
        { name: 'Shopee', url: '' },
        { name: 'TikTok Shop', url: '' },
        { name: 'Nuvemshop', url: '' }
      ],
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const openModalForEdit = (product) => {
    setCurrentProduct(JSON.parse(JSON.stringify(product)));
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleSubmitProduct = (productData) => {
    if (!productData.name || productData.price <= 0) {
      toast({ title: "Erro de Validação", description: "Nome e preço são obrigatórios. Preço deve ser maior que zero.", variant: "destructive"});
      return;
    }
    let updatedProducts;
    if (isEditing) {
      updatedProducts = products.map(p => p.id === productData.id ? productData : p);
    } else {
      updatedProducts = [...products, productData];
    }
    setProducts(updatedProducts);
    onUpdateProducts(updatedProducts);
    toast({ title: `Produto ${isEditing ? 'Atualizado' : 'Adicionado'}!`, description: `${productData.name} foi salvo com sucesso.`, className: "bg-primary text-primary-foreground" });
    closeModal();
  };

  const handleDelete = (productId) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      onUpdateProducts(updatedProducts);
      toast({ title: "Produto Excluído!", description: "O produto foi removido.", variant: "destructive" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-background to-muted dark">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-between items-center"
      >
        <h1 className="text-3xl font-heading font-bold text-primary-foreground">Painel Administrativo</h1>
        <Button onClick={openModalForNew} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <PlusCircle size={20} className="mr-2" /> Adicionar Produto
        </Button>
      </motion.div>

      {products.length === 0 ? (
         <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10 bg-card/50 p-8 rounded-lg shadow-xl flex flex-col items-center glassmorphism"
        >
          <PackageOpen size={64} className="text-primary mb-4" />
          <p className="text-2xl text-primary-foreground font-semibold mb-2">Nenhum produto cadastrado ainda.</p>
          <p className="text-md text-muted-foreground mb-6">Clique em "Adicionar Produto" para começar a montar seu catálogo!</p>
          <Button onClick={openModalForNew} size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-glow-primary text-primary-foreground font-semibold">
            <PlusCircle size={22} className="mr-2" /> Criar Primeiro Produto
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <motion.div key={product.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
              <Card className="glassmorphism border-primary/30">
                <CardHeader>
                  <CardTitle className="text-primary-foreground">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-accent text-lg font-semibold">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                  <p className="text-muted-foreground text-sm capitalize">{categories.find(c => c.value === product.category)?.label || product.category}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={() => openModalForEdit(product)} className="text-secondary hover:border-secondary hover:text-secondary-foreground">
                    <Edit size={16} className="mr-1" /> Editar
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                    <Trash2 size={16} className="mr-1" /> Excluir
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {isModalOpen && currentProduct && (
        <ProductFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          productData={currentProduct}
          categories={categories}
          onSubmit={handleSubmitProduct}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default AdminPanel;
  