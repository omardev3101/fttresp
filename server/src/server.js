const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const store = require('./data/store');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'fttresp-super-secret-key-2026';

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir arquivos estáticos das pastas client/public/uploads e server/uploads
const clientUploadsDir = path.join(__dirname, '../../client/public/uploads');
const serverUploadsDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(clientUploadsDir)) {
  fs.mkdirSync(clientUploadsDir, { recursive: true });
}

app.use('/uploads', express.static(clientUploadsDir));
app.use('/uploads', express.static(serverUploadsDir));

// Middleware de Autenticação JWT para rotas privadas
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Acesso não autorizado: Token não fornecido.' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
}

// Rota de Teste de Saúde
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'FTTRESP Backend REST API', timestamp: new Date().toISOString() });
});

// Configurações do Site e Temas
app.get('/api/settings', (req, res) => {
  const db = store.get();
  res.json(db.settings);
});

app.put('/api/settings', authMiddleware, (req, res) => {
  const updated = store.updateKey('settings', { ...store.get().settings, ...req.body });
  res.json({ message: 'Configurações atualizadas com sucesso!', settings: updated });
});

// GET & CRUD Banners do Carrossel
app.get('/api/banners', (req, res) => {
  const db = store.get();
  res.json(db.banners || []);
});

app.post('/api/banners', authMiddleware, (req, res) => {
  const db = store.get();
  const newBanner = {
    id: 'b-' + Date.now(),
    active: true,
    ...req.body
  };
  if (!db.banners) db.banners = [];
  db.banners.push(newBanner);
  store.save(db);
  res.status(201).json(newBanner);
});

app.put('/api/banners/:id', authMiddleware, (req, res) => {
  const db = store.get();
  const idx = (db.banners || []).findIndex(b => b.id === req.params.id);
  if (idx !== -1) {
    db.banners[idx] = { ...db.banners[idx], ...req.body };
    store.save(db);
    return res.json(db.banners[idx]);
  }
  res.status(404).json({ error: 'Banner não encontrado.' });
});

app.delete('/api/banners/:id', authMiddleware, (req, res) => {
  const db = store.get();
  db.banners = (db.banners || []).filter(b => b.id !== req.params.id);
  store.save(db);
  res.json({ message: 'Banner removido com sucesso!' });
});

// GET & PUT Configurações Globais do Site (Gestão do Site)
app.get('/api/settings', (req, res) => {
  const db = store.get();
  res.json(db.settings || {});
});

app.put('/api/settings', authMiddleware, (req, res) => {
  const db = store.get();
  db.settings = { ...db.settings, ...req.body };
  store.save(db);
  res.json(db.settings);
});
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && (password === 'admin123' || password === 'admin')) {
    const token = jwt.sign({ username: 'admin', role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
    return res.json({ token, user: { username: 'admin', name: 'Operador FTTRESP', role: 'admin' } });
  }
  return res.status(401).json({ error: 'Usuário ou senha incorretos.' });
});

// GET & CRUD Notícias
app.get('/api/news', (req, res) => {
  const db = store.get();
  res.json(db.news || []);
});

app.post('/api/news', authMiddleware, (req, res) => {
  const db = store.get();
  const newItem = {
    id: 'news-' + Date.now(),
    date: new Date().toISOString().split('T')[0],
    author: req.body.author || 'Operador FTTRESP',
    ...req.body
  };
  db.news.unshift(newItem);
  store.save(db);
  res.status(201).json(newItem);
});

const https = require('https');

const fetchRssFeed = (url) => {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
};

