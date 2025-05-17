import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { createClient } from '@supabase/supabase-js';
import { SupabaseContext } from './lib/supabaseContext';

const supabase = createClient('SUA_SUPABASE_URL', 'SUA_SUPABASE_ANON_KEY');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SupabaseContext.Provider value={supabase}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SupabaseContext.Provider>
  </React.StrictMode>
);