import React, { useState } from 'react';
import { Music, Upload, Link as LinkIcon, Plus, Trash2, Play, Search, Disc, Clock } from 'lucide-react';
import api from '../../services/api';

export default function RadioDiscoteca({ tracksList = [], refreshTracks }) {
  const [selectedGenre, setSelectedGenre] = useState('TODAS');
  const [uploadMode, setUploadMode] = useState('link'); // 'link' ou 'file'
  const [newTrackName, setNewTrackName] = useState('');
  const [newTrackUrl, setNewTrackUrl] = useState('');
  const [newTrackGenre, setNewTrackGenre] = useState('Música');
  const [addingTrack, setAddingTrack] = useState(false);

  const genres = ['TODAS', 'MÚSICA', 'SAMBA', 'FORRÓ', 'ROCK', 'COMERCIAL', 'VINHETA', 'HORA CERTA', 'PROGRAMA'];

  const filteredTracks = selectedGenre === 'TODAS'
    ? tracksList
    : tracksList.filter(t => (t.genre || '').toUpperCase() === selectedGenre.toUpperCase());

  const handleAddTrack = async (e) => {
    e.preventDefault();
    if (!newTrackName) return alert('Digite o nome da faixa ou vinheta.');

    setAddingTrack(true);
    try {
      await api.post('/radio/tracks', {
        name: newTrackName,
        path: newTrackUrl || '/uploads/radio/audio_sample.mp3',
        genre: newTrackGenre,
        type: newTrackGenre,
        duration: '3:30'
      });
      setNewTrackName('');
      setNewTrackUrl('');
      if (refreshTracks) refreshTracks();
      alert('🎵 Faixa cadastrada com sucesso na Discoteca!');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar faixa.');
    } finally {
      setAddingTrack(false);
    }
  };

  const handleDeleteTrack = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta faixa da discoteca?')) return;
    try {
      await api.delete(`/radio/tracks/${id}`);
      if (refreshTracks) refreshTracks();
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir faixa.');
    }
  };

  return (
    <div className="bg-black text-white rounded-3xl p-6 border border-zinc-800 shadow-2xl space-y-6 font-sans">
      
      {/* CABEÇALHO DA DISCOTECA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-2xl font-black uppercase text-red-500 tracking-tight">BIBLIOTECA & ACERVO MUSICAL — DISCOTECA</h2>
          <p className="text-zinc-400 text-xs font-semibold mt-0.5">Gestão de músicas, vinhetas, chamadas comerciais e materiais de produção.</p>
        </div>
      </div>

      {/* PÍLULAS DE FILTRO POR GÊNERO (MODELO IMAGEM 4) */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
        {genres.map((g) => (
          <button
            key={`pill-${g}`}
            onClick={() => setSelectedGenre(g)}
            className={`px-4 py-2 rounded-2xl text-xs font-black uppercase transition ${
              selectedGenre === g 
                ? 'bg-red-600 text-white shadow-lg scale-105' 
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* PAINEL DE UPLOAD E CADASTRO DUPLO (ARQUIVOS E LINKS) */}
      <div className="grid md:grid-cols-12 gap-6">
        
        {/* BOX DE UPLOAD */}
        <div className="md:col-span-4 bg-zinc-900 p-5 rounded-3xl border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h3 className="text-xs font-black text-white uppercase">Upload de Mídia</h3>
            <div className="flex gap-1 bg-black p-1 rounded-xl border border-zinc-800 text-[10px]">
              <button 
                onClick={() => setUploadMode('link')}
                className={`px-2.5 py-1 rounded-lg font-black uppercase ${uploadMode === 'link' ? 'bg-red-600 text-white' : 'text-zinc-400'}`}
              >
                Link URL
              </button>
              <button 
                onClick={() => setUploadMode('file')}
                className={`px-2.5 py-1 rounded-lg font-black uppercase ${uploadMode === 'file' ? 'bg-red-600 text-white' : 'text-zinc-400'}`}
              >
                MP3 / WAV
              </button>
            </div>
          </div>

          <form onSubmit={handleAddTrack} className="space-y-3 text-xs">
            <div>
              <label className="block text-zinc-400 font-bold uppercase mb-1">Título da Faixa / Vinheta:</label>
              <input 
                type="text" 
                value={newTrackName}
                onChange={(e) => setNewTrackName(e.target.value)}
                placeholder="Ex: Forró do Muído - Musica Nova"
                className="w-full p-3 rounded-xl bg-black border border-zinc-800 text-white font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-zinc-400 font-bold uppercase mb-1">Categoria / Gênero:</label>
              <select 
                value={newTrackGenre}
                onChange={(e) => setNewTrackGenre(e.target.value)}
                className="w-full p-3 rounded-xl bg-black border border-zinc-800 text-white font-bold"
              >
                <option value="Música">Música</option>
                <option value="Samba">Samba</option>
                <option value="Forró">Forró</option>
                <option value="Rock">Rock</option>
                <option value="Vinheta">Vinheta</option>
                <option value="Hora Certa">Hora Certa</option>
                <option value="Comercial">Comercial</option>
                <option value="Programa">Programa</option>
              </select>
            </div>

            {uploadMode === 'link' ? (
              <div>
                <label className="block text-zinc-400 font-bold uppercase mb-1">Link URL (Áudio Streaming / MP3):</label>
                <input 
                  type="text" 
                  value={newTrackUrl}
                  onChange={(e) => setNewTrackUrl(e.target.value)}
                  placeholder="https://servidor.com/audio.mp3"
                  className="w-full p-3 rounded-xl bg-black border border-zinc-800 text-white font-mono text-[11px]"
                />
              </div>
            ) : (
              <div>
                <label className="block text-zinc-400 font-bold uppercase mb-1">Selecione Arquivo do Computador:</label>
                <input 
                  type="file" 
                  accept="audio/*"
                  className="block w-full text-[11px] text-zinc-500 file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[11px] file:font-black file:bg-red-600 file:text-white cursor-pointer"
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={addingTrack}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl uppercase transition shadow-lg flex items-center justify-center gap-2"
            >
              <Plus size={16} /> {addingTrack ? 'Salvando...' : 'Adicionar à Discoteca'}
            </button>
          </form>
        </div>

        {/* TABELA DE MÚSICAS NO ACERVO (MODELO IMAGEM 4) */}
        <div className="md:col-span-8 bg-zinc-900 p-5 rounded-3xl border border-zinc-800 space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <h3 className="text-xs font-black text-white uppercase flex items-center gap-2">
              <Disc size={16} className="text-red-500" /> Lista de Faixas Cadastradas ({filteredTracks.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-black text-zinc-400 uppercase font-black tracking-wider border-b border-zinc-800">
                  <th className="py-3 px-4">ARQUIVO / NOME</th>
                  <th className="py-3 px-4 text-center">TIPO</th>
                  <th className="py-3 px-4 text-center">DURAÇÃO</th>
                  <th className="py-3 px-4 text-right">AÇÕES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 font-medium text-white">
                {filteredTracks.map((tr, idx) => (
                  <tr key={tr.id || `tr-${idx}`} className="hover:bg-zinc-800/60 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-black">
                          <Music size={16} />
                        </div>
                        <div>
                          <div className="font-extrabold text-xs text-white line-clamp-1">{tr.name}</div>
                          <div className="text-[10px] text-zinc-500 font-mono line-clamp-1">{tr.path}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="bg-zinc-800 text-zinc-300 font-black text-[10px] px-2.5 py-1 rounded-xl uppercase border border-zinc-700">
                        {tr.genre || 'MÚSICA'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-zinc-400">
                      {tr.duration || '3:30'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => alert(`▶ Reproduzindo pré-escuta: ${tr.name}`)}
                          className="p-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
                          title="Pré-escutar"
                        >
                          <Play size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteTrack(tr.id)}
                          className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-red-500 transition"
                          title="Excluir"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