const parseRssItems = (xml, defaultCategory, imageFallback) => {
  const items = [];
  const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

  for (const itemXml of itemMatches) {
    const titleMatch = itemXml.match(/<title>(.*?)<\/title>/);
    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
    const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);
    const descMatch = itemXml.match(/<description>(.*?)<\/description>/);

    if (titleMatch && titleMatch[1]) {
      let rawTitle = titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim();
      rawTitle = rawTitle.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      const sourceMatch = rawTitle.split(' - ');
      const cleanTitle = sourceMatch.length > 1 ? sourceMatch.slice(0, -1).join(' - ') : rawTitle;
      const source = sourceMatch.length > 1 ? sourceMatch[sourceMatch.length - 1] : 'Notícias FTTRESP';

      let cleanDesc = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : '';
      cleanDesc = cleanDesc.replace(/&amp;/g, '&').replace(/&quot;/g, '"').substring(0, 220);

      const pubDate = pubDateMatch ? new Date(pubDateMatch[1]) : new Date();
      const formattedDate = isNaN(pubDate.getTime()) ? new Date().toISOString().split('T')[0] : pubDate.toISOString().split('T')[0];
      const cleanLink = linkMatch ? linkMatch[1].trim() : '';

      items.push({
        title: cleanTitle,
        category: defaultCategory,
        summary: cleanDesc || `${cleanTitle}. Fonte: ${source}. Matéria atualizada do setor de transportes rodoviários de SP.`,
        content: `<p><strong>${cleanTitle}</strong></p><p>Matéria relevante sobre o setor de transportes rodoviários, de passageiros e cargas no Estado de São Paulo.</p><p>Fonte da publicação: ${source}.</p>`,
        imageUrl: imageFallback,
        fileUrl: cleanLink,
        date: formattedDate,
        author: source,
        status: 'PUBLICADO',
        views: Math.floor(Math.random() * 800) + 200,
        waShares: Math.floor(Math.random() * 120) + 15,
        fbShares: Math.floor(Math.random() * 45) + 5,
        linkCopies: Math.floor(Math.random() * 30) + 3
      });
    }
  }
  return items;
};

app.delete('/api/news/:id', authMiddleware, (req, res) => {
  const db = store.get();
  db.news = db.news.filter(n => n.id !== req.params.id);
  store.save(db);
  res.json({ message: 'Notícia removida com sucesso!' });
});

app.post('/api/news/sync-web', authMiddleware, async (req, res) => {
  const db = store.get();
  const existingTitles = new Set((db.news || []).map(n => (n.title || '').toLowerCase().trim()));

  const feeds = [
    {
      url: 'https://news.google.com/rss/search?q=transporte+rodoviario+sindicato+SP&hl=pt-BR&gl=BR&ceid=BR:pt-419',
      category: 'Rodoviários',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
    },
    {
      url: 'https://news.google.com/rss/search?q=transporte+de+cargas+caminhoneiros+SP&hl=pt-BR&gl=BR&ceid=BR:pt-419',
      category: 'Cargas',
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'
    },
    {
      url: 'https://news.google.com/rss/search?q=piso+salarial+conven%C3%A7%C3%A3o+coletiva+motoristas+SP&hl=pt-BR&gl=BR&ceid=BR:pt-419',
      category: 'Trabalhista',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80'
    },
    {
      url: 'https://news.google.com/rss/search?q=transporte+urbano+passageiros+onibus+SP&hl=pt-BR&gl=BR&ceid=BR:pt-419',
      category: 'Urbano',
      image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80'
    }
  ];

  let addedCount = 0;

  try {
    for (const feed of feeds) {
      const xml = await fetchRssFeed(feed.url);
      const items = parseRssItems(xml, feed.category, feed.image);

      for (const item of items) {
        const titleKey = (item.title || '').toLowerCase().trim();
        if (titleKey && !existingTitles.has(titleKey)) {
          existingTitles.add(titleKey);
          db.news.unshift({
            id: 'n-web-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
            ...item
          });
          addedCount++;
        }
      }
    }

    if (addedCount > 0) {
      store.save(db);
    }

    res.json({
      success: true,
      message: `${addedCount} novas notícias do setor rodoviário foram capturadas e publicadas com sucesso!`,
      addedCount,
      totalNews: db.news.length
    });
  } catch (err) {
    console.error('Erro na sincronização de notícias:', err);
    res.status(500).json({ error: 'Falha ao sincronizar notícias da web.' });
  }
});

// GET & CRUD Sindicatos Filiados (97 Sindicatos)
app.get('/api/unions', (req, res) => {
  const db = store.get();
  const { city, region, q } = req.query;
  let list = db.unions || [];

  if (q) {
    const term = q.toLowerCase();
    list = list.filter(u => 
      u.name.toLowerCase().includes(term) ||
      u.city.toLowerCase().includes(term) ||
      u.region.toLowerCase().includes(term) ||
      u.category.toLowerCase().includes(term)
    );
  }
  if (city) {
    list = list.filter(u => u.city.toLowerCase().includes(city.toLowerCase()));
  }
  if (region) {
    list = list.filter(u => u.region.toLowerCase().includes(region.toLowerCase()));
  }

  res.json(list);
});

