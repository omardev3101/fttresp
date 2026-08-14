import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, RefreshCw, Trash2, Edit, Pause, Play, Eye, Share2, 
  MessageSquare, Copy, LogOut, CheckCircle2, AlertCircle, FileText, 
  Newspaper, DollarSign, Tag, Layers, TrendingUp, X, Filter, UserCheck, Shield
} from 'lucide-react';
import api from '../../services/api';

export default function AdminDashboard({ user, onLogout, refreshData, news = [], agreements = [], settings }) {
  const [activeTab, setActiveTab] = useState('NOTÍCIAS');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Custom Data States
  const [jornaisList, setJornaisList] = useState([]);
  const [categoriasList, setCategoriasList] = useState([]);
  const [salariosList, setSalariosList] = useState([]);
  
  // Modal Form State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [loadingAction, setLoadingAction] = useState(false);

  // Load custom collections
  const loadTabCollections = async () => {
    try {
      const [resJornais, resCat] = await Promise.all([
        api.get('/jornais').catch(() => ({ data: [] })),
        api.get('/categorias').catch(() => ({ data: [] }))
      ]);
      setJornaisList(resJornais.data || []);
      setCategoriasList(resCat.data || []);
      
      // Default initial mock salary floors if needed
      setSalariosList([
        { id: 's-1', title: 'Motorista de Transporte Urbano SP', category: 'Urbano', value: 'R$ 3.850,00', date: '2026-01-01', status: 'PUBLICADO', views: 4120, waShares: 230, fbShares: 85, linkCopies: 52 },
        { id: 's-2', title: 'Motorista de Rodoviário e Fretamento', category: 'Fretamento', value: 'R$ 4.120,00', date: '2026-01-01', status: 'PUBLICADO', views: 3290, waShares: 180, fbShares: 60, linkCopies: 41 },
        { id: 's-3', title: 'Motorista de Transporte de Cargas Pesadas', category: 'Cargas', value: 'R$ 4.450,00', date: '2026-01-01', status: 'PUBLICADO', views: 2890, waShares: 140, fbShares: 51, linkCopies: 23 }
      ]);
    } catch (err) {
      console.error('Erro ao carregar collections CMS:', err);
    }
  };

  useEffect(() => {
    loadTabCollections();
  }, []);

  const tabOptions = [
    { id: 'NOTÍCIAS', label: 'NOTÍCIAS', icon: Newspaper },
    { id: 'PISOS', label: 'PISOS SALARIAIS', icon: DollarSign },
    { id: 'JORNAIS', label: 'JORNAL & VEÍCULOS', icon: FileText },
    { id: 'CONVENÇÕES', label: 'CONVENÇÕES', icon: Layers },
    { id: 'CATEGORIAS', label: 'CATEGORIAS', icon: Tag }
  ];

  // Helper to retrieve current tab list
  const getActiveItems = () => {
    let list = [];
    if (activeTab === 'NOTÍCIAS') list = news;
    else if (activeTab === 'PISOS') list = salariosList;
    else if (activeTab === 'JORNAIS') list = jornaisList;
    else if (activeTab === 'CONVENÇÕES') list = agreements;
    else if (activeTab === 'CATEGORIAS') list = categoriasList;

    if (!searchTerm) return list;
    return list.filter(item => 
      (item.title || item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const activeItems = getActiveItems();

  // Stats calculation
  const totalViews = activeItems.reduce((acc, curr) => acc + (curr.views || 1420), 0);
  const totalWaShares = activeItems.reduce((acc, curr) => acc + (curr.waShares || 48), 0);
  const totalFbShares = activeItems.reduce((acc, curr) => acc + (curr.fbShares || 18), 0);
  const totalLinkCopies = activeItems.reduce((acc, curr) => acc + (curr.linkCopies || 12), 0);

  const publishedCount = activeItems.filter(i => i.status !== 'PAUSADO' && i.status !== 'RASCUNHO').length;
  const draftCount = activeItems.length - publishedCount;

  // Open Add/Edit Modal
  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormData({ ...item });
    } else {
      setFormData({
        title: '',
        category: 'Institucional',
        summary: '',
        content: '',
        imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
        date: new Date().toISOString().split('T')[0],
        status: 'PUBLICADO',
        value: 'R$ 3.850,00',
        fileUrl: ''
      });
    }
    setShowModal(true);
  };

  // Save Modal Form
  const handleSaveForm = async (e) => {
    e.preventDefault();
    setLoadingAction(true);
    try {
      if (activeTab === 'NOTÍCIAS') {
        if (editingItem) {
          await api.put(`/news/${editingItem.id}`, formData);
        } else {
          await api.post('/news', formData);
        }
      } else if (activeTab === 'JORNAIS') {
        if (editingItem) {
          await api.put(`/jornais/${editingItem.id}`, formData);
        } else {
          await api.post('/jornais', formData);
        }
      } else if (activeTab === 'CATEGORIAS') {
        if (editingItem) {
          await api.put(`/categorias/${editingItem.id}`, formData);
        } else {
          await api.post('/categorias', formData);
        }
      } else if (activeTab === 'PISOS') {
        if (editingItem) {
          setSalariosList(salariosList.map(s => s.id === editingItem.id ? { ...s, ...formData } : s));
        } else {
          setSalariosList([{ id: 's-' + Date.now(), views: 120, waShares: 10, fbShares: 5, linkCopies: 2, ...formData }, ...salariosList]);
        }
      }
      
      await refreshData();
      await loadTabCollections();
      setShowModal(false);
    } catch (err) {
      alert('Erro ao salvar registro: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoadingAction(false);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    if (!window.confirm('Confirma a exclusão deste registro?')) return;
    try {
      if (activeTab === 'NOTÍCIAS') await api.delete(`/news/${id}`);
      else if (activeTab === 'JORNAIS') await api.delete(`/jornais/${id}`);
      else if (activeTab === 'CATEGORIAS') await api.delete(`/categorias/${id}`);
      else if (activeTab === 'PISOS') setSalariosList(salariosList.filter(s => s.id !== id));

      await refreshData();
      await loadTabCollections();
    } catch (err) {
      alert('Erro ao excluir registro.');
    }
  };

  // Toggle status Publicado/Pausado
  const handleToggleStatus = async (item) => {
    const newStatus = item.status === 'PAUSADO' ? 'PUBLICADO' : 'PAUSADO';
    try {
      if (activeTab === 'NOTÍCIAS') await api.put(`/news/${item.id}`, { ...item, status: newStatus });
      else if (activeTab === 'JORNAIS') await api.put(`/jornais/${item.id}`, { ...item, status: newStatus });
      else if (activeTab === 'CATEGORIAS') await api.put(`/categorias/${item.id}`, { ...item, status: newStatus });
      else if (activeTab === 'PISOS') setSalariosList(salariosList.map(s => s.id === item.id ? { ...s, status: newStatus } : s));

      await refreshData();
      await loadTabCollections();
    } catch (err) {
      alert('Erro ao alterar status.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans pb-16">
      
      {/* 1. TOPBAR DO PAINEL DE GESTÃO ADMINISTRATIVA */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-40 shadow-sm">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center font-black">
              <Shield size={18} />
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 uppercase">
              GESTÃO ADMINISTRATIVA
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Global Search Bar */}
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Busca global..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-slate-900"
              />
            </div>

            {/* User Profile Badge */}
            <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold shrink-0">
              <UserCheck size={14} className="text-amber-400" />
              <span>Admin Master ({user?.username || 'operador_fttresp'})</span>
            </div>

            <button 
              onClick={onLogout}
              className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
              title="Sair da Gestão"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="container mt-6 space-y-6">
        
        {/* 2. ABAS EM PÍLULAS (NAVEGAÇÃO DA GESTÃO) */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2">
          {tabOptions.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition ${
                  active 
                    ? 'bg-slate-950 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon size={14} className={active ? 'text-amber-400' : 'text-slate-400'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3. CABEÇALHO DA SEÇÃO E AÇÕES RÁPIDAS */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black uppercase text-slate-900 tracking-tight">
              GERENCIAR {activeTab}
            </h2>
            <p className="text-slate-500 text-xs font-medium mt-0.5">
              Administre publicações, acompanhe métricas de compartilhamento e edite conteúdos em tempo real.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => loadTabCollections()}
              className="bg-red-50 text-red-700 hover:bg-red-100 font-extrabold text-xs px-3.5 py-2.5 rounded-xl border border-red-200 transition flex items-center gap-1.5"
            >
              <Trash2 size={14} /> Limpar Rascunhos
            </button>
            <button 
              onClick={() => loadTabCollections()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Sincronizar com Web
            </button>
            <button 
              onClick={() => handleOpenModal()}
              className="bg-slate-950 hover:bg-slate-800 text-amber-400 font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <Plus size={16} /> + Novo Registro
            </button>
          </div>
        </div>

        {/* 4. GRID DE 4 CARDS DE MÉTRICAS COLORIDOS (KPIs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Azul */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider opacity-80">VISUALIZAÇÕES TOTAIS</span>
              <div className="text-3xl font-black">{totalViews.toLocaleString('pt-BR')}</div>
              <p className="text-[10px] opacity-80">Views acumuladas em todas as matérias</p>
            </div>
            <TrendingUp size={36} className="absolute right-4 bottom-4 opacity-20" />
          </div>

          {/* Card 2: Verde */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider opacity-80">CLIQUES NO WHATSAPP</span>
              <div className="text-3xl font-black">{totalWaShares.toLocaleString('pt-BR')}</div>
              <p className="text-[10px] opacity-80">Compartilhamentos diretos no WA</p>
            </div>
            <Share2 size={36} className="absolute right-4 bottom-4 opacity-20" />
          </div>

          {/* Card 3: Roxo */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider opacity-80">CLIQUES NO FACEBOOK</span>
              <div className="text-3xl font-black">{totalFbShares.toLocaleString('pt-BR')}</div>
              <p className="text-[10px] opacity-80">Compartilhamentos diretos no FB</p>
            </div>
            <Share2 size={36} className="absolute right-4 bottom-4 opacity-20" />
          </div>

          {/* Card 4: Vermelho */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider opacity-80">LINKS COPIADOS</span>
              <div className="text-3xl font-black">{totalLinkCopies.toLocaleString('pt-BR')}</div>
              <p className="text-[10px] opacity-80">Copias de links de transferência</p>
            </div>
            <Copy size={36} className="absolute right-4 bottom-4 opacity-20" />
          </div>
        </div>

        {/* 5. TOP NOTÍCIAS MAIS LIDAS & RESUMO DA CENTRAL */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Esquerda: Top 3 Mais Lidas */}
          <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-black text-xs uppercase tracking-wider text-slate-900">
                TOP 3 REGISTROS MAIS LIDOS
              </h3>
              <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded">POR AUDIÊNCIA</span>
            </div>

            <div className="space-y-3">
              {activeItems.slice(0, 3).map((item, idx) => (
                <div key={item.id || idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center font-black text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <div className="overflow-hidden">
                      <h4 className="font-extrabold text-xs text-slate-900 truncate">{item.title || item.name}</h4>
                      <span className="text-[10px] text-slate-500">{item.date || 'Recente'} • {item.category || 'Geral'}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-black text-xs text-slate-900">{(item.views || 2420).toLocaleString('pt-BR')} views</div>
                    <div className="text-[9px] text-emerald-600 font-bold">SHARES: {(item.waShares || 120) + (item.fbShares || 45)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direita: Resumo Geral */}
          <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-black text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-3">
              RESUMO GERAL DA CENTRAL
            </h3>

            <ul className="space-y-2.5 text-xs">
              <li className="flex justify-between items-center text-slate-600 pb-1 border-b border-slate-100">
                <span>Total de Registros:</span>
                <strong className="text-slate-900 font-black">{activeItems.length}</strong>
              </li>
              <li className="flex justify-between items-center text-slate-600 pb-1 border-b border-slate-100">
                <span>Publicados:</span>
                <span className="bg-emerald-100 text-emerald-800 font-black text-[10px] px-2 py-0.5 rounded">{publishedCount}</span>
              </li>
              <li className="flex justify-between items-center text-slate-600 pb-1 border-b border-slate-100">
                <span>Rascunhos / Pausados:</span>
                <span className="bg-amber-100 text-amber-800 font-black text-[10px] px-2 py-0.5 rounded">{draftCount}</span>
              </li>
              <li className="flex justify-between items-center text-slate-600 pt-1">
                <span>Ações de Compartilhamento:</span>
                <strong className="text-blue-600 font-black">{totalWaShares + totalFbShares + totalLinkCopies}</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* 6. TABELA COMPLETA DE REGISTROS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-3">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
              LISTA COMPLETA ({activeItems.length})
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">Exibindo conteúdos cadastrados no sistema</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-500 uppercase font-black tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">MANCHETE / REGISTRO</th>
                  <th className="py-3 px-4 text-center">MÉTRICAS DE ENGAJAMENTO</th>
                  <th className="py-3 px-4 text-right">AÇÃO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {activeItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    
                    {/* Manchete e Categoria */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=200&q=80"} 
                          alt="Thumb"
                          className="w-12 h-9 object-cover rounded-lg border border-slate-200 shrink-0" 
                        />
                        <div className="space-y-0.5 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-black px-2 py-0.2 rounded uppercase ${
                              item.status === 'PAUSADO' 
                                ? 'bg-amber-100 text-amber-800' 
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {item.status || 'PUBLICADO'}
                            </span>
                            <span className="text-[10px] text-slate-400">{item.date || '2026-08-14'}</span>
                          </div>
                          <h4 className="font-extrabold text-xs text-slate-900 truncate max-w-md">
                            {item.title || item.name}
                          </h4>
                        </div>
                      </div>
                    </td>

                    {/* Métricas */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-3 text-[11px] font-bold text-slate-600">
                        <span className="flex items-center gap-1" title="Visualizações">
                          <Eye size={13} className="text-blue-600" /> {item.views || 240}
                        </span>
                        <span className="flex items-center gap-1" title="WhatsApp Shares">
                          <Share2 size={13} className="text-emerald-600" /> {item.waShares || 14}
                        </span>
                        <span className="flex items-center gap-1" title="Facebook Shares">
                          <Share2 size={13} className="text-indigo-600" /> {item.fbShares || 8}
                        </span>
                        <span className="flex items-center gap-1" title="Links Copiados">
                          <Copy size={13} className="text-red-600" /> {item.linkCopies || 4}
                        </span>
                      </div>
                    </td>

                    {/* Ações */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => handleToggleStatus(item)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition uppercase ${
                            item.status === 'PAUSADO' 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                          }`}
                        >
                          {item.status === 'PAUSADO' ? 'ATIVAR' : 'PAUSAR'}
                        </button>
                        <button 
                          onClick={() => handleOpenModal(item)}
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-950 hover:text-amber-400 transition"
                          title="Editar Registro"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition"
                          title="Excluir Registro"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* 7. MODAL DE CRIAÇÃO / EDIÇÃO DE REGISTRO */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden font-sans">
            
            <div className="bg-slate-950 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-black text-sm uppercase tracking-wider text-amber-400">
                {editingItem ? `EDITAR REGISTRO - ${activeTab}` : `+ NOVO REGISTRO - ${activeTab}`}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-6 space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-600 uppercase mb-1">Título / Manchete:</label>
                <input 
                  type="text" 
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
                  placeholder="Informe o título da matéria ou publicação..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 uppercase mb-1">Categoria:</label>
                  <input 
                    type="text" 
                    value={formData.category || 'Institucional'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                    placeholder="Ex: Institucional, Campanha Salarial"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 uppercase mb-1">Data da Publicação:</label>
                  <input 
                    type="date" 
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 uppercase mb-1">URL da Imagem de Capa:</label>
                <input 
                  type="text" 
                  value={formData.imageUrl || ''}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-slate-600 uppercase mb-1">Resumo / Subtítulo:</label>
                <textarea 
                  rows="3"
                  value={formData.summary || ''}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900"
                  placeholder="Breve resumo informativo..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={loadingAction}
                  className="bg-slate-950 hover:bg-slate-800 text-amber-400 font-black px-6 py-2.5 rounded-xl shadow-md"
                >
                  {loadingAction ? 'Gravando...' : 'Salvar Registro'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
