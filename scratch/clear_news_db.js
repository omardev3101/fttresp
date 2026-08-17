const fs = require('fs');
const path = require('path');

// Update database.json
const dbPath = path.join(__dirname, '..', 'server', 'src', 'data', 'database.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
dbData.news = [];
fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');

// Update store.js
const storePath = path.join(__dirname, '..', 'server', 'src', 'data', 'store.js');
let storeContent = fs.readFileSync(storePath, 'utf8');

const newsRegex = /news:\s*\[[\s\S]*?\n  \],/;
storeContent = storeContent.replace(newsRegex, 'news: [],');
fs.writeFileSync(storePath, storeContent, 'utf8');

console.log('Sucesso: Banco de dados de notícias zerado com 0 registros!');
