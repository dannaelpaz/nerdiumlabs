
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, ExternalLink, Zap, Palette, Ruler } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  const [selectedVariation, setSelectedVariation] = useState(product.variations && product.variations.length > 0 ? product.variations[0].options[0] : null);

  const handleVariationChange = (value) => {
    setSelectedVariation(value);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.2), 0 0 15px 2px hsl(var(--primary) / 0.4)" }
  };

  const getMarketplaceIcon = (name) => {
    const commonClass = "w-4 h-4 mr-1.5 object-contain"; 
    if (name.toLowerCase().includes('shopee')) return <img  alt="Shopee Logo" class={commonClass} src="https://images.unsplash.com/photo-1542744095-291d1f67b221" />;
    if (name.toLowerCase().includes('tik tok') || name.toLowerCase().includes('tiktok')) return <img  alt="TikTok Shop Logo" class={commonClass} src="https://images.unsplash.com/photo-1594321120022-7649850959bb" />;
    if (name.toLowerCase().includes('nuvem') || name.toLowerCase().includes('nuvemshop')) return <img  alt="Nuvemshop Logo" class={commonClass} src="https://images.unsplash.com/photo-1667984390553-7f439e6ae401" />;
    return <ExternalLink size={14} className="mr-1.5" />;
  };
  

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
      <Card className="overflow-hidden h-full flex flex-col glassmorphism border-primary/30 hover:border-primary/70 transition-all duration-300 group">
        <CardHeader className="p-0 relative">
          <div className="aspect-square w-full overflow-hidden">
            <img 
              alt={product.name}
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
             src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
          </div>
          {product.isNew && (
            <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 text-xs font-semibold rounded-full flex items-center shadow-md">
              <Zap size={14} className="mr-1" /> NOVO
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-xl font-heading mb-1 text-primary-foreground">{product.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mb-3 h-16 overflow-y-auto">
            {product.description}
          </CardDescription>
          
          {product.variations && product.variations.length > 0 && (
            <div className="mb-3">
              {product.variations.map((variation, index) => (
                <div key={index} className="mb-2">
                  <label className="text-xs font-medium text-muted-foreground flex items-center mb-1">
                    {variation.type === 'color' && <Palette size={14} className="mr-1 text-secondary" />}
                    {variation.type === 'size' && <Ruler size={14} className="mr-1 text-secondary" />}
                    {variation.name}:
                  </label>
                  <Select onValueChange={handleVariationChange} defaultValue={variation.options[0]}>
                    <SelectTrigger className="w-full bg-background/70 border-border hover:border-primary/50 focus:ring-primary">
                      <SelectValue placeholder={`Selecione ${variation.name.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      {variation.options.map((option, optIndex) => (
                        <SelectItem key={optIndex} value={option} className="hover:bg-primary/20 focus:bg-primary/30">
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          )}

          <p className="text-2xl font-bold text-accent mb-3">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-col space-y-2">
          <Button 
            onClick={() => onAddToCart(product)} 
            className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow-primary text-primary-foreground font-semibold"
            size="lg"
          >
            <ShoppingCart size={18} className="mr-2" /> Adicionar ao Carrinho
          </Button>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
            {product.marketplaceLinks.map((link, index) => (
              <Button key={index} variant="outline" size="sm" className="w-full border-secondary/50 hover:bg-secondary/10 hover:border-secondary text-secondary-foreground flex items-center justify-center px-2 py-1 h-auto text-xs" asChild>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full">
                  {getMarketplaceIcon(link.name)}
                  <span className="truncate">{link.name}</span>
                </a>
              </Button>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
  