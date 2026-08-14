import React, { useState } from 'react';
import { Lock, User, Key, ShieldCheck } from 'lucide-react';
import api from '../../services/api';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('fttresp_token', res.data.token);
      onLoginSuccess(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || 'Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center container py-12">
      <div className="bg-slate-900 text-white border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl gradient-gold text-slate-950 flex items-center justify-center font-black mx-auto shadow-xl">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-black">Painel Administrativo CMS</h2>
          <p className="text-slate-400 text-xs uppercase tracking-wider">Gestão do Portal FTTRESP 2026</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs font-semibold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="font-bold text-xs uppercase text-slate-400 block mb-1">Usuário Operador:</label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-3 text-slate-500" />
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-xs uppercase text-slate-400 block mb-1">Senha de Acesso:</label>
            <div className="relative">
              <Key size={18} className="absolute left-3.5 top-3 text-slate-500" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950 text-white border border-slate-800 focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full gradient-gold text-slate-950 font-black text-sm py-3.5 rounded-xl shadow-xl hover:scale-[1.02] transition"
          >
            {loading ? 'Autenticando...' : 'Entrar no Painel CMS'}
          </button>
        </form>

        <div className="text-[11px] text-slate-500 text-center border-t border-slate-800 pt-4">
          Usuário padrão pré-configurado: <strong>admin</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
}
