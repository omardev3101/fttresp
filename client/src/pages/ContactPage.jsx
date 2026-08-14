import React, { useState } from 'react';
import { ShieldAlert, Send, CheckCircle2, Phone, Mail, MapPin, Lock } from 'lucide-react';
import api from '../services/api';

export default function ContactPage({ settings }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Dúvida Trabalhista',
    city: 'São Paulo',
    company: '',
    message: '',
    isAnonymous: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedProtocol, setSubmittedProtocol] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post('/denuncias', formData);
      setSubmittedProtocol(res.data.protocol);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Dúvida Trabalhista',
        city: 'São Paulo',
        company: '',
        message: '',
        isAnonymous: false
      });
    } catch (err) {
      alert('Erro ao registrar denúncia/contato. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-10 space-y-10">
      {/* Header */}
      <div className="gradient-hero text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Atendimento & Proteção ao Trabalhador
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Contato, Ouvidoria e Denúncias Sigilosas</h1>
        <p className="text-slate-300 text-base max-w-3xl">
          Entre em contato com a equipe da FTTRESP ou registre denúncias anônimas sobre descumprimento de convenção coletiva e condições de trabalho.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <ShieldAlert className="text-amber-600" size={20} /> Formulário de Envio com Protocolo
          </h2>

          {submittedProtocol ? (
            <div className="bg-emerald-50 border-2 border-emerald-500/50 p-6 rounded-2xl text-center space-y-4">
              <CheckCircle2 size={48} className="text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-black text-emerald-950">Denúncia / Mensagem Enviada com Sucesso!</h3>
              <p className="text-emerald-800 text-sm">Guarde seu número de protocolo para acompanhamento:</p>
              <div className="bg-emerald-950 text-amber-400 font-mono text-xl font-black py-3 px-6 rounded-xl inline-block shadow-lg">
                {submittedProtocol}
              </div>
              <button 
                onClick={() => setSubmittedProtocol(null)} 
                className="block mx-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition"
              >
                Enviar Nova Mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900 text-xs font-semibold">
                <input 
                  type="checkbox" 
                  id="anonymousCheck" 
                  checked={formData.isAnonymous}
                  onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-600"
                />
                <label htmlFor="anonymousCheck" className="cursor-pointer flex items-center gap-1">
                  <Lock size={14} /> Desejo enviar esta mensagem de forma <strong>Totalmente Anônima / Sigilosa</strong>
                </label>
              </div>

              {!formData.isAnonymous && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-xs uppercase text-slate-500 block mb-1">Seu Nome:</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-amber-500" 
                      placeholder="Nome completo"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-xs uppercase text-slate-500 block mb-1">E-mail para Retorno:</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-amber-500" 
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-xs uppercase text-slate-500 block mb-1">Assunto / Tipo:</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-amber-500 font-semibold"
                  >
                    <option value="Dúvida Trabalhista">Dúvida Trabalhista</option>
                    <option value="Denúncia Anônima de Convenção">Denúncia Anônima de Convenção</option>
                    <option value="Condições de Trabalho e Garagem">Condições de Trabalho e Garagem</option>
                    <option value="Imprensa e Comunicação">Imprensa e Comunicação</option>
                    <option value="Ouvidoria FTTRESP">Ouvidoria FTTRESP</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-xs uppercase text-slate-500 block mb-1">Município de SP:</label>
                  <input 
                    type="text" 
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-amber-500" 
                    placeholder="Ex: São Paulo, Campinas"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-xs uppercase text-slate-500 block mb-1">Empresa / Linha (Opcional):</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-amber-500" 
                  placeholder="Nome da empresa de transporte"
                />
              </div>

              <div>
                <label className="font-bold text-xs uppercase text-slate-500 block mb-1">Descrição / Relato Detalhado:</label>
                <textarea 
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-amber-500"
                  placeholder="Descreva detalhadamente o ocorrido..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full gradient-gold text-slate-950 font-black text-sm py-3.5 rounded-xl shadow-lg hover:scale-[1.01] transition flex items-center justify-center gap-2"
              >
                <Send size={18} /> {submitting ? 'Registrando Protocolo...' : 'Enviar Denúncia / Mensagem'}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sede */}
        <div className="md:col-span-5 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <h2 className="text-xl font-extrabold text-amber-400 border-b border-slate-800 pb-3">
            Sede FTTRESP em São Paulo
          </h2>

          <ul className="space-y-4 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-amber-400 shrink-0 mt-1" />
              <div>
                <strong className="text-white block">Endereço da Sede:</strong>
                {settings?.address || 'Rua do Carmo, 56 - Centro Histórico, São Paulo - SP'}
              </div>
            </li>

            <li className="flex items-center gap-3">
              <Phone size={20} className="text-amber-400 shrink-0" />
              <div>
                <strong className="text-white block">Telefone Geral:</strong>
                {settings?.phone || '(11) 3228-5000'}
              </div>
            </li>

            <li className="flex items-center gap-3">
              <Mail size={20} className="text-amber-400 shrink-0" />
              <div>
                <strong className="text-white block">E-mail de Atendimento:</strong>
                {settings?.email || 'contato@fttresp.org.br'}
              </div>
            </li>
          </ul>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="font-extrabold text-amber-400">Atendimento Presencial</div>
            <p className="text-slate-400">{settings?.workingHours || 'Segunda a Sexta-feira: 08:00 às 17:00'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
