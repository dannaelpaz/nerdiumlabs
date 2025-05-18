import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { createClient } from '@supabase/supabase-js';
import { SupabaseContext } from './lib/supabaseContext';

const supabase = createClient('https://wgqjllmpecgakvmhvqye.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndncWpsbG1wZWNnYWt2bWh2cXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0OTU4MTYsImV4cCI6MjA2MzA3MTgxNn0.-aCVHRXwfW7VrxVHgcYprbfD0Rq-rtdTy1Eqo8kAmew');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SupabaseContext.Provider value={supabase}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SupabaseContext.Provider>
  </React.StrictMode>
);