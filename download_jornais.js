const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const BASE_URL = 'https://www.fttresp.org.br/assets/upload/jornal/';
const TARGET_DIR = path.join(__dirname, 'client/public/uploads/jornais');
const DB_FILE = path.join(__dirname, 'server/src/data/database.json');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// Function to download a file
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        file.close();
        fs.unlink(dest, () => {});
        resolve(false);
      }
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      resolve(false);
    });
  });
}

// Function to fetch HTML content of directory listing
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}

async function main() {
  console.log('Buscando edições em https://www.fttresp.org.br/assets/upload/jornal/...');
  try {
    const html = await fetchUrl(BASE_URL);
    // Regex for hrefs inside directory listing
    const matches = [...html.matchAll(/href=["']([^"']+\.(?:jpg|jpeg|png|pdf))["']/gi)];
    
    const fileNames = [...new Set(matches.map(m => m[1].replace('/assets/upload/jornal/', '')))];
    console.log(`Encontrados ${fileNames.length} arquivos de jornais.`);

    let downloadedJornais = [];

    for (let i = 0; i < fileNames.length; i++) {
      const fileName = fileNames[i];
      const fileUrl = BASE_URL + fileName;
      const localPath = path.join(TARGET_DIR, fileName);
      const publicUrl = `/uploads/jornais/${fileName}`;

      console.log(`[${i+1}/${fileNames.length}] Baixando ${fileName}...`);
      await downloadFile(fileUrl, localPath);

      const timestampMatch = fileName.match(/^(\d{10})/);
      let dateStr = '2026-08-01';
      if (timestampMatch) {
        const dateObj = new Date(parseInt(timestampMatch[1]) * 1000);
        if (!isNaN(dateObj.getTime())) {
          dateStr = dateObj.toISOString().split('T')[0];
        }
      }

      downloadedJornais.push({
        id: `jornal-real-${i+1}`,
        title: `Jornal do Rodoviário SP — Edição ${i+1}`,
        category: i % 2 === 0 ? 'Informativo Oficial' : 'Edição Especial',
        date: dateStr,
        summary: `Edição histórica do Jornal do Rodoviário publicada pela FTTRESP em ${dateStr}. Notícias da categoria, lutas e conquistas trabalhistas.`,
        imageUrl: publicUrl,
        fileUrl: publicUrl,
        status: 'PUBLICADO',
        views: 1200 + (i * 150),
        waShares: 45 + i,
        fbShares: 22 + i,
        linkCopies: 14 + i
      });
    }

    console.log(`Download concluído! Gravando ${downloadedJornais.length} jornais no banco de dados...`);

    // Update database.json
    if (fs.existsSync(DB_FILE)) {
      const dbData = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      dbData.jornais = downloadedJornais;
      fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), 'utf8');
      console.log('database.json atualizado com sucesso!');
    }

    // Update store.js
    const storePath = path.join(__dirname, 'server/src/data/store.js');
    if (fs.existsSync(storePath)) {
      let storeContent = fs.readFileSync(storePath, 'utf8');
      // replace jornais array
      const jornaisJson = JSON.stringify(downloadedJornais, null, 2);
      storeContent = storeContent.replace(/jornais:\s*\[[\s\S]*?\],/m, `jornais: ${jornaisJson},`);
      fs.writeFileSync(storePath, storeContent, 'utf8');
      console.log('store.js atualizado com sucesso!');
    }

  } catch (err) {
    console.error('Erro no processamento dos jornais:', err);
  }
}

main();
