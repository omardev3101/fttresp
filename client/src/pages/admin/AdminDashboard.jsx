import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, RefreshCw, Trash2, Edit, Pause, Play, Eye, Share2, 
  MessageSquare, Copy, LogOut, CheckCircle2, AlertCircle, FileText, 
  Newspaper, DollarSign, Tag, Layers, TrendingUp, X, Filter, UserCheck, Shield, Upload, Link as LinkIcon, Settings, Globe, Phone, Mail, MapPin, Save,
  Tv, Clock, Type, Megaphone, Monitor, Radio, Activity
} from 'lucide-react';
import api from '../../services/api';
import TvManagementTab from './TvManagementTab';
import SiteSettingsTab from './SiteSettingsTab';

export default function AdminDashboard({ user, onLogout, refreshData, news = [], agreements = [], tvChannels = [], tvSchedules = [], settings: initialSettings }) {
  const [activeTab, setActiveTab] = useState('NOTÍCIAS');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Custom Data States
  const [jornaisList, setJornaisList] = useState([]);
  const [categoriasList, setCategoriasList] = useState([]);
  const [salariosList, setSalariosList] = useState([]);
  const [channelsList, setChannelsList] = useState(tvChannels || []);
  const [schedulesList, setSchedulesList] = useState(tvSchedules || []);

  // TV Management Sub-Tab
  const [tvSubTab, setTvSubTab] = useState('CONTEUDO'); // 'METRICAS' | 'CONTEUDO' | 'GRADE' | 'LETREIROS' | 'PATROCINIOS' | 'TERMINAIS'
  
  // Site Settings Form State
  const [siteSettings, setSiteSettings] = useState(initialSettings || {});
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);
  const [siteLogoMode, setSiteLogoMode] = useState('file');
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Modal Form State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [uploadMode, setUploadMode] = useState('file'); // 'file' | 'link'
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    if (initialSettings) setSiteSettings(initialSettings);
  }, [initialSettings]);

  useEffect(() => {
    if (tvChannels) setChannelsList(tvChannels);
  }, [tvChannels]);

  // Load custom collections
  const loadTabCollections = async () => {
    try {
      const [resJornais, resCat, resSet, resTv] = await Promise.all([
        api.get('/jornais').catch(() => ({ data: [] })),
        api.get('/categorias').catch(() => ({ data: [] })),
        api.get('/settings').catch(() => ({ data: {} })),
        api.get('/tv/channels').catch(() => ({ data: [] }))
      ]);
      setJornaisList(resJornais.data || []);
      setCategoriasList(resCat.data || []);
      if (resSet.data) setSiteSettings(resSet.data);
      if (resTv.data) setChannelsList(resTv.data);
      
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
    { id: 'TVS', label: 'GESTÃO DE TV', icon: Tv },
    { id: 'CONVENÇÕES', label: 'CONVENÇÕES', icon: Layers },
    { id: 'CATEGORIAS', label: 'CATEGORIAS', icon: Tag },
    { id: 'SITE', label: 'GESTÃO DO SITE', icon: Globe }
  ];

  const getActiveItems = () => {
    let list = [];
    if (activeTab === 'NOTÍCIAS') list = news;
    else if (activeTab === 'PISOS') list = salariosList;
    else if (activeTab === 'JORNAIS') list = jornaisList;
    else if (activeTab === 'TVS') list = channelsList;
    else if (activeTab === 'CONVENÇÕES') list = agreements;
    else if (activeTab === 'CATEGORIAS') list = categoriasList;

    if (!searchTerm) return list;
    return list.filter(item => 
      (item.title || item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const activeItems = getActiveItems();

  const totalViews = activeItems.reduce((acc, curr) => acc + (curr.views || 1420), 0);
  const totalWaShares = activeItems.reduce((acc, curr) => acc + (curr.waShares || 48), 0);
  const totalFbShares = activeItems.reduce((acc, curr) => acc + (curr.fbShares || 18), 0);
  const totalLinkCopies = activeItems.reduce((acc, curr) => acc + (curr.linkCopies || 12), 0);

  // Open Add/Edit Modal
  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    setUploadedUrl(item?.imageUrl || item?.fileUrl || item?.defaultVideoUrl || '');
    setUploadMode('file');
    if (item) {
      setFormData({ ...item });
    } else {
      if (activeTab === 'TVS') {
        setFormData({
          name: '',
          category: 'Jornalismo',
          defaultVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          currentShow: 'Jornal Rodoviário de SP',
          badge: 'AO VIVO',
          showOnHome: true,
          status: 'PUBLICADO'
        });
      } else {
        setFormData({
          title: '',
          category: 'Institucional',
          summary: '',
          content: '',
          imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
          fileUrl: '',
          date: new Date().toISOString().split('T')[0],
          status: 'PUBLICADO',
          value: 'R$ 3.850,00'
        });
      }
    }
    setShowModal(true);
  };

  // Upload Local File to Express Server
  const handleFileUpload = async (e, targetField = 'imageUrl') => {
    const file = e.target.files[0];
    if (!file) return;

    if (targetField === 'logoUrl' || targetField === 'presidentPhotoUrl') setUploadingLogo(true);
    else setUploadingFile(true);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result;
        const res = await api.post('/upload', {
          fileName: file.name,
          fileData: base64Data
        });
        const url = res.data.url;
        
        if (targetField === 'logoUrl') {
          const updated = { ...siteSettings, logoUrl: url };
          setSiteSettings(updated);
          await api.put('/settings', updated).catch(() => {});
          await refreshData();
          setUploadingLogo(false);
        } else if (targetField === 'presidentPhotoUrl') {
          const updated = { ...siteSettings, presidentPhotoUrl: url };
          setSiteSettings(updated);
          await api.put('/settings', updated).catch(() => {});
          await refreshData();
          setUploadingLogo(false);
        } else {
          setUploadedUrl(url);
          setFormData(prev => ({ ...prev, imageUrl: url, fileUrl: url, defaultVideoUrl: url }));
          setUploadingFile(false);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      alert('Erro ao enviar arquivo: ' + err.message);
      setUploadingFile(false);
      setUploadingLogo(false);
    }
  };

  // Save Global Site Settings
  const handleSaveSiteSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await api.put('/settings', siteSettings);
      await refreshData();
      setSettingsSavedSuccess(true);
      setTimeout(() => setSettingsSavedSuccess(false), 4000);
    } catch (err) {
      alert('Erro ao salvar configurações do site.');
    } finally {
      setSavingSettings(false);
    }
  };

  // Toggle Transmit on Home for TV Channel
  const handleToggleHomeTransmit = async (channel) => {
    const newShowOnHome = channel.showOnHome === false ? true : false;
    try {
      await api.put(`/tv/channels/${channel.id}`, { ...channel, showOnHome: newShowOnHome });
      await refreshData();
      await loadTabCollections();
    } catch (err) {
      alert('Erro ao alterar transmissão na Home.');
    }
  };

  // Save Modal Form
  const handleSaveForm = async (e) => {
    e.preventDefault();
    setLoadingAction(true);
    try {
      if (activeTab === 'NOTÍCIAS') {
        if (editingItem) await api.put(`/news/${editingItem.id}`, formData);
        else await api.post('/news', formData);
      } else if (activeTab === 'JORNAIS') {
        if (editingItem) await api.put(`/jornais/${editingItem.id}`, formData);
        else await api.post('/jornais', formData);
      } else if (activeTab === 'TVS') {
        if (editingItem) await api.put(`/tv/channels/${editingItem.id}`, formData);
        else await api.post('/tv/channels', formData);
      } else if (activeTab === 'CATEGORIAS') {
        if (editingItem) await api.put(`/categorias/${editingItem.id}`, formData);
        else await api.post('/categorias', formData);
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

  const handleDelete = async (id) => {
    if (!window.confirm('Confirma a exclusão deste registro?')) return;
    try {
      if (activeTab === 'NOTÍCIAS') await api.delete(`/news/${id}`);
      else if (activeTab === 'JORNAIS') await api.delete(`/jornais/${id}`);
      else if (activeTab === 'TVS') await api.delete(`/tv/channels/${id}`);
      else if (activeTab === 'CATEGORIAS') await api.delete(`/categorias/${id}`);
      else if (activeTab === 'PISOS') setSalariosList(salariosList.filter(s => s.id !== id));

      await refreshData();
      await loadTabCollections();
    } catch (err) {
      alert('Erro ao excluir registro.');
    }
  };

  const handleToggleStatus = async (item) => {
    const newStatus = item.status === 'PAUSADO' ? 'PUBLICADO' : 'PAUSADO';
    try {
      if (activeTab === 'NOTÍCIAS') await api.put(`/news/${item.id}`, { ...item, status: newStatus });
      else if (activeTab === 'JORNAIS') await api.put(`/jornais/${item.id}`, { ...item, status: newStatus });
      else if (activeTab === 'TVS') await api.put(`/tv/channels/${item.id}`, { ...item, status: newStatus });
      else if (activeTab === 'CATEGORIAS') await api.put(`/categorias/${item.id}`, { ...item, status: newStatus });
      else if (activeTab === 'PISOS') setSalariosList(salariosList.map(s => s.id === item.id ? { ...s, status: newStatus } : s));

      await refreshData();
      await loadTabCollections();
    } catch (err) {
      alert('Erro ao alterar status.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-black font-sans pb-16">
      
      {/* 1. TOPBAR DO PAINEL DE GESTÃO ADMINISTRATIVA */}
      <header className="bg-black text-white border-b border-red-600 px-6 py-4 sticky top-0 z-40 shadow-md">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-black">
              <Shield size={18} />
            </div>
            <h1 className="text-xl font-black tracking-tight text-white uppercase">
              GESTÃO ADMINISTRATIVA FTTRESP
            </h1>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input 
                type="text" 
                placeholder="Busca global..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs font-semibold focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-xl text-xs font-bold shrink-0">
              <UserCheck size={14} className="text-white" />
              <span>Admin Master ({user?.username || 'operador_fttresp'})</span>
            </div>

            <button 
              onClick={onLogout}
              className="p-2 rounded-xl bg-zinc-900 text-white hover:bg-red-600 transition"
              title="Sair da Gestão"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <div className="container mt-6 space-y-6">
        
        {/* 2. ABAS EM PÍLULAS DE NAVEGAÇÃO */}
        <div className="bg-white p-2 rounded-2xl border border-zinc-200 shadow-sm flex flex-wrap gap-2">
          {tabOptions.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center gap-2 transition ${
                  active 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'text-black hover:bg-zinc-100 hover:text-red-600'
                }`}
              >
                <Icon size={14} className={active ? 'text-white' : 'text-zinc-500'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3. CONTEÚDO EXCLUSIVO DA ABA SELECIONADA */}
        {activeTab === 'TVS' ? (
          <TvManagementTab 
            channelsList={channelsList} 
            handleOpenModal={handleOpenModal} 
            handleToggleHomeTransmit={handleToggleHomeTransmit} 
            handleToggleStatus={handleToggleStatus} 
            handleDelete={handleDelete} 
          />
        ) : activeTab === 'SITE' ? (
          <SiteSettingsTab 
            siteSettings={siteSettings}
            setSiteSettings={setSiteSettings}
            handleSaveSiteSettings={handleSaveSiteSettings}
            savingSettings={savingSettings}
            settingsSavedSuccess={settingsSavedSuccess}
            siteLogoMode={siteLogoMode}
            setSiteLogoMode={setSiteLogoMode}
            handleFileUpload={handleFileUpload}
            uploadingLogo={uploadingLogo}
          />
        ) : (
          /* CONTEÚDO PADRÃO DE GESTÃO DE CONTEÚDO (NOTÍCIAS, PISOS, JORNAIS, CONVENÇÕES, CATEGORIAS) */
          <>
            {/* CABEÇALHO DA SEÇÃO E AÇÕES RÁPIDAS */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-black uppercase text-black tracking-tight">
                  GERENCIAR {activeTab}
                </h2>
                <p className="text-zinc-500 text-xs font-medium mt-0.5">
                  Envie arquivos locais (PDF/Imagens) ou informe links externos em tempo real.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => loadTabCollections()}
                  className="bg-red-50 text-red-600 hover:bg-red-100 font-extrabold text-xs px-3.5 py-2.5 rounded-xl border border-red-200 transition flex items-center gap-1.5"
                >
                  <Trash2 size={14} /> Limpar Rascunhos
                </button>
                <button 
                  onClick={() => loadTabCollections()}
                  className="bg-black hover:bg-zinc-800 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-1.5"
                >
                  <RefreshCw size={14} /> Sincronizar com Web
                </button>
                <button 
                  onClick={() => handleOpenModal()}
                  className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <Plus size={16} /> + Novo Registro
                </button>
              </div>
            </div>

            {/* GRID DE 4 CARDS DE MÉTRICAS TRICOLOR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-red-600 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider opacity-90">VISUALIZAÇÕES TOTAIS</span>
                  <div className="text-3xl font-black">{totalViews.toLocaleString('pt-BR')}</div>
                  <p className="text-[10px] opacity-90">Views acumuladas em matérias/documentos</p>
                </div>
                <TrendingUp size={36} className="absolute right-4 bottom-4 opacity-20" />
              </div>

              <div className="bg-black text-white p-5 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between border border-zinc-800">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider opacity-90">CLIQUES NO WHATSAPP</span>
                  <div className="text-3xl font-black">{totalWaShares.toLocaleString('pt-BR')}</div>
                  <p className="text-[10px] opacity-90">Compartilhamentos diretos no WA</p>
                </div>
                <Share2 size={36} className="absolute right-4 bottom-4 opacity-20" />
              </div>

              <div className="bg-red-700 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider opacity-90">CLIQUES NO FACEBOOK</span>
                  <div className="text-3xl font-black">{totalFbShares.toLocaleString('pt-BR')}</div>
                  <p className="text-[10px] opacity-90">Compartilhamentos diretos no FB</p>
                </div>
                <Share2 size={36} className="absolute right-4 bottom-4 opacity-20" />
              </div>

              <div className="bg-black text-white p-5 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between border border-zinc-800">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider opacity-90">LINKS COPIADOS</span>
                  <div className="text-3xl font-black">{totalLinkCopies.toLocaleString('pt-BR')}</div>
                  <p className="text-[10px] opacity-90">Transferências e cópias diretas</p>
                </div>
                <Copy size={36} className="absolute right-4 bottom-4 opacity-20" />
              </div>
            </div>

            {/* TABELA DE REGISTROS */}
            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden space-y-3">
              <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex justify-between items-center">
                <span className="text-xs font-black uppercase text-black tracking-wider">
                  LISTA COMPLETA ({activeItems.length})
                </span>
                <span className="text-[10px] text-zinc-500 font-semibold">Suporte a Arquivos PDF e Imagens</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-100 text-zinc-600 uppercase font-black tracking-wider border-b border-zinc-200">
                      <th className="py-3 px-4">MANCHETE / ARQUIVO</th>
                      <th className="py-3 px-4 text-center">MÉTRICAS</th>
                      <th className="py-3 px-4 text-right">AÇÃO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 font-medium text-black">
                    {activeItems.map((item, idx) => (
                      <tr key={item.id || `row-${idx}`} className="hover:bg-zinc-50 transition">
                        
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={item.imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=200&q=80"} 
                              alt="Thumb"
                              className="w-12 h-9 object-cover rounded-lg border border-zinc-200 shrink-0" 
                            />
                            <div className="space-y-0.5 overflow-hidden">
                              <div className="flex items-center gap-2">
                                <span className={`text-[9px] font-black px-2 py-0.2 rounded uppercase ${
                                  item.status === 'PAUSADO' 
                                    ? 'bg-zinc-200 text-black' 
                                    : 'bg-red-600 text-white'
                                }`}>
                                  {item.status || 'PUBLICADO'}
                                </span>
                                <span className="text-[10px] text-zinc-400">{item.date || '2026-08-14'}</span>
                              </div>
                              <h4 className="font-extrabold text-xs text-black truncate max-w-md">
                                {item.title || item.name}
                              </h4>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-3 text-[11px] font-bold text-black">
                            <span className="flex items-center gap-1"><Eye size={13} className="text-red-600" /> {item.views || 240}</span>
                            <span className="flex items-center gap-1"><Share2 size={13} className="text-red-600" /> {item.waShares || 14}</span>
                            <span className="flex items-center gap-1"><Share2 size={13} className="text-red-600" /> {item.fbShares || 8}</span>
                            <span className="flex items-center gap-1"><Copy size={13} className="text-red-600" /> {item.linkCopies || 4}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button 
                              onClick={() => handleToggleStatus(item)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition uppercase ${
                                item.status === 'PAUSADO' 
                                  ? 'bg-red-600 text-white' 
                                  : 'bg-zinc-200 text-black hover:bg-zinc-300'
                              }`}
                            >
                              {item.status === 'PAUSADO' ? 'ATIVAR' : 'PAUSAR'}
                            </button>
                            <button 
                              onClick={() => handleOpenModal(item)}
                              className="p-1.5 rounded-lg bg-black text-white hover:bg-red-600 transition"
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
          </>
        )}

      </div>

      {/* MODAL DE CRIAÇÃO / EDIÇÃO */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden">
            
            <div className="bg-black text-white px-6 py-4 flex justify-between items-center border-b border-red-600">
              <h3 className="font-black text-sm uppercase tracking-wider text-red-500">
                {editingItem ? `EDITAR REGISTRO - ${activeTab}` : `+ NOVO REGISTRO - ${activeTab}`}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-6 space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-black uppercase mb-1">Título / Nome do Canal:</label>
                <input 
                  type="text" 
                  required
                  value={formData.title || formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value, name: e.target.value })}
                  className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-black font-bold"
                  placeholder="Informe o nome do canal ou documento..."
                />
              </div>

              {activeTab === 'TVS' && (
                <div className="flex items-center gap-3 bg-red-50 p-3 rounded-2xl border border-red-200">
                  <input 
                    type="checkbox" 
                    id="showOnHomeToggle"
                    checked={formData.showOnHome !== false}
                    onChange={(e) => setFormData({ ...formData, showOnHome: e.target.checked })}
                    className="w-5 h-5 accent-red-600 rounded cursor-pointer"
                  />
                  <label htmlFor="showOnHomeToggle" className="text-xs font-black text-black uppercase cursor-pointer">
                    Transmitir este Canal na HomePage do Site? (Sim / Não)
                  </label>
                </div>
              )}

              {/* SELETOR DUPLO: UPLOAD DE ARQUIVO OU LINK URL */}
              <div className="space-y-2 bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                  <span className="font-black text-black uppercase">Mídia / Vídeo da Transmissão:</span>
                  
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-zinc-200">
                    <button
                      type="button"
                      onClick={() => setUploadMode('file')}
                      className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase flex items-center gap-1 transition ${
                        uploadMode === 'file' ? 'bg-red-600 text-white shadow-sm' : 'text-black hover:bg-zinc-100'
                      }`}
                    >
                      <Upload size={12} /> Subir Arquivo do PC
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode('link')}
                      className={`px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase flex items-center gap-1 transition ${
                        uploadMode === 'link' ? 'bg-red-600 text-white shadow-sm' : 'text-black hover:bg-zinc-100'
                      }`}
                    >
                      <LinkIcon size={12} /> Link / URL Externa
                    </button>
                  </div>
                </div>

                {uploadMode === 'file' ? (
                  <div className="space-y-2 pt-1">
                    <label className="block text-[11px] text-zinc-600">
                      Selecione um arquivo de mídia (MP4, WEBM, JPG, PNG) do seu computador:
                    </label>
                    <input 
                      type="file" 
                      accept="video/*,image/*,application/pdf"
                      onChange={(e) => handleFileUpload(e, 'imageUrl')}
                      className="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-red-600 file:text-white cursor-pointer"
                    />
                    {uploadingFile && <div className="text-red-600 font-bold text-[10px]">Enviando arquivo ao servidor...</div>}
                    {uploadedUrl && (
                      <div className="flex items-center gap-1 text-black bg-zinc-100 p-2 rounded-xl border border-zinc-300 text-[11px]">
                        <CheckCircle2 size={14} className="text-red-600" /> <strong>Arquivo Carregado:</strong> {uploadedUrl}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2 pt-1">
                    <label className="block text-[11px] text-zinc-600">Informe a URL / Link externo do vídeo (YouTube/HLS/MP4):</label>
                    <input 
                      type="text" 
                      value={formData.defaultVideoUrl || formData.imageUrl || ''}
                      onChange={(e) => {
                        setFormData({ ...formData, defaultVideoUrl: e.target.value, imageUrl: e.target.value });
                        setUploadedUrl(e.target.value);
                      }}
                      className="w-full p-2.5 rounded-xl bg-white border border-zinc-200 text-black font-medium"
                      placeholder="https://www.youtube.com/embed/..."
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-black uppercase mb-1">Categoria / Programa Atual:</label>
                  <input 
                    type="text" 
                    value={formData.currentShow || formData.category || 'Jornalismo'}
                    onChange={(e) => setFormData({ ...formData, currentShow: e.target.value, category: e.target.value })}
                    className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-black"
                    placeholder="Ex: Jornal Rodoviário SP"
                  />
                </div>

                <div>
                  <label className="block text-black uppercase mb-1">Badge de Destaque:</label>
                  <input 
                    type="text" 
                    value={formData.badge || 'AO VIVO'}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-black"
                    placeholder="Ex: AO VIVO, ESPECIAL"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="bg-zinc-100 hover:bg-zinc-200 text-black font-bold px-5 py-2.5 rounded-xl"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={loadingAction || uploadingFile}
                  className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-2.5 rounded-xl shadow-md"
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
