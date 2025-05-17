
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx'; 
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { LogIn, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (username === 'admin' && password === 'admin3D') { 
      onLoginSuccess();
      navigate('/admin');
    } else {
      setError('Nome de usuário ou senha inválidos.');
      toast({
        title: "Falha no Login",
        description: "Nome de usuário ou senha inválidos. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4 dark">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <Card className="w-full max-w-md glassmorphism border-primary/50 shadow-2xl">
          <CardHeader className="text-center">
            <motion.div 
              className="mx-auto mb-4 p-3 bg-primary/20 rounded-full inline-block"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1]}}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut"}}
            >
              <ShieldCheck size={48} className="text-primary" />
            </motion.div>
            <CardTitle className="text-3xl font-heading text-primary-foreground">Acesso Restrito</CardTitle>
            <CardDescription className="text-muted-foreground">
              Entre com suas credenciais de administrador.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-muted-foreground">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="seu_usuario_admin"
                  className="bg-input border-border focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-muted-foreground">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-input border-border focus:border-primary focus:ring-primary"
                  required
                />
              </div>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive flex items-center bg-destructive/10 p-2 rounded-md"
                >
                  <AlertTriangle size={16} className="mr-2" />
                  {error}
                </motion.p>
              )}
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow-primary text-primary-foreground font-semibold" size="lg">
                <LogIn size={20} className="mr-2" /> Entrar
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-xs text-muted-foreground">
              Este é um painel de administração. Apenas pessoal autorizado.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
  