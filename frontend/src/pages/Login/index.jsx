import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { 
  ArrowRight, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Check, 
  CheckCircle2,
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import SimpleHeader from '../../components/SimpleHeader';
import SimpleFooter from '../../components/SimpleFooter';
import { signInUser, resendConfirmationEmail } from '../../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/central-cidadao';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLogged, setKeepLogged] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendSuccessMessage, setResendSuccessMessage] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setResendSuccessMessage('');
    setIsSubmitting(true);

    const response = await signInUser({ email, password });

    if (response.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(false);
        
        // Redirecionamento Baseado em primeiro_acesso
        if (response.isFirstAccess) {
          navigate('/bem-vindo');
        } else {
          navigate(redirectPath);
        }
      }, 1000);
    } else {
      setIsSubmitting(false);
      setErrorMessage(response.error);
    }
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    setResendSuccessMessage('');
    const res = await resendConfirmationEmail(email);
    setIsResending(false);
    if (res.success) {
      setResendSuccessMessage('E-mail de confirmação reenviado com sucesso! Verifique sua caixa de entrada.');
    } else {
      setErrorMessage(res.error);
    }
  };

  const isEmailNotConfirmed = errorMessage.toLowerCase().includes('ainda não foi confirmado');

  return (
    <div className="transition-colors duration-500 ease-in-out min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans selection:bg-red-500 selection:text-white flex flex-col">
      
      <SimpleHeader backLink="/acesso" />

      {/* === SEÇÃO DE LOGIN (SPLIT LAYOUT) === */}
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full flex items-center justify-center min-h-[90vh] animate-fade-in-up relative z-10">

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl overflow-hidden w-full flex flex-col md:flex-row max-w-5xl">

          {/* === COLUNA ESQUERDA: BOAS-VINDAS === */}
          <div className="w-full md:w-5/12 bg-zinc-900 dark:bg-zinc-950 p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-red-600/20 blur-3xl rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-48 h-48 bg-zinc-600/10 blur-3xl rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 sm:mb-4">
                Bem-vindo<br />de volta!
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mb-6 sm:mb-10 leading-relaxed font-medium">
                O painel da comunidade está esperando. Faça login para acompanhar o status dos seus relatos e interagir com as atualizações recentes da sua região.
              </p>
            </div>

            <div className="relative z-10 mt-6 sm:mt-12 pt-6 sm:pt-8 border-t border-zinc-800 text-xs sm:text-sm text-zinc-500 flex justify-between items-center">
              <span>Ainda não tem conta?</span>
              <Link to="/cadastro" className="text-white font-bold hover:text-red-400 transition-colors flex items-center gap-1">
                Criar Conta <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>

          {/* === COLUNA DIREITA: FORMULÁRIO DE LOGIN === */}
          <div className="w-full md:w-7/12 p-6 sm:p-8 lg:p-12 bg-white dark:bg-zinc-900 flex flex-col justify-center relative">

            <div className="mb-8 sm:mb-10 mt-6 sm:mt-0">
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Entrar na conta</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Acesse seu painel com E-mail e Senha.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>

              {/* E-mail */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">E-mail</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input 
                    type="email" 
                    required 
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder-zinc-400 font-medium" 
                  />
                </div>
              </div>

              {/* Senha */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide">Senha</label>
                  <Link to="/esqueci-senha" className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors">Esqueceu a senha?</Link>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-11 pr-10 py-3.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder-zinc-400 font-medium ${!showPassword ? 'tracking-widest' : ''}`} 
                  />

                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Manter Conectado */}
              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="peer sr-only" 
                      checked={keepLogged}
                      onChange={(e) => setKeepLogged(e.target.checked)}
                    />
                    <div className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-950 flex items-center justify-center transition-colors peer-checked:bg-red-600 peer-checked:border-red-600 peer-checked:[&_svg]:block">
                      <Check className="hidden h-3.5 w-3.5 text-white pointer-events-none" strokeWidth={3} />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 select-none group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    Manter conectado
                  </span>
                </label>
              </div>

              {/* Feedback Messages */}
              {errorMessage && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm font-medium flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                  {isEmailNotConfirmed && (
                    <button 
                      type="button" 
                      onClick={handleResendEmail}
                      disabled={isResending}
                      className="sm:ml-auto bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/60 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                      {isResending ? 'Enviando...' : 'Reenviar E-mail'}
                    </button>
                  )}
                </div>
              )}

              {resendSuccessMessage && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  <span>{resendSuccessMessage}</span>
                </div>
              )}

              {/* Botão Submit */}
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting || isSuccess}
                  className={`w-full py-4 rounded-xl font-black text-base transition-transform shadow-lg flex justify-center items-center gap-2 ${
                    isSuccess 
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-600/30' 
                      : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:-translate-y-1'
                  } ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> Autenticando...</>
                  ) : isSuccess ? (
                    <><Check className="h-5 w-5" /> Acesso Liberado!</>
                  ) : (
                    <>Acessar <ArrowRight className="h-4 w-4" /></>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>

      <SimpleFooter />
    </div>
  );
}
