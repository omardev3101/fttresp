import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function RightsCalculatorPage() {
  const [baseSalary, setBaseSalary] = useState('3200');
  const [extraHours, setExtraHours] = useState('20');
  const [nightHours, setNightHours] = useState('15');
  const [tripDays, setTripDays] = useState('5');
  const [dailyAllowance, setDailyAllowance] = useState('38.50');

  const salaryNum = parseFloat(baseSalary) || 0;
  const extraNum = parseFloat(extraHours) || 0;
  const nightNum = parseFloat(nightHours) || 0;
  const tripNum = parseFloat(tripDays) || 0;
  const allowanceNum = parseFloat(dailyAllowance) || 0;

  // Cálculos da Categoria Rodoviária (Divisor 220h)
  const hourlyRate = salaryNum / 220;
  const extraTotal = extraNum * (hourlyRate * 1.5); // 50% de hora extra
  const nightTotal = nightNum * (hourlyRate * 0.2); // 20% adicional noturno
  const tripTotal = tripNum * allowanceNum;
  const totalEstimated = salaryNum + extraTotal + nightTotal + tripTotal;

  return (
    <div className="container py-10 space-y-10">
      {/* Header */}
      <div className="gradient-hero text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
        <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Ferramenta do Trabalhador
        </span>
        <h1 className="text-3xl sm:text-4xl font-black">Simulador de Direitos Rodoviários FTTRESP</h1>
        <p className="text-slate-300 text-base max-w-3xl">
          Calcule a estimativa dos seus rendimentos com base no piso salarial da convenção coletiva, horas extras a 50%, adicional noturno e diárias de viagem.
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Form Inputs */}
        <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <h2 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Calculator className="text-amber-600" size={20} /> Preencha seus Dados de Jornada
          </h2>

          <div className="space-y-4 text-sm text-slate-700">
            <div>
              <label className="font-bold text-xs uppercase text-slate-500 block mb-1">Salário Base ou Piso da Categoria (R$):</label>
              <input 
                type="number" 
                value={baseSalary} 
                onChange={(e) => setBaseSalary(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-extrabold text-slate-900 outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-xs uppercase text-slate-500 block mb-1">Horas Extras no Mês (50%):</label>
                <input 
                  type="number" 
                  value={extraHours} 
                  onChange={(e) => setExtraHours(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-extrabold text-slate-900 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-bold text-xs uppercase text-slate-500 block mb-1">Horas Noturnas (22h às 05h):</label>
                <input 
                  type="number" 
                  value={nightHours} 
                  onChange={(e) => setNightHours(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-extrabold text-slate-900 outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-xs uppercase text-slate-500 block mb-1">Dias em Viagem no Mês:</label>
                <input 
                  type="number" 
                  value={tripDays} 
                  onChange={(e) => setTripDays(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-extrabold text-slate-900 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="font-bold text-xs uppercase text-slate-500 block mb-1">Valor da Diária de Viagem (R$):</label>
                <input 
                  type="number" 
                  value={dailyAllowance} 
                  onChange={(e) => setDailyAllowance(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 font-extrabold text-slate-900 outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="md:col-span-5 bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <h2 className="text-xl font-extrabold text-amber-400 border-b border-slate-800 pb-3">
            Resultado Estimado do Mês
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
              <span className="text-slate-400">Salário Base:</span>
              <span className="font-bold font-mono">R$ {salaryNum.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
              <span className="text-slate-400">Total Horas Extras (50%):</span>
              <span className="font-bold font-mono text-emerald-400">+ R$ {extraTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
              <span className="text-slate-400">Adicional Noturno (20%):</span>
              <span className="font-bold font-mono text-emerald-400">+ R$ {nightTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
              <span className="text-slate-400">Diárias de Viagem:</span>
              <span className="font-bold font-mono text-emerald-400">+ R$ {tripTotal.toFixed(2)}</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <div className="text-xs text-amber-400 font-bold uppercase">Estimativa Bruta Total</div>
              <div className="text-3xl font-black text-amber-400 font-mono">R$ {totalEstimated.toFixed(2)}</div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
            * Este simulador oferece um cálculo de caráter estimativo com base em regras gerais das convenções da FTTRESP. Consulte sempre o departamento jurídico do seu sindicato filiado para apuração detalhada do holerite.
          </div>
        </div>
      </div>
    </div>
  );
}
