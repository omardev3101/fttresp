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

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [adminUser, setAdminUser] = useState(null);

  const [settings, setSettings] = useState(null);
  const [banners, setBanners] = useState([]);
  const [news, setNews] = useState([]);
  const [jornais, setJornais] = useState([]);
  const [unions, setUnions] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [tvChannels, setTvChannels] = useState([]);
  const [tvSchedules, setTvSchedules] = useState([]);
  const [radioConfig, setRadioConfig] = useState(null);

  const loadData = async () => {
    try {
      const [resSet, resBanners, resNews, resJor, resUnions, resAgr, resTv, resTvSch, resRadio] = await Promise.all([
        api.get('/settings').catch(() => ({ data: null })),
        api.get('/banners').catch(() => ({ data: [] })),
        api.get('/news').catch(() => ({ data: [] })),
        api.get('/jornais').catch(() => ({ data: [] })),
        api.get('/unions').catch(() => ({ data: [] })),
        api.get('/agreements').catch(() => ({ data: [] })),
        api.get('/tv/channels').catch(() => ({ data: [] })),
        api.get('/tv/schedules').catch(() => ({ data: [] })),
        api.get('/radio/status').catch(() => ({ data: null }))
      ]);

      if (resSet.data) setSettings(resSet.data);
      if (Array.isArray(resBanners.data)) setBanners(resBanners.data);
      if (Array.isArray(resNews.data)) setNews(resNews.data);
      if (Array.isArray(resJor.data)) setJornais(resJor.data);
      if (Array.isArray(resUnions.data)) setUnions(resUnions.data);
      if (Array.isArray(resAgr.data)) setAgreements(resAgr.data);
      if (Array.isArray(resTv.data)) setTvChannels(resTv.data);
      if (resTvSch.data) setTvSchedules(resTvSch.data);
      if (resRadio.data) setRadioConfig(resRadio.data);
    } catch (err) {
      console.error('Erro ao carregar dados da REST API:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (settings) {
      if (settings.logoUrl) {
        const iconLinks = document.querySelectorAll("link[rel*='icon'], link[rel='apple-touch-icon']");
        iconLinks.forEach(link => {
          link.href = settings.logoUrl;
        });
      }
      if (settings.primaryColor) {
        document.documentElement.style.setProperty('--color-primary', settings.primaryColor);
      }
      if (settings.secondaryColor) {
        document.documentElement.style.setProperty('--color-secondary', settings.secondaryColor);
      }
      if (settings.accentColor) {
        document.documentElement.style.setProperty('--color-accent', settings.accentColor);
      }
      if (settings.highlightColor) {
        document.documentElement.style.setProperty('--color-highlight', settings.highlightColor);
      }
    }
  }, [settings]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage news={news} jornais={jornais} unions={unions} tvChannels={tvChannels} banners={banners} settings={settings} setCurrentPage={setCurrentPage} />;
      case 'president':
        return <PresidentWordPage settings={settings} setCurrentPage={setCurrentPage} />;
      case 'history':
        return <HistoryPage />;
      case 'salary':
        return <SalaryPage />;
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
            banners={banners}
            news={news}
            unions={unions}
            agreements={agreements}
            tvChannels={tvChannels}
            radioConfig={radioConfig}
            settings={settings}
          />
        );
      default:
        return <HomePage news={news} jornais={jornais} unions={unions} tvChannels={tvChannels} banners={banners} settings={settings} setCurrentPage={setCurrentPage} />;
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
