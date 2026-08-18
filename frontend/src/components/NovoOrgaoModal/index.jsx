import React, { useState } from 'react';
import { Building2, X } from 'lucide-react';

export default function NovoOrgaoModal({ isOpen, onClose, onSave }) {
  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novaArea, setNovaArea] = useState('');
  const [novoAtivo, setNovoAtivo] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!novoNome.trim()) {
      alert('Por favor, informe o nome do órgão.');
      return;
    }
    onSave({
      nome: novoNome,
      email: novoEmail,
      area: novaArea,
      ativo: novoAtivo
    });
    // Reset form
    setNovoNome('');
    setNovoEmail('');
    setNovaArea('');
    setNovoAtivo(true);
  };

  const handleClose = () => {
    onClose();
    // Reset form on close as well
    setNovoNome('');
    setNovoEmail('');
    setNovaArea('');
    setNovoAtivo(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#09090b] w-full max-w-lg rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300">
        
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 dark:bg-red-500/20 p-2 rounded-xl text-red-600 dark:text-red-500 border border-red-200 dark:border-red-500/20">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-zinc-900 dark:text-white leading-none">Cadastrar Novo Órgão</h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Diretório Oficial</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 md:p-8 overflow-y-auto space-y-5">
            {/* Input Nome */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide mb-2">
                Nome do Órgão <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                required
                placeholder="Ex: Secretaria de Conservação"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all" 
              />
            </div>

            {/* Input Email */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide mb-2">
                E-mail Institucional
              </label>
              <input 
                type="email" 
                value={novoEmail}
                onChange={(e) => setNovoEmail(e.target.value)}
                placeholder="contato@orgao.gov.br"
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all" 
              />
            </div>

            {/* Select Área de Atuação */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide mb-2">
                Área de Atuação <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select 
                  value={novaArea}
                  onChange={(e) => setNovaArea(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Selecione a área principal...</option>
                  <option value="Infraestrutura Urbana">Infraestrutura Urbana</option>
                  <option value="Saneamento Básico">Saneamento Básico</option>
                  <option value="Limpeza Urbana">Limpeza Urbana</option>
                  <option value="Iluminação Pública">Iluminação Pública</option>
                  <option value="Segurança e Ordem Pública">Segurança e Ordem Pública</option>
                  <option value="Transporte e Mobilidade">Transporte e Mobilidade</option>
                </select>
              </div>
            </div>

            {/* Toggle Ativo */}
            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 mt-2">
              <div>
                <span className="block text-sm font-bold text-zinc-900 dark:text-white">Órgão Ativo</span>
                <span className="block text-xs text-zinc-500 mt-0.5">Permitir que usuários direcionem relatos.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={novoAtivo}
                  onChange={(e) => setNovoAtivo(e.target.checked)}
                />
                <div className="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>

          <div className="p-5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/50 backdrop-blur-sm flex justify-end gap-3">
            <button 
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm shadow-red-500/20 cursor-pointer"
            >
              Salvar Órgão
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
