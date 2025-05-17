
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListFilter, Tag } from 'lucide-react';

const FilterSidebar = ({ categories, selectedCategory, onSelectCategory }) => {
  const sidebarVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.aside 
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="w-full md:w-64 lg:w-72"
    >
      <Card className="sticky top-24 glassmorphism border-primary/30">
        <CardHeader className="border-b border-border/50">
          <CardTitle className="text-xl font-heading flex items-center text-primary-foreground">
            <ListFilter size={22} className="mr-2 text-accent" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-3 text-secondary-foreground flex items-center">
            <Tag size={18} className="mr-2 text-secondary" />
            Categorias
          </h3>
          <motion.ul 
            className="space-y-2"
            variants={{ visible: { transition: { staggerChildren: 0.05 }}}}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category) => (
              <motion.li key={category.value} variants={itemVariants}>
                <Button
                  variant={selectedCategory === category.value ? 'default' : 'ghost'}
                  onClick={() => onSelectCategory(category.value)}
                  className={`w-full justify-start text-left transition-all duration-200 ease-in-out 
                              ${selectedCategory === category.value 
                                ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90' 
                                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
                >
                  {category.icon && <category.icon size={16} className="mr-2" />}
                  {category.label}
                </Button>
              </motion.li>
            ))}
          </motion.ul>
        </CardContent>
      </Card>
    </motion.aside>
  );
};

export default FilterSidebar;
  