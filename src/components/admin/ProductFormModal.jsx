
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, XCircle, ListChecks } from 'lucide-react';

const ProductFormModal = ({ isOpen, onClose, productData: initialProductData, categories, onSubmit, isEditing }) => {
  const [productData, setProductData] = useState(initialProductData);

  useEffect(() => {
    setProductData(initialProductData);
  }, [initialProductData]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value),
    }));
  };

  const handleVariationChange = (vIndex, field, value) => {
    const updatedVariations = productData.variations ? [...productData.variations] : [];
    if (field === 'options') {
        updatedVariations[vIndex][field] = value.split(',').map(opt => opt.trim());
    } else {
        updatedVariations[vIndex][field] = value;
    }
    setProductData(prev => ({ ...prev, variations: updatedVariations }));
  };

  const addVariation = () => {
    setProductData(prev => ({
      ...prev,
      variations: [...(prev.variations || []), { name: '', type: 'size', options: [] }],
    }));
  };

  const removeVariation = (vIndex) => {
    setProductData(prev => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== vIndex),
    }));
  };

  const handleMarketplaceLinkChange = (mIndex, field, value) => {
    const updatedLinks = productData.marketplaceLinks ? [...productData.marketplaceLinks] : [];
    updatedLinks[mIndex][field] = value;
    setProductData(prev => ({ ...prev, marketplaceLinks: updatedLinks }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(productData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.7, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-card p-6 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto glassmorphism border-primary/50"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-heading text-primary-foreground">{isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
            <Button type="button" variant="ghost" size="icon" onClick={onClose} className="text-muted-foreground hover:text-accent">
              <XCircle size={24} />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-muted-foreground">Nome do Produto</Label>
              <Input id="name" name="name" value={productData.name} onChange={handleInputChange} className="bg-input border-border focus:border-primary" required />
            </div>
            <div>
              <Label htmlFor="description" className="text-muted-foreground">Descrição</Label>
              <Textarea id="description" name="description" value={productData.description} onChange={handleInputChange} className="bg-input border-border focus:border-primary" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price" className="text-muted-foreground">Preço (R$)</Label>
                <Input id="price" name="price" type="number" value={productData.price} onChange={handleInputChange} className="bg-input border-border focus:border-primary" required min="0.01" step="0.01"/>
              </div>
              <div>
                <Label htmlFor="category" className="text-muted-foreground">Categoria</Label>
                <Select name="category" value={productData.category} onValueChange={(value) => setProductData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="w-full bg-input border-border focus:ring-primary">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {categories.map(cat => <SelectItem key={cat.value} value={cat.value} className="hover:bg-primary/20">{cat.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="imageUrlPlaceholder" className="text-muted-foreground">Placeholder da Imagem (descrição para IA)</Label>
              <Input id="imageUrlPlaceholder" name="imageUrlPlaceholder" value={productData.imageUrlPlaceholder} onChange={handleInputChange} className="bg-input border-border focus:border-primary" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="isNew" name="isNew" checked={productData.isNew} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-primary rounded focus:ring-primary bg-input border-border"/>
              <Label htmlFor="isNew" className="text-muted-foreground">Marcar como Novo Produto?</Label>
            </div>

            <h3 className="text-lg font-semibold text-secondary-foreground mt-6 border-b border-border/50 pb-2 mb-3 flex items-center"><ListChecks size={20} className="mr-2 text-secondary"/>Variações do Produto</h3>
            {(productData.variations || []).map((variation, vIndex) => (
              <Card key={vIndex} className="p-3 mb-2 bg-muted/30 border-border/50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                  <Input placeholder="Nome da Variação (Ex: Cor)" value={variation.name} onChange={(e) => handleVariationChange(vIndex, 'name', e.target.value)} className="bg-input border-border focus:border-primary"/>
                  <Select value={variation.type} onValueChange={(value) => handleVariationChange(vIndex, 'type', value)}>
                     <SelectTrigger className="bg-input border-border focus:ring-primary"><SelectValue placeholder="Tipo"/></SelectTrigger>
                     <SelectContent className="bg-popover border-border">
                         <SelectItem value="size">Tamanho</SelectItem>
                         <SelectItem value="color">Cor</SelectItem>
                         <SelectItem value="material">Material</SelectItem>
                         <SelectItem value="other">Outro</SelectItem>
                     </SelectContent>
                  </Select>
                  <Input placeholder="Opções (Ex: P,M,G)" value={variation.options.join(', ')} onChange={(e) => handleVariationChange(vIndex, 'options', e.target.value)} className="bg-input border-border focus:border-primary"/>
                </div>
                <Button type="button" variant="destructive" size="sm" onClick={() => removeVariation(vIndex)} className="w-full sm:w-auto text-xs">Remover Variação</Button>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={addVariation} className="w-full text-secondary hover:border-secondary hover:text-secondary-foreground">Adicionar Variação</Button>

            <h3 className="text-lg font-semibold text-secondary-foreground mt-6 border-b border-border/50 pb-2 mb-3 flex items-center"><ListChecks size={20} className="mr-2 text-secondary"/>Links de Marketplace</h3>
            {(productData.marketplaceLinks || []).map((link, mIndex) => (
              <div key={mIndex} className="grid grid-cols-2 gap-2 mb-2">
                 <Input placeholder="Nome do Marketplace (Ex: Shopee)" value={link.name} onChange={(e) => handleMarketplaceLinkChange(mIndex, 'name', e.target.value)} className="bg-input border-border focus:border-primary"/>
                 <Input placeholder="URL do Produto" value={link.url} onChange={(e) => handleMarketplaceLinkChange(mIndex, 'url', e.target.value)} className="bg-input border-border focus:border-primary"/>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose} className="text-muted-foreground hover:border-primary hover:text-primary-foreground">
              <XCircle size={18} className="mr-2" /> Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Save size={18} className="mr-2" /> Salvar Produto
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ProductFormModal;
  