
import React from 'react'; // Required for JSX in icons
import { Dices, Home, Shirt, Wand2, ShieldCheck, Gem } from 'lucide-react'; // Example icons

export const categories = [
  { value: 'all', label: 'Todas as Categorias', icon: Gem },
  { value: 'geek', label: 'Artigos Geek', icon: Dices },
  { value: 'nerd', label: 'Cultura Nerd', icon: Wand2 },
  { value: 'props', label: 'Props & Cosplay', icon: Shirt },
  { value: 'home-decor', label: 'Decoração Geek', icon: Home },
  { value: 'action-figures', label: 'Action Figures', icon: ShieldCheck },
];

export const initialProducts = [
  {
    id: 'prod_001',
    name: 'Action Figure Mestre Yoda',
    description: 'Réplica detalhada do Mestre Yoda em resina de alta qualidade, pintada à mão. Perfeito para colecionadores.',
    price: 149.90,
    category: 'action-figures',
    imageUrlPlaceholder: 'Action figure Mestre Yoda em pose clássica',
    isNew: true,
    variations: [
      { name: 'Tamanho', type: 'size', options: ['Padrão (15cm)', 'Grande (25cm)'] },
    ],
    marketplaceLinks: [
      { name: 'Shopee', url: '#' },
      { name: 'TikTok Shop', url: '#' },
      { name: 'Nuvemshop', url: '#' },
    ],
  },
  {
    id: 'prod_002',
    name: 'Capacete Mandaloriano (Escala 1:1)',
    description: 'Capacete do Mandaloriano em escala real, ideal para cosplay ou decoração. Interior acolchoado.',
    price: 499.50,
    category: 'props',
    imageUrlPlaceholder: 'Capacete Mandaloriano detalhado com visor escuro',
    isNew: false,
    variations: [
      { name: 'Acabamento', type: 'color', options: ['Prata Clássico', 'Beskar Weathered'] },
    ],
    marketplaceLinks: [
      { name: 'Shopee', url: '#' },
      { name: 'Nuvemshop', url: '#' },
    ],
  },
  {
    id: 'prod_003',
    name: 'Luminária Cubo de Interrogação Mario',
    description: 'Luminária temática do Cubo de Interrogação do Super Mario. Toque para acender e ouvir o som clássico!',
    price: 89.90,
    category: 'home-decor',
    imageUrlPlaceholder: 'Luminária em formato de Cubo de Interrogação do Mario Bros',
    isNew: true,
    marketplaceLinks: [
      { name: 'TikTok Shop', url: '#' },
    ],
  },
  {
    id: 'prod_004',
    name: 'Conjunto de Dados RPG Translúcidos',
    description: 'Set com 7 dados poliédricos para RPG, feitos em resina translúcida com glitter cósmico.',
    price: 65.00,
    category: 'geek',
    imageUrlPlaceholder: 'Conjunto de dados de RPG coloridos e translúcidos',
    isNew: false,
    variations: [
      { name: 'Cor Predominante', type: 'color', options: ['Nebulosa Púrpura', 'Galáxia Azul', 'Cometa Verde'] },
    ],
    marketplaceLinks: [
      { name: 'Shopee', url: '#' },
      { name: 'Nuvemshop', url: '#' },
    ],
  },
  {
    id: 'prod_005',
    name: 'Varinha Harry Potter (Réplica Oficial)',
    description: 'Réplica oficial da varinha do Harry Potter, acompanha caixa de colecionador Olivaras.',
    price: 220.00,
    category: 'nerd',
    imageUrlPlaceholder: 'Réplica da varinha de Harry Potter em sua caixa',
    isNew: false,
    marketplaceLinks: [
      { name: 'Shopee', url: '#' },
      { name: 'TikTok Shop', url: '#' },
      { name: 'Nuvemshop', url: '#' },
    ],
  },
  {
    id: 'prod_006',
    name: 'Placa Decorativa "Welcome to the Dark Side"',
    description: 'Placa de metal estilizada com a frase "Welcome to the Dark Side" e capacete do Darth Vader.',
    price: 75.00,
    category: 'home-decor',
    imageUrlPlaceholder: 'Placa decorativa Star Wars "Welcome to the Dark Side"',
    isNew: true,
    marketplaceLinks: [
      { name: 'Nuvemshop', url: '#' },
    ],
  },
  {
    id: 'prod_007',
    name: 'Chaveiro Baby Groot Dançante',
    description: 'Chaveiro adorável do Baby Groot em sua pose clássica de dança. Feito em PVC resistente.',
    price: 29.99,
    category: 'geek',
    imageUrlPlaceholder: 'Chaveiro do Baby Groot dançando',
    isNew: false,
    marketplaceLinks: [
      { name: 'Shopee', url: '#' },
      { name: 'TikTok Shop', url: '#' },
    ],
  },
  {
    id: 'prod_008',
    name: 'Escudo Capitão América (Metal)',
    description: 'Réplica em metal do escudo do Capitão América, com pintura automotiva e alças de couro. Ideal para cosplay ou exibição.',
    price: 799.00,
    category: 'props',
    imageUrlPlaceholder: 'Escudo do Capitão América em metal brilhante',
    isNew: true,
    variations: [
      { name: 'Versão', type: 'size', options: ['Clássico (Filmes)', 'HQ (Anos 80)'] },
    ],
    marketplaceLinks: [
      { name: 'Shopee', url: '#' },
      { name: 'Nuvemshop', url: '#' },
    ],
  }
];
  