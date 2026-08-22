import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  MapPin,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  LockIcon,
  Circle,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check
} from 'lucide-react';

import SimpleHeader from '../../components/SimpleHeader';

export default function RedefinicaoSenha() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Password requirements
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasMatch = password === confirmPassword && password.length > 0;

  // Calculate strength score
  let strengthScore = 0;
  if (password.length > 0) strengthScore += 1;
  if (hasLength && (hasUpper || hasNumber)) strengthScore += 1;
  if (hasLength && hasUpper && hasNumber) strengthScore += 1;
  if (hasLength && hasUpper && hasNumber && hasSpecial) strengthScore += 1;
  if (strengthScore === 4 && hasMatch) strengthScore = 5;

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!hasLength || !hasUpper || !hasNumber || !hasSpecial || !hasMatch) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  const getStrengthProps = () => {
    if (strengthScore === 1) return { width: '20%', bg: 'bg-red-500', label: 'Senha Fraca', colorClass: 'text-red-500' };
    if (strengthScore === 2) return { width: '40%', bg: 'bg-amber-400', label: 'Senha Razoável', colorClass: 'text-amber-500' };
    if (strengthScore === 3) return { width: '60%', bg: 'bg-emerald-400', label: 'Senha Boa', colorClass: 'text-emerald-500' };
    if (strengthScore >= 4) return { width: strengthScore === 5 ? '100%' : '80%', bg: 'bg-emerald-500', label: 'Senha Forte', colorClass: 'text-emerald-600 dark:text-emerald-400' };
    return { width: '0%', bg: 'bg-transparent', label: 'Força da senha', colorClass: 'text-zinc-500' };
  };

  const strengthProps = getStrengthProps();
  const currentYear = new Date().getFullYear();

  const ReqItem = ({ isValid, text }) => (
    <div className={`flex items-center gap-1.5 ${isValid ? 'text-emerald-500 dark:text-emerald-400' : 'text-zinc-400'}`}>
      {isValid ? <CheckCircle2 className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
      {text}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans selection:bg-red-500 selection:text-white flex flex-col">

      <SimpleHeader backLink="/login" />

      {/* === SEÇÃO DE TROCA DE SENHA === */}
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full flex items-center justify-center min-h-[90vh] animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl overflow-hidden w-full flex flex-col md:flex-row max-w-5xl">

          {/* === COLUNA ESQUERDA === */}
          <div className="w-full md:w-5/12 bg-zinc-900 dark:bg-zinc-950 p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-red-600/20 blur-3xl rounded-full pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-48 h-48 bg-emerald-600/10 blur-3xl rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 sm:mb-4">
                Nova senha,<br /><span className="text-red-500">acesso seguro.</span>
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mb-6 sm:mb-10 leading-relaxed font-medium">
                Defina uma senha forte com ao menos 8 caracteres para garantir a total proteção do seu perfil e
                dos seus dados no Radar Territorial.
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-zinc-800 text-red-400 mt-0.5">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <p className="text-zinc-400"><strong className="text-white">Use combinações:</strong> Misture letras maiúsculas, números e caracteres especiais.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-zinc-800 text-red-400 mt-0.5">
                    <Lock className="h-4 w-4" />
                  </div>
                  <p className="text-zinc-400"><strong className="text-white">Exclusividade:</strong> Evite utilizar a mesma senha em múltiplos serviços.</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-zinc-800 text-xs sm:text-sm text-zinc-500 flex justify-between items-center">
              <span>Lembrou a senha?</span>
              <Link to="/login" className="text-white font-bold hover:text-red-400 transition-colors flex items-center gap-1">
                Ir para o Login <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* === COLUNA DIREITA === */}
          <div className="w-full md:w-7/12 p-6 sm:p-8 lg:p-12 bg-white dark:bg-zinc-900 flex flex-col justify-center relative">
            <div className="mb-6 sm:mb-8 mt-4 sm:mt-0">
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                Criar Nova Senha
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
                Preencha e confirme sua nova chave de acesso abaixo.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleResetPassword}>

              {/* Nova Senha */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
                  Nova Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Digite sua nova senha"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setShowError(false); }}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-11 pr-11 py-3.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder-zinc-400 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirmar Nova Senha */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
                  Confirmar Nova Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="Repita a nova senha"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setShowError(false); }}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-11 pr-11 py-3.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder-zinc-400 font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Medidor de Força e Checklist */}
              <div className="pt-1">
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={`text-xs font-semibold transition-colors duration-300 ${strengthProps.colorClass}`}>
                      {strengthProps.label}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ease-out rounded-full ${strengthProps.bg}`}
                      style={{ width: strengthProps.width }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-medium text-zinc-400">
                  <ReqItem isValid={hasLength} text="Mínimo 8 caracteres" />
                  <ReqItem isValid={hasUpper} text="Letra maiúscula" />
                  <ReqItem isValid={hasNumber} text="Um número" />
                  <ReqItem isValid={hasSpecial} text="Símbolo (!@#)" />
                  <div className="sm:col-span-2">
                    <ReqItem isValid={hasMatch} text="Senhas conferem" />
                  </div>
                </div>
              </div>

              {/* Erro */}
              {showError && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
                  <AlertCircle className="h-4 w-4" /> Por favor, atenda a todos os requisitos acima para redefinir.
                </div>
              )}

              {/* Botão Submit */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-bold text-base transition-all shadow-lg flex justify-center items-center gap-2 group ${isSubmitting ? 'bg-red-600/80 cursor-not-allowed opacity-80 text-white' : 'bg-red-600 hover:bg-red-700 text-white hover:-translate-y-1 shadow-red-600/30'}`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Salvando nova senha...</span>
                    </>
                  ) : (
                    <>
                      <span>Redefinir Senha</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* === MODAL DE SUCESSO === */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden text-center">

            <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/10 blur-2xl rounded-full pointer-events-none"></div>

            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-5 shadow-inner">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
              Senha Alterada!
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium mb-6">
              Sua senha foi redefinida com sucesso. Agora você já pode usar suas novas credenciais para acessar sua
              conta no <strong className="text-zinc-900 dark:text-white">Radar Territorial</strong>.
            </p>

            <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-xs text-zinc-500 dark:text-zinc-400 mb-6 text-left flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-500 flex-shrink-0" />
              <span>Sua sessão anterior foi encerrada por segurança. Faça login novamente para continuar.</span>
            </div>

            <div className="space-y-3">
              <Link to="/login" className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 group">
                <span>Ir para o Login Agora</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* === FOOTER SIMPLIFICADO === */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090B] mt-auto relative z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-500 text-sm font-medium">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-red-600" />
            <span className="text-zinc-900 dark:text-white font-bold tracking-tight">Radar<span className="text-red-600">Territorial</span></span>
            <span>© {currentYear}</span>
          </div>
          <div className="flex gap-6 font-semibold text-zinc-600 dark:text-zinc-400">
            <Link to="/termos" className="hover:text-red-600 transition-colors">Privacidade e Termos de Uso</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
