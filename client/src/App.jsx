import React, { useState, useEffect } from 'react';
import api from './services/api';

import Header from './components/Header';
import Footer from './components/Footer';
import FloatingRadioPlayer from './components/FloatingRadioPlayer';

import HomePage from './pages/HomePage';
import UnionsPage from './pages/UnionsPage';
import AgreementsPage from './pages/AgreementsPage';
import WebTVPage from './pages/WebTVPage';
import RadioWebPage from './pages/RadioWebPage';
import RightsCalculatorPage from './pages/RightsCalculatorPage';
import ContactPage from './pages/ContactPage';
import PresidentWordPage from './pages/PresidentWordPage';
import HistoryPage from './pages/HistoryPage';
import SalaryPage from './pages/SalaryPage';
import ColoniesPage from './pages/ColoniesPage';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [adminUser, setAdminUser] = useState(null);

  const [settings, setSettings] = useState(null);
  const [news, setNews] = useState([]);
  const [unions, setUnions] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [tvChannels, setTvChannels] = useState([]);
  const [tvSchedules, setTvSchedules] = useState([]);
  const [radioConfig, setRadioConfig] = useState(null);

  const loadData = async () => {
    try {
      const [resSet, resNews, resUnions, resAgr, resTv, resTvSch, resRadio] = await Promise.all([
        api.get('/settings'),
        api.get('/news'),
        api.get('/unions'),
        api.get('/agreements'),
        api.get('/tv/channels'),
        api.get('/tv/schedules'),
        api.get('/radio/status')
      ]);

      setSettings(resSet.data);
      setNews(resNews.data);
      setUnions(resUnions.data);
      setAgreements(resAgr.data);
      setTvChannels(resTv.data);
      setTvSchedules(resTvSch.data);
      setRadioConfig(resRadio.data);
    } catch (err) {
      console.error('Erro ao carregar dados da REST API:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage news={news} unions={unions} tvChannels={tvChannels} setCurrentPage={setCurrentPage} />;
      case 'president':
        return <PresidentWordPage setCurrentPage={setCurrentPage} />;
      case 'history':
        return <HistoryPage />;
      case 'salary':
        return <SalaryPage />;
      case 'colonies':
        return <ColoniesPage />;
      case 'unions':
        return <UnionsPage unions={unions} />;
      case 'agreements':
        return <AgreementsPage agreements={agreements} />;
      case 'webtv':
        return <WebTVPage tvChannels={tvChannels} tvSchedules={tvSchedules} news={news} />;
      case 'radioweb':
        return <RadioWebPage radioConfig={radioConfig} />;
      case 'calculator':
        return <RightsCalculatorPage />;
      case 'contact':
        return <ContactPage settings={settings} />;
      case 'admin':
        if (!adminUser) {
          return <AdminLogin onLoginSuccess={(u) => setAdminUser(u)} />;
        }
        return (
          <AdminDashboard 
            user={adminUser} 
            onLogout={() => { localStorage.removeItem('fttresp_token'); setAdminUser(null); }}
            refreshData={loadData}
            news={news}
            unions={unions}
            agreements={agreements}
            tvChannels={tvChannels}
            radioConfig={radioConfig}
            settings={settings}
          />
        );
      default:
        return <HomePage news={news} unions={unions} tvChannels={tvChannels} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans">
      <div>
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} settings={settings} />
        <main>{renderPage()}</main>
      </div>

      {/* Player Flutuante da Rádio Web */}
      <FloatingRadioPlayer radioConfig={radioConfig} />

      <Footer settings={settings} setCurrentPage={setCurrentPage} />
    </div>
  );
}
