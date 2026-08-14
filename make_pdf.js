const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const htmlPath = 'C:\\Users\\Seki_\\.gemini\\antigravity-ide\\brain\\b786b45d-d0bf-4fbb-894b-398d5d155144\\relatorio_tecnico_impressao.html';
const pdfPath = 'C:\\nodejs\\fttresp\\Relatorio_Tecnico_FTTRESP.pdf';
const artifactPdfPath = 'C:\\Users\\Seki_\\.gemini\\antigravity-ide\\brain\\b786b45d-d0bf-4fbb-894b-398d5d155144\\Relatorio_Tecnico_FTTRESP.pdf';

console.log('Iniciando conversão do relatório para PDF...');

const cmd = `"${chromePath}" --headless --disable-gpu --no-sandbox --no-header-footer --print-to-pdf="${pdfPath}" "file:///${htmlPath.replace(/\\/g, '/')}"`;

try {
    const output = execSync(cmd, { encoding: 'utf-8' });
    console.log('Chrome Output:', output);

    if (fs.existsSync(pdfPath)) {
        const stats = fs.statSync(pdfPath);
        console.log(`PDF Gerado com Sucesso! Tamanho: ${stats.size} bytes`);
        fs.copyFileSync(pdfPath, artifactPdfPath);
        console.log(`Cópia salva em artefatos: ${artifactPdfPath}`);
    } else {
        console.error('O arquivo PDF não foi gerado.');
    }
} catch (err) {
    console.error('Erro na execução:', err.message);
}
