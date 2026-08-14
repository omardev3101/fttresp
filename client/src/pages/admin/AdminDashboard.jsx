import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Newspaper, Building2, FileText, Tv, Radio, ShieldAlert, Settings, LogOut, Plus, Trash2, Save, CheckCircle2 } from 'lucide-react';
import api from '../../services/api';

export default function AdminDashboard({ user, onLogout, refreshData, news, unions, agreements, tvChannels, radioConfig, settings }) {
  const [activeTab, setActiveTab] = useState('news');
  const [message, setMessage] = useState('');

  // Formulário Nova Notícia
  const [newNews, setNewNews] = useState({ title: '', category: 'Institucional', summary: '', content: '', imageUrl: '' });

  // Formulário Novo Sindicato
  const [newUnion, setNewUnion] = useState({ name: '', city: '', region: 'Capital', category: 'Cargas e Passageiros', phone: '', email: '', president: '', website: '' });

  // Formulário Nova Convenção
  const [newAgreement, setNewAgreement] = useState({ title: '', category: 'Carga', year: 2026, effectiveDate: '2026-05-01 até 2027-04-30', fileUrl: '', description: '' });

  // Formulário Config Rádio Web
  const [radioState, setRadioState] = useState(radioConfig || {});

  // Formulário Config Globais
  const [settingsState, setSettingsState] = useState(settings || {});

  useEffect(() => {
    if (radioConfig) setRadioState(radioConfig);
    if (settings) setSettingsState(settings);
  }, [radioConfig, settings]);

  const showMsg = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 4000);
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      await api.post('/news', newNews);
      showMsg('Notícia criada com sucesso!');
      setNewNews({ title: '', category: 'Institucional', summary: '', content: '', imageUrl: '' });
      refreshData();
    } catch (err) {
      alert('Erro ao criar notícia.');
    }
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm('Confirma a exclusão desta notícia?')) {
      await api.delete(`/news/${id}`);
      showMsg('Notícia excluída!');
      refreshData();
    }
  };

  const handleAddUnion = async (e) => {
    e.preventDefault();
    try {
      await api.post('/unions', newUnion);
      showMsg('Sindicato adicionado com sucesso!');
      setNewUnion({ name: '', city: '', region: 'Capital', category: 'Cargas e Passageiros', phone: '', email: '', president: '', website: '' });
      refreshData();
    } catch (err) {
      alert('Erro ao adicionar sindicato.');
    }
  };

  const handleSaveRadio = async (e) => {
    e.preventDefault();
    try {
      await api.put('/radio/status', radioState);
      showMsg('Status da Rádio Web e AutoDJ atualizados!');
      refreshData();
    } catch (err) {
      alert('Erro ao atualizar rádio.');
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await api.put('/settings', settingsState);
      showMsg('Configurações globais de tema e contato atualizadas!');
      refreshData();
    } catch (err) {
      alert('Erro ao atualizar configurações.');
    }
  };

  return (
    <div className="container py-10 space-y-8">
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs text-amber-400 font-extrabold uppercase tracking-wider">Painel Administrativo CMS</span>
          </div>
          <h1 className="text-2xl font-black text-white">Gerenciador Geral FTTRESP</h1>
          <p className="text-xs text-slate-400">Logado como: <strong>{user?.name || 'Operador Admin'}</strong></p>
        </div>

        <button 
          onClick={onLogout} 
          className="bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition"
        >
          <LogOut size={16} /> Sair do Painel CMS
        </button>
      </div>

      {message && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl font-bold text-sm flex items-center gap-2">
          <CheckCircle2 size={18} /> {message}
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
        {[
          { id: 'news', label: 'Notícias & Mídias', icon: Newspaper },
          { id: 'unions', label: '97 Sindicatos', icon: Building2 },
          { id: 'agreements', label: 'Convenções', icon: FileText },
          { id: 'webtv', label: 'Web TV & Grade', icon: Tv },
          { id: 'radio', label: 'Rádio Web & AutoDJ', icon: Radio },
          { id: 'settings', label: 'Cores & Contatos', icon: Settings }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
                active ? 'gradient-gold text-slate-950 shadow-md font-black' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: NOTÍCIAS */}
      {activeTab === 'news' && (
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-3">
              <Plus size={18} className="text-amber-600" /> Publicar Nova Notícia
            </h3>

            <form onSubmit={handleAddNews} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 block mb-1">Título da Matéria:</label>
                <input 
                  type="text" required
                  value={newNews.title}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 block mb-1">Categoria:</label>
                <select 
                  value={newNews.category}
                  onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none font-bold"
                >
                  <option value="Institucional">Institucional</option>
                  <option value="Campanha Salarial">Campanha Salarial</option>
                  <option value="Segurança e Saúde">Segurança e Saúde</option>
                  <option value="Jurídico">Jurídico</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-500 block mb-1">Resumo Curto:</label>
                <input 
                  type="text" required
                  value={newNews.summary}
                  onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 block mb-1">URL da Imagem de Capa:</label>
                <input 
                  type="text"
                  value={newNews.imageUrl}
                  onChange={(e) => setNewNews({ ...newNews, imageUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="font-bold text-slate-500 block mb-1">Conteúdo Completo (HTML):</label>
                <textarea 
                  rows="4" required
                  value={newNews.content}
                  onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none"
                ></textarea>
              </div>

              <button type="submit" className="w-full gradient-gold text-slate-950 font-black py-3 rounded-xl shadow-md">
                Publicar Notícia no Portal
              </button>
            </form>
          </div>

          <div className="md:col-span-7 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg">Notícias Publicadas ({news?.length})</h3>
            <div className="space-y-3">
              {news?.map((n) => (
                <div key={n.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-amber-600 font-bold uppercase">{n.category} • {n.date}</div>
                    <div className="font-extrabold text-slate-900 text-sm line-clamp-1">{n.title}</div>
                  </div>
                  <button onClick={() => handleDeleteNews(n.id)} className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-lg transition">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SINDICATOS */}
      {activeTab === 'unions' && (
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2 border-b border-slate-100 pb-3">
              <Plus size={18} className="text-amber-600" /> Cadastrar Sindicato
            </h3>

            <form onSubmit={handleAddUnion} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-500 block mb-1">Razão Social / Nome do Sindicato:</label>
                <input 
                  type="text" required
                  value={newUnion.name}
                  onChange={(e) => setNewUnion({ ...newUnion, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-500 block mb-1">Município:</label>
                  <input 
                    type="text" required
                    value={newUnion.city}
                    onChange={(e) => setNewUnion({ ...newUnion, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-500 block mb-1">Região de SP:</label>
                  <select 
                    value={newUnion.region}
                    onChange={(e) => setNewUnion({ ...newUnion, region: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none font-bold"
                  >
                    <option value="Capital">Capital</option>
                    <option value="Grande SP (ABCDMR)">Grande SP (ABCDMR)</option>
                    <option value="Região Metropolitana de Campinas">Campinas</option>
                    <option value="Baixada Santista">Baixada Santista</option>
                    <option value="Interior (Ribeirão Preto)">Ribeirão Preto</option>
                    <option value="Interior (Sorocaba)">Sorocaba</option>
                    <option value="Vale do Paraíba">Vale do Paraíba</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-500 block mb-1">Telefone:</label>
                  <input 
                    type="text"
                    value={newUnion.phone}
                    onChange={(e) => setNewUnion({ ...newUnion, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-500 block mb-1">E-mail de Contato:</label>
                  <input 
                    type="email"
                    value={newUnion.email}
                    onChange={(e) => setNewUnion({ ...newUnion, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <button type="submit" className="w-full gradient-gold text-slate-950 font-black py-3 rounded-xl shadow-md">
                Salvar Sindicato no Cadastro
              </button>
            </form>
          </div>

          <div className="md:col-span-7 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg">Sindicatos Cadastrados ({unions?.length})</h3>
            <div className="space-y-3">
              {unions?.map((u) => (
                <div key={u.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-amber-600 font-bold uppercase">{u.region} • {u.city}</div>
                    <div className="font-extrabold text-slate-900 text-sm line-clamp-1">{u.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: RÁDIO WEB & AUTODJ */}
      {activeTab === 'radio' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6 max-w-2xl">
          <h3 className="font-extrabold text-slate-900 text-xl border-b border-slate-100 pb-3 flex items-center gap-2">
            <Radio className="text-amber-600" size={22} /> Painel Administrativo DJ / AutoDJ
          </h3>

          <form onSubmit={handleSaveRadio} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-500 block mb-1">Nome da Estação de Rádio:</label>
              <input 
                type="text"
                value={radioState.stationName || ''}
                onChange={(e) => setRadioState({ ...radioState, stationName: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-500 block mb-1">Faixa / Programa no Ar:</label>
              <input 
                type="text"
                value={radioState.currentTrack || ''}
                onChange={(e) => setRadioState({ ...radioState, currentTrack: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-500 block mb-1">Locutor / Estúdio Responsável:</label>
              <input 
                type="text"
                value={radioState.currentDj || ''}
                onChange={(e) => setRadioState({ ...radioState, currentDj: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 font-bold">
              <input 
                type="checkbox"
                id="hourlyCheck"
                checked={radioState.hourlyTimeAnnouncement || false}
                onChange={(e) => setRadioState({ ...radioState, hourlyTimeAnnouncement: e.target.checked })}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <label htmlFor="hourlyCheck" className="cursor-pointer">Ativar Sistema Automático de Hora Certa em Áudio de 1h em 1h</label>
            </div>

            <button type="submit" className="w-full gradient-gold text-slate-950 font-black py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2">
              <Save size={18} /> Atualizar Transmissão da Rádio Web
            </button>
          </form>
        </div>
      )}

      {/* TAB 6: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6 max-w-2xl">
          <h3 className="font-extrabold text-slate-900 text-xl border-b border-slate-100 pb-3 flex items-center gap-2">
            <Settings className="text-amber-600" size={22} /> Configurações de Identidade & Contatos
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-500 block mb-1">Telefone Principal da Sede:</label>
              <input 
                type="text"
                value={settingsState.phone || ''}
                onChange={(e) => setSettingsState({ ...settingsState, phone: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-500 block mb-1">E-mail de Atendimento Geral:</label>
              <input 
                type="email"
                value={settingsState.email || ''}
                onChange={(e) => setSettingsState({ ...settingsState, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-500 block mb-1">Endereço da Sede em São Paulo:</label>
              <input 
                type="text"
                value={settingsState.address || ''}
                onChange={(e) => setSettingsState({ ...settingsState, address: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 outline-none"
              />
            </div>

            <button type="submit" className="w-full gradient-gold text-slate-950 font-black py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2">
              <Save size={18} /> Salvar Configurações Globais
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