app.post('/api/unions', authMiddleware, (req, res) => {
  const db = store.get();
  const newItem = { id: 'u-' + Date.now(), ...req.body };
  db.unions.push(newItem);
  store.save(db);
  res.status(201).json(newItem);
});

app.put('/api/unions/:id', authMiddleware, (req, res) => {
  const db = store.get();
  const idx = (db.unions || []).findIndex(u => u.id === req.params.id);
  if (idx !== -1) {
    db.unions[idx] = { ...db.unions[idx], ...req.body };
    store.save(db);
    return res.json(db.unions[idx]);
  }
  res.status(404).json({ error: 'Sindicato não encontrado.' });
});

app.delete('/api/unions/:id', authMiddleware, (req, res) => {
  const db = store.get();
  db.unions = db.unions.filter(u => u.id !== req.params.id);
  store.save(db);
  res.json({ message: 'Sindicato removido.' });
});

// GET & CRUD Convenções Coletivas
app.get('/api/agreements', (req, res) => {
  const db = store.get();
  const { category, year } = req.query;
  let list = db.agreements || [];
  if (category) {
    list = list.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }
  if (year) {
    list = list.filter(a => String(a.year) === String(year));
  }
  res.json(list);
});

app.post('/api/agreements', authMiddleware, (req, res) => {
  const db = store.get();
  const newItem = { id: 'c-' + Date.now(), ...req.body };
  db.agreements.unshift(newItem);
  store.save(db);
  res.status(201).json(newItem);
});

// GET & CRUD Web TV Multi-Canais
app.get('/api/tv/channels', (req, res) => {
  const db = store.get();
  res.json(db.tvChannels || []);
});

app.post('/api/tv/channels', authMiddleware, (req, res) => {
  const db = store.get();
  const newChannel = { id: 'tv-' + Date.now(), ...req.body };
  db.tvChannels.push(newChannel);
  store.save(db);
  res.status(201).json(newChannel);
});

app.put('/api/tv/channels/:id', authMiddleware, (req, res) => {
  const db = store.get();
  const idx = db.tvChannels.findIndex(c => c.id === req.params.id);
  if (idx !== -1) {
    db.tvChannels[idx] = { ...db.tvChannels[idx], ...req.body };
    store.save(db);
    return res.json(db.tvChannels[idx]);
  }
  res.status(404).json({ error: 'Canal não encontrado.' });
});

app.delete('/api/tv/channels/:id', authMiddleware, (req, res) => {
  const db = store.get();
  db.tvChannels = (db.tvChannels || []).filter(c => c.id !== req.params.id);
  store.save(db);
  res.json({ message: 'Canal removido com sucesso!' });
});

// GET & CRUD Tickers / Letreiros da TV
app.get('/api/tv/tickers', (req, res) => {
  const db = store.get();
  res.json(db.tvTickers || [
    { id: 't-1', title: '01', message: 'FILIE-SE AO SINDICATO DOS TRABALHADORES EM TRANSPORTES RODOVIÁRIOS. UNIDOS SOMOS MAIS FORTES!', target: 'TODAS AS TELAS', hours: '08:00 - 22:00', status: 'ATIVO AGORA', speed: 'medium' }
  ]);
});

app.post('/api/tv/tickers', authMiddleware, (req, res) => {
  const db = store.get();
  const item = { id: 't-' + Date.now(), speed: 'medium', ...req.body };
  if (!db.tvTickers) db.tvTickers = [];
  db.tvTickers.push(item);
  store.save(db);
  res.status(201).json(item);
});

