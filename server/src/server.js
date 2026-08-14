const express = require('express');
const cors = require('cors');
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

// Servir arquivos estáticos se houver uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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

// Autenticação Admin (Login)
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

app.delete('/api/news/:id', authMiddleware, (req, res) => {
  const db = store.get();
  db.news = db.news.filter(n => n.id !== req.params.id);
  store.save(db);
  res.json({ message: 'Notícia removida com sucesso!' });
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

// GET & CRUD Grade de Programação Semanal da TV
app.get('/api/tv/schedules', (req, res) => {
  const db = store.get();
  res.json(db.tvSchedules || []);
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

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`Servidor Backend FTTRESP rodando na porta ${PORT}`);
  console.log(`REST API disponível em http://localhost:${PORT}/api`);
  console.log(`==================================================`);
});
