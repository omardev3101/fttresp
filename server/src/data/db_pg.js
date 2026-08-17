const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

let pool = null;

function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL || 'postgres://fttresp_user:fttresp_pass_2026@localhost:5432/fttresp_db';
    pool = new Pool({
      connectionString,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false
    });

    pool.on('error', (err) => {
      console.error('Erro inesperado no Pool do PostgreSQL:', err);
    });
  }
  return pool;
}

async function initPgDatabase() {
  try {
    const p = getPool();
    const schemaPath = path.join(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sql = fs.readFileSync(schemaPath, 'utf8');
      await p.query(sql);
      console.log('✔ Tabelas do PostgreSQL inicializadas com sucesso.');
    }
  } catch (err) {
    console.error('Erro ao inicializar tabelas do PostgreSQL:', err.message);
  }
}

module.exports = {
  getPool,
  query: (text, params) => getPool().query(text, params),
  initPgDatabase
};
