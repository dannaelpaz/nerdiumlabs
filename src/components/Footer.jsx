
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter, Shield } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Youtube, href: '#', label: 'YouTube' },
    { Icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-card/50 border-t border-border/50 py-8 text-center text-muted-foreground"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6 mb-6">
          {socialLinks.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.2, color: 'hsl(var(--accent))' }}
              whileTap={{ scale: 0.9 }}
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </div>
        <p className="text-sm">
          &copy; {currentYear} Nerdium LABS 3D. Todos os direitos reservados.
        </p>
        <p className="text-xs mt-1">
          Feito com <span className="text-accent animate-pulse">&hearts;</span> e impressoras 3D.
        </p>
        <div className="mt-4">
          <Link to="/login" className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center justify-center">
            <Shield size={12} className="mr-1" /> Acesso Administrativo
          </Link>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
  