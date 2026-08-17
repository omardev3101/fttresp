import React from 'react';
import { Globe, UserCheck, MapPin, Save, CheckCircle2 } from 'lucide-react';

export default function SiteSettingsTab({
  siteSettings,
  setSiteSettings,
  handleSaveSiteSettings,
  savingSettings,
  settingsSavedSuccess,
  siteLogoMode,
  setSiteLogoMode,
  handleFileUpload,
  uploadingLogo
}) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-6 font-sans">
      <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
        <div>
          <h2 className="text-2xl font-black text-black uppercase">GESTÃO DO SITE & IDENTIDADE</h2>
          <p className="text-zinc-500 text-xs font-medium mt-0.5">Gerencie os dados institucionais, logotipo, contatos, horários, copyright e redes sociais.</p>
        </div>
        
        {settingsSavedSuccess && (
          <div className="bg-black text-white border border-red-600 font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 size={16} className="text-red-500" /> Configurações salvas com sucesso!
          </div>
        )}
      </div>

      <form onSubmit={handleSaveSiteSettings} className="space-y-6 text-xs font-semibold">
        {/* LOGO E IDENTIDADE VISUAL */}
        <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 space-y-3">
          <h3 className="text-sm font-black text-black uppercase flex items-center gap-2 border-b border-zinc-200 pb-2">
            <Globe size={16} className="text-red-600" /> Logotipo Oficial & Identidade
          </h3>

          <div className="grid md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-zinc-200 space-y-2">
              <img 
                src={siteSettings.logoUrl || "/logo_fttresp.png"} 
                alt="Logo Oficial" 
                className="w-20 h-20 object-contain"
              />
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Brasão Oficial Atual</span>
            </div>

            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-black uppercase">Subir Novo Logo ou Link:</label>
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-zinc-200 text-[10px]">
                  <button 
                    type="button" 
                    onClick={() => setSiteLogoMode('file')}
                    className={`px-3 py-1 rounded-lg font-bold ${siteLogoMode === 'file' ? 'bg-red-600 text-white' : 'text-black'}`}
                  >
                    Subir do PC
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSiteLogoMode('link')}
                    className={`px-3 py-1 rounded-lg font-bold ${siteLogoMode === 'link' ? 'bg-red-600 text-white' : 'text-black'}`}
                  >
                    Link URL
                  </button>
                </div>
              </div>

              {siteLogoMode === 'file' ? (
                <div>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'logoUrl')}
                    className="block w-full text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-red-600 file:text-white cursor-pointer"
                  />
                  {uploadingLogo && <span className="text-red-600 font-bold">Enviando logo...</span>}
                </div>
              ) : (
                <input 
                  type="text" 
                  value={siteSettings.logoUrl || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, logoUrl: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-zinc-200 text-black font-bold"
                  placeholder="https://..."
                />
              )}
            </div>
          </div>
        </div>

        {/* PALETA DE CORES PERSONALIZADA */}
        <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 space-y-3">
          <h3 className="text-sm font-black text-black uppercase flex items-center gap-2 border-b border-zinc-200 pb-2">
            🎨 Paleta de Cores do Portal (Tema Tricolor)
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-zinc-600 uppercase mb-1">Cor Primária (Preto):</label>
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-zinc-200">
                <input 
                  type="color" 
                  value={siteSettings.primaryColor || '#000000'}
                  onChange={(e) => {
                    setSiteSettings({ ...siteSettings, primaryColor: e.target.value });
                    document.documentElement.style.setProperty('--color-primary', e.target.value);
                  }}
                  className="w-8 h-8 rounded border-0 cursor-pointer"
                />
                <input 
                  type="text" 
                  value={siteSettings.primaryColor || '#000000'}
                  onChange={(e) => {
                    setSiteSettings({ ...siteSettings, primaryColor: e.target.value });
                    document.documentElement.style.setProperty('--color-primary', e.target.value);
                  }}
                  className="w-full text-xs font-mono font-bold outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-600 uppercase mb-1">Cor Secundária (Vermelho):</label>
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-zinc-200">
                <input 
                  type="color" 
                  value={siteSettings.secondaryColor || '#dc2626'}
                  onChange={(e) => {
                    setSiteSettings({ ...siteSettings, secondaryColor: e.target.value });
                    document.documentElement.style.setProperty('--color-secondary', e.target.value);
                  }}
                  className="w-8 h-8 rounded border-0 cursor-pointer"
                />
                <input 
                  type="text" 
                  value={siteSettings.secondaryColor || '#dc2626'}
                  onChange={(e) => {
                    setSiteSettings({ ...siteSettings, secondaryColor: e.target.value });
                    document.documentElement.style.setProperty('--color-secondary', e.target.value);
                  }}
                  className="w-full text-xs font-mono font-bold outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-600 uppercase mb-1">Vermelho Intenso:</label>
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-zinc-200">
                <input 
                  type="color" 
                  value={siteSettings.accentColor || '#b91c1c'}
                  onChange={(e) => {
                    setSiteSettings({ ...siteSettings, accentColor: e.target.value });
                    document.documentElement.style.setProperty('--color-accent', e.target.value);
                  }}
                  className="w-8 h-8 rounded border-0 cursor-pointer"
                />
                <input 
                  type="text" 
                  value={siteSettings.accentColor || '#b91c1c'}
                  onChange={(e) => {
                    setSiteSettings({ ...siteSettings, accentColor: e.target.value });
                    document.documentElement.style.setProperty('--color-accent', e.target.value);
                  }}
                  className="w-full text-xs font-mono font-bold outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-600 uppercase mb-1">Destaques (Vermelho FTTRESP):</label>
              <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-zinc-200">
                <input 
                  type="color" 
                  value={siteSettings.highlightColor || '#dc2626'}
                  onChange={(e) => {
                    setSiteSettings({ ...siteSettings, highlightColor: e.target.value });
                    document.documentElement.style.setProperty('--color-highlight', e.target.value);
                  }}
                  className="w-8 h-8 rounded border-0 cursor-pointer"
                />
                <input 
                  type="text" 
                  value={siteSettings.highlightColor || '#dc2626'}
                  onChange={(e) => {
                    setSiteSettings({ ...siteSettings, highlightColor: e.target.value });
                    document.documentElement.style.setProperty('--color-highlight', e.target.value);
                  }}
                  className="w-full text-xs font-mono font-bold outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* PALAVRA DO PRESIDENTE & FOTO OFICIAL */}
        <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 space-y-4">
          <h3 className="text-sm font-black text-black uppercase flex items-center gap-2 border-b border-zinc-200 pb-2">
            <UserCheck size={16} className="text-red-600" /> Palavra do Presidente & Foto Oficial
          </h3>

          <div className="grid md:grid-cols-12 gap-6 items-start">
            {/* Foto Preview & Upload */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-zinc-200 space-y-3">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-red-600 shadow-md">
                <img 
                  src={siteSettings.presidentPhotoUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"} 
                  alt="Foto Presidente" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Foto Oficial do Presidente</span>
              
              <div className="w-full space-y-2">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'presidentPhotoUrl')}
                  className="block w-full text-[10px] text-zinc-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:bg-red-600 file:text-white cursor-pointer"
                />
              </div>
            </div>

            {/* Formulário do Presidente */}
            <div className="md:col-span-8 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-600 uppercase mb-1">Nome do Presidente:</label>
                  <input 
                    type="text" 
                    value={siteSettings.presidentName || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, presidentName: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white border border-zinc-200 text-black font-bold"
                    placeholder="Ex: Valdevan Noventa"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 uppercase mb-1">Cargo / Título:</label>
                  <input 
                    type="text" 
                    value={siteSettings.presidentTitle || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, presidentTitle: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white border border-zinc-200 text-black font-bold"
                    placeholder="Ex: Presidência FTTRESP"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-600 uppercase mb-1">Foto URL Externa (Opcional):</label>
                <input 
                  type="text" 
                  value={siteSettings.presidentPhotoUrl || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, presidentPhotoUrl: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-white border border-zinc-200 text-black font-mono text-[11px]"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-zinc-600 uppercase mb-1">Frase / Citação em Destaque (Aspas):</label>
                <textarea 
                  rows="2"
                  value={siteSettings.presidentQuote || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, presidentQuote: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-zinc-200 text-black italic font-bold"
                  placeholder="Frase em destaque da mensagem..."
                ></textarea>
              </div>

              <div>
                <label className="block text-zinc-600 uppercase mb-1">Mensagem Institucional Completa:</label>
                <textarea 
                  rows="4"
                  value={siteSettings.presidentMessage || ''}
                  onChange={(e) => setSiteSettings({ ...siteSettings, presidentMessage: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-zinc-200 text-black font-medium"
                  placeholder="Texto pronunciamento do presidente..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* ENDEREÇO DA SEDE & ATENDIMENTO */}
        <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 space-y-3">
          <h3 className="text-sm font-black text-black uppercase flex items-center gap-2 border-b border-zinc-200 pb-2">
            <MapPin size={16} className="text-red-600" /> Endereço da Sede & Telefones
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-600 uppercase mb-1">Endereço Oficial da Sede:</label>
              <input 
                type="text" 
                value={siteSettings.address || ''}
                onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                className="w-full p-3 rounded-xl bg-white border border-zinc-200 text-black font-bold"
              />
            </div>

            <div>
              <label className="block text-zinc-600 uppercase mb-1">Telefones Oficiais:</label>
              <input 
                type="text" 
                value={siteSettings.phone || ''}
                onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                className="w-full p-3 rounded-xl bg-white border border-zinc-200 text-black font-bold"
              />
            </div>

            <div>
              <label className="block text-zinc-600 uppercase mb-1">WhatsApp de Atendimento:</label>
              <input 
                type="text" 
                value={siteSettings.whatsapp || ''}
                onChange={(e) => setSiteSettings({ ...siteSettings, whatsapp: e.target.value })}
                className="w-full p-3 rounded-xl bg-white border border-zinc-200 text-black font-bold"
              />
            </div>

            <div>
              <label className="block text-zinc-600 uppercase mb-1">E-mail Principal:</label>
              <input 
                type="email" 
                value={siteSettings.email || ''}
                onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                className="w-full p-3 rounded-xl bg-white border border-zinc-200 text-black font-bold"
              />
            </div>

            <div>
              <label className="block text-zinc-600 uppercase mb-1">Horário de Atendimento:</label>
              <input 
                type="text" 
                value={siteSettings.workingHours || ''}
                onChange={(e) => setSiteSettings({ ...siteSettings, workingHours: e.target.value })}
                className="w-full p-3 rounded-xl bg-white border border-zinc-200 text-black font-bold"
              />
            </div>

            <div>
              <label className="block text-zinc-600 uppercase mb-1">Texto de Copyright (Rodapé):</label>
              <input 
                type="text" 
                value={siteSettings.copyright || ''}
                onChange={(e) => setSiteSettings({ ...siteSettings, copyright: e.target.value })}
                className="w-full p-3 rounded-xl bg-white border border-zinc-200 text-black font-bold"
              />
            </div>
          </div>
        </div>

        {/* BOTÃO SALVAR GESTÃO DO SITE */}
        <div className="flex justify-end pt-2">
          <button 
            type="submit" 
            disabled={savingSettings}
            className="bg-red-600 hover:bg-red-700 text-white font-black text-sm px-8 py-3.5 rounded-xl shadow-lg hover:scale-105 transition flex items-center gap-2"
          >
            <Save size={18} /> {savingSettings ? 'Gravando Alterações...' : 'Salvar Gestão do Site'}
          </button>
        </div>
      </form>
    </div>
  );
}