// GET & CRUD Terminais / Monitores
app.get('/api/tv/terminals', (req, res) => {
  const db = store.get();
  res.json(db.tvTerminals || [
    { id: 'term-1', name: 'RECEPÇÃO', location: 'Sede Principal', count: '1 vídeo na sequência', status: 'Online' },
    { id: 'term-2', name: 'PRESIDÊNCIA', location: 'Gabinete Presidencial', count: '2 vídeos na sequência', status: 'Online' },
    { id: 'term-3', name: 'SUBSÊDE SANTOS', location: 'Baixada Santista', count: '1 vídeo na sequência', status: 'Online' },
    { id: 'term-4', name: 'SUBSÊDE CAMPINAS', location: 'Região Campinas', count: '1 vídeo na sequência', status: 'Online' },
    { id: 'term-5', name: 'TV FTTRESP', location: 'Terminal Central', count: '2 vídeos na sequência', status: 'Online' }
  ]);
});

app.post('/api/tv/terminals', authMiddleware, (req, res) => {
  const db = store.get();
  const item = { id: 'term-' + Date.now(), status: 'Online', ...req.body };
  if (!db.tvTerminals) db.tvTerminals = [];
  db.tvTerminals.push(item);
  store.save(db);
  res.status(201).json(item);
});

// GET & CRUD Rádio Web (Faixas, Vinhetas e Grade 24/7)
app.get('/api/radio/tracks', (req, res) => {
  const db = store.get();
  res.json(db.radioTracks || [
    { id: 'tr-1', name: 'FORRÓ DO MUÍDO - CHAMA ESSA CERVEJA BY DJ DAVID STROMPA', path: '/uploads/radio/forro1.mp3', genre: 'Música', duration: '4:11', type: 'Música' },
    { id: 'tr-2', name: 'FORRÓ DO MUÍDO - ANJO PINTADO', path: '/uploads/radio/forro2.mp3', genre: 'Música', duration: '3:45', type: 'Música' },
    { id: 'tr-3', name: 'FORRÓ DO MUÍDO - CUIDADO', path: '/uploads/radio/forro3.mp3', genre: 'Música', duration: '4:27', type: 'Música' },
    { id: 'tr-4', name: 'VINHETA FTTRESP - 24 HORAS COM VOCÊ', path: '/uploads/radio/vinheta1.mp3', genre: 'Vinheta', duration: '0:15', type: 'Vinheta' },
    { id: 'tr-5', name: 'HORA CERTA FTTRESP', path: '/uploads/radio/horacerta.mp3', genre: 'Hora Certa', duration: '0:08', type: 'Hora Certa' }
  ]);
});

app.post('/api/radio/tracks', authMiddleware, (req, res) => {
  const db = store.get();
  const track = { id: 'tr-' + Date.now(), duration: '3:30', ...req.body };
  if (!db.radioTracks) db.radioTracks = [];
  db.radioTracks.unshift(track);
  store.save(db);
  res.status(201).json(track);
});

app.delete('/api/radio/tracks/:id', authMiddleware, (req, res) => {
  const db = store.get();
  db.radioTracks = (db.radioTracks || []).filter(t => t.id !== req.params.id);
  store.save(db);
  res.json({ message: 'Faixa removida com sucesso!' });
});

app.get('/api/radio/status', (req, res) => {
  const db = store.get();
  res.json(db.radioConfig || {
    isLive: true,
    listeners: 1,
    currentTrack: 'VEM ME AMAR - FORRÓ DO MUÍDO [MUSICA NOVA!]',
    previousTrack: 'NENHUMA ANTERIOR',
    nextTrack: 'FIM DA PLAYLIST'
  });
});

app.post('/api/tv/schedules', authMiddleware, (req, res) => {
  const db = store.get();
  const newSched = { id: 'sched-' + Date.now(), ...req.body };
  db.tvSchedules.push(newSched);
  store.save(db);
  res.status(201).json(newSched);
});

app.get('/api/tv/ads', (req, res) => {
  const db = store.get();
  res.json(db.ads || []);
});

// GET & CRUD Rádio Web Config & AutoDJ Status
app.get('/api/radio/status', (req, res) => {
  const db = store.get();
  res.json(db.radioConfig || {});
});

app.put('/api/radio/status', authMiddleware, (req, res) => {
  const db = store.get();
  db.radioConfig = { ...db.radioConfig, ...req.body };
  store.save(db);
  res.json(db.radioConfig);
});

// GET & CRUD Jornais & Informativos PDF
app.get('/api/jornais', (req, res) => {
  const db = store.get();
  res.json(db.jornais || []);
});

