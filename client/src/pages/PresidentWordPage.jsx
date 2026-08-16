import React from 'react';
import { Quote, Award, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function PresidentWordPage({ settings, setCurrentPage }) {
  return (
    <div className="container py-12 space-y-12 font-sans bg-white">
      {/* Header */}
      <div className="bg-black text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4 border border-red-600">
        <span className="bg-red-600 text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
          Mensagem da Presidência FTTRESP
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Palavra do Presidente</h1>
        <p className="text-zinc-300 text-base max-w-3xl font-medium">
          Compromisso inabalável com os mais de 1,5 milhão de trabalhadores rodoviários e 97 sindicatos filiados no estado de São Paulo.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* President Photo Card */}
        <div className="lg:col-span-5 bg-black text-white rounded-3xl overflow-hidden border border-red-600 shadow-2xl p-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800">
            <img 
              src={settings?.presidentPhotoUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"} 
              alt={settings?.presidentName || "Presidente FTTRESP"} 
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="text-xl font-black text-white">{settings?.presidentName || "Valdevan Noventa"}</div>
              <div className="text-xs text-red-500 font-bold">{settings?.presidentTitle || "Presidente da Federação Rodoviária de SP"}</div>
            </div>
          </div>

          <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 text-xs text-zinc-300 space-y-2">
            <div className="font-extrabold text-red-500 flex items-center gap-1.5">
              <Award size={16} /> Representatividade em Todo o Estado de SP
            </div>
            <p>Coordenação estadual dos 97 sindicatos parceiros, garantindo pisos salariais unificados e direitos sociais.</p>
          </div>
        </div>

        {/* President Statement */}
        <div className="lg:col-span-7 space-y-6 text-black leading-relaxed">
          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-2xl space-y-2">
            <Quote size={32} className="text-red-600 mb-2" />
            <p className="text-lg font-bold text-black italic">
              "{settings?.presidentQuote || "A nossa força nasce da união dos 97 sindicatos filiados. Nenhum motorista ou trabalhador em transporte de São Paulo caminhará sozinho diante das adversidades do setor."}"
            </p>
          </div>

          <div className="space-y-4 text-base text-zinc-800 font-medium">
            <p>
              Companheiras e companheiros rodoviários de todo o Estado de São Paulo,
            </p>
            <p>
              {settings?.presidentMessage || "Assumir a condução da FTTRESP (Federação dos Trabalhadores em Transportes Rodoviários do Estado de São Paulo) é um compromisso diário com a dignidade, com a segurança e com o futuro de mais de 1,5 milhão de pais e mães de família que movimentam a economia paulista."}
            </p>
            <p>
              Em tempos de grandes transformações tecnológicas no transporte — desde a carga rodoviária, ônibus urbanos e intermunicipais até os entregadores de aplicativos — a FTTRESP renova a sua estrutura. Lançamos este novo portal moderno com <strong>Web TV Ao Vivo, Rádio Web 24h, consulta digital dos 97 sindicatos e convenções coletivas integradas</strong> para colocar a informação na palma da mão do trabalhador.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <button 
              onClick={() => setCurrentPage && setCurrentPage('unions')}
              className="bg-red-600 hover:bg-red-700 text-white font-black text-xs px-6 py-3.5 rounded-xl shadow-md transition flex items-center gap-2"
            >
              Conheça os 97 Sindicatos Filiados <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
