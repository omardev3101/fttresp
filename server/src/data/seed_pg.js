const fs = require('fs');
const path = require('path');
const dbPg = require('./db_pg');

async function seedPgDatabase() {
  const dbPath = path.join(__dirname, 'database.json');
  if (!fs.existsSync(dbPath)) {
    console.log('database.json não encontrado para seed.');
    return;
  }

  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const pool = dbPg.getPool();

  try {
    await dbPg.initPgDatabase();

    // 1. Seed Site Settings
    if (data.settings) {
      await pool.query(
        `INSERT INTO site_settings (id, data) VALUES ('default', $1) 
         ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data`,
        [JSON.stringify(data.settings)]
      );
      console.log('✔ Settings salvas no PostgreSQL.');
    }

    // 2. Seed 97 Unions
    if (Array.isArray(data.unions) && data.unions.length > 0) {
      for (const u of data.unions) {
        await pool.query(
          `INSERT INTO unions (id, name, cnpj, city, region, category, address, cep, phone, email, president) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           ON CONFLICT (id) DO UPDATE SET 
             name = EXCLUDED.name, cnpj = EXCLUDED.cnpj, city = EXCLUDED.city, 
             region = EXCLUDED.region, category = EXCLUDED.category, address = EXCLUDED.address,
             cep = EXCLUDED.cep, phone = EXCLUDED.phone, email = EXCLUDED.email, president = EXCLUDED.president`,
          [
            u.id || ('u-' + Math.random().toString(36).substring(2, 7)),
            u.name,
            u.cnpj || '',
            u.city || '',
            u.region || '',
            u.category || '',
            u.address || '',
            u.cep || '',
            u.phone || '',
            u.email || '',
            u.president || 'Valdir de Souza Pestana'
          ]
        );
      }
      console.log(`✔ ${data.unions.length} Sindicatos importados para o PostgreSQL.`);
    }

    // 3. Seed News
    if (Array.isArray(data.news) && data.news.length > 0) {
      for (const n of data.news) {
        await pool.query(
          `INSERT INTO news (id, title, category, summary, content, image_url, file_url, date, author, status, views, wa_shares, fb_shares, link_copies)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
           ON CONFLICT (id) DO NOTHING`,
          [
            n.id, n.title, n.category || 'Geral', n.summary || '', n.content || '',
            n.imageUrl || '', n.fileUrl || '', n.date || '', n.author || '',
            n.status || 'PUBLICADO', n.views || 0, n.waShares || 0, n.fbShares || 0, n.linkCopies || 0
          ]
        );
      }
      console.log(`✔ ${data.news.length} Notícias importadas para o PostgreSQL.`);
    }

    // 4. Seed TV Channels
    if (Array.isArray(data.tvChannels) && data.tvChannels.length > 0) {
      for (const ch of data.tvChannels) {
        await pool.query(
          `INSERT INTO tv_channels (id, name, category, current_show, default_video_url, is_live, show_on_home)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (id) DO NOTHING`,
          [
            ch.id, ch.name, ch.category || 'Jornalismo', ch.currentShow || '',
            ch.defaultVideoUrl || '', ch.isLive || false, ch.showOnHome !== false
          ]
        );
      }
      console.log(`✔ ${data.tvChannels.length} Canais de TV importados para o PostgreSQL.`);
    }

    console.log('✅ Seed completo do PostgreSQL concluído com sucesso!');
  } catch (err) {
    console.error('Erro durante o Seed do PostgreSQL:', err);
  }
}

if (require.main === module) {
  seedPgDatabase().then(() => process.exit(0));
}

module.exports = seedPgDatabase;