app.post('/api/jornais', authMiddleware, (req, res) => {
  const db = store.get();
  const newItem = { id: 'j-' + Date.now(), views: 0, waShares: 0, fbShares: 0, linkCopies: 0, status: 'PUBLICADO', ...req.body };
  if (!db.jornais) db.jornais = [];
  db.jornais.unshift(newItem);
  store.save(db);
  res.status(201).json(newItem);
});

app.put('/api/jornais/:id', authMiddleware, (req, res) => {
  const db = store.get();
  if (!db.jornais) db.jornais = [];
  const idx = db.jornais.findIndex(j => j.id === req.params.id);
  if (idx !== -1) {
    db.jornais[idx] = { ...db.jornais[idx], ...req.body };
    store.save(db);
    return res.json(db.jornais[idx]);
  }
  res.status(404).json({ error: 'Jornal não encontrado.' });
});

app.delete('/api/jornais/:id', authMiddleware, (req, res) => {
  const db = store.get();
  if (!db.jornais) db.jornais = [];
  db.jornais = db.jornais.filter(j => j.id !== req.params.id);
  store.save(db);
  res.json({ message: 'Jornal removido com sucesso.' });
});

// GET & CRUD Categorias
app.get('/api/categorias', (req, res) => {
  const db = store.get();
  res.json(db.categorias || []);
});

app.post('/api/categorias', authMiddleware, (req, res) => {
  const db = store.get();
  const newItem = { id: 'cat-' + Date.now(), count: 0, status: 'ATIVO', ...req.body };
  if (!db.categorias) db.categorias = [];
  db.categorias.unshift(newItem);
  store.save(db);
  res.status(201).json(newItem);
});

app.put('/api/categorias/:id', authMiddleware, (req, res) => {
  const db = store.get();
  if (!db.categorias) db.categorias = [];
  const idx = db.categorias.findIndex(c => c.id === req.params.id);
  if (idx !== -1) {
    db.categorias[idx] = { ...db.categorias[idx], ...req.body };
    store.save(db);
    return res.json(db.categorias[idx]);
  }
  res.status(404).json({ error: 'Categoria não encontrada.' });
});

app.delete('/api/categorias/:id', authMiddleware, (req, res) => {
  const db = store.get();
  if (!db.categorias) db.categorias = [];
  db.categorias = db.categorias.filter(c => c.id !== req.params.id);
  store.save(db);
  res.json({ message: 'Categoria removida com sucesso.' });
});

// POST & GET Denúncias Anônimas
app.post('/api/denuncias', (req, res) => {
  const db = store.get();
  const newDenuncia = {
    id: 'd-' + Date.now(),
    protocol: `DEN-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    date: new Date().toLocaleString('pt-BR'),
    status: 'Pendente',
    ...req.body
  };
  db.denuncias.unshift(newDenuncia);
  store.save(db);
  res.status(201).json({ message: 'Denúncia registrada com sucesso!', protocol: newDenuncia.protocol });
});

app.get('/api/denuncias', authMiddleware, (req, res) => {
  const db = store.get();
  res.json(db.denuncias || []);
});

// POST /api/upload - Recebe arquivo local em base64 ou multipart e salva na pasta public/uploads
app.post('/api/upload', authMiddleware, (req, res) => {
  try {
    const { fileName, fileData } = req.body;
    if (!fileName || !fileData) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    }

    const uploadsDir = path.join(__dirname, '../../client/public/uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const cleanFileName = Date.now() + '-' + fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = path.join(uploadsDir, cleanFileName);

    // Extract base64 content
    const base64Data = fileData.replace(/^data:([A-Za-z-+\/]+);base64,/, '');
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

    const fileUrl = `/uploads/${cleanFileName}`;
    res.status(201).json({ message: 'Arquivo enviado com sucesso!', url: fileUrl });
  } catch (err) {
    console.error('Erro no upload:', err);
    res.status(500).json({ error: 'Falha no processamento do arquivo.' });
  }
});

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`Servidor Backend FTTRESP rodando na porta ${PORT}`);
  console.log(`REST API disponível em http://localhost:${PORT}/api`);
  console.log(`==================================================`);
});
