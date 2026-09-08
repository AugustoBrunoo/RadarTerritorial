import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import {
  Users,
  ThumbsUp,
  History,
  ArrowRight,
  Eye,
  EyeOff,
  Circle,
  CheckCircle2,
  Check,
  Loader2,
  UserCheck
} from 'lucide-react';
import SimpleHeader from '../../components/SimpleHeader';
import SimpleFooter from '../../components/SimpleFooter';
import BenefitsColumn from '../../components/Register/BenefitsColumn';
import VerificationModal from '../../components/Register/VerificationModal';
import { signUpUser } from '../../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isDuplicateEmail, setIsDuplicateEmail] = useState(false);

  // Scroll top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (name === 'email' || name === 'confirmEmail') {
      setEmailError(false);
      if (name === 'email') setIsDuplicateEmail(false);
    }
  };

  const { password, confirmPassword } = formData;

  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasMatch = password === confirmPassword && password.length > 0;

  let strengthScore = 0;
  if (password.length > 0) strengthScore += 1;
  if (hasLength && (hasUpper || hasNumber)) strengthScore += 1;
  if (hasLength && hasUpper && hasNumber) strengthScore += 1;
  if (hasLength && hasUpper && hasNumber && hasSpecial) strengthScore += 1;
  if (strengthScore === 4 && hasMatch) strengthScore = 5;

  const getStrengthProps = () => {
    if (strengthScore === 1) return { width: '20%', bg: 'bg-red-500', label: 'Senha Fraca', labelClass: 'text-red-500' };
    if (strengthScore === 2) return { width: '40%', bg: 'bg-amber-400', label: 'Senha Razoável', labelClass: 'text-amber-500' };
    if (strengthScore === 3) return { width: '60%', bg: 'bg-green-400', label: 'Senha Boa', labelClass: 'text-green-500' };
    if (strengthScore >= 4) return { width: strengthScore === 5 ? '100%' : '80%', bg: 'bg-green-500', label: 'Senha Forte', labelClass: 'text-green-600 dark:text-green-500' };
    return { width: '0%', bg: 'bg-transparent', label: 'Força da senha', labelClass: 'text-zinc-500' };
  };

  const strengthProps = getStrengthProps();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email !== formData.confirmEmail) {
      setEmailError(true);
      return;
    }
    if (!hasMatch) {
      alert("As senhas não conferem. Por favor, verifique.");
      return;
    }

    setAuthError('');
    setIsDuplicateEmail(false);
    setIsSubmitting(true);

    const result = await signUpUser({
      email: formData.email,
      password: formData.password,
      nomeCompleto: formData.name
    });

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(false);
        if (result.requiresEmailConfirmation) {
          setShowModal(true);
        } else {
          navigate(redirectPath ? `/login?redirect=${redirectPath}` : '/login');
        }
      }, 1000);
    } else {
      setIsSubmitting(false);
      if (result.isDuplicate) {
        setIsDuplicateEmail(true);
      } else {
        setAuthError(result.error);
      }
    }
  };

  const RequirementItem = ({ isValid, text }) => (
    <div className={`flex items-center gap-1.5 ${isValid ? 'text-green-500 dark:text-green-400' : 'text-zinc-400'}`}>
      {isValid ? <CheckCircle2 className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
      {text}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans selection:bg-red-500 selection:text-white flex flex-col">
      <SimpleHeader backLink="/acesso" />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full flex items-center justify-center min-h-[90vh] animate-fade-in-up relative z-10">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl overflow-hidden w-full flex flex-col md:flex-row">

          {/* COLUNA ESQUERDA: BENEFÍCIOS */}
          <BenefitsColumn />

          {/* COLUNA DIREITA: FORMULÁRIO */}
          <div className="w-full md:w-7/12 p-8 lg:p-12 bg-white dark:bg-zinc-900 flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Criar Conta</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Preencha seus dados para acessar a plataforma.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">Nome de Usuário</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome de usuário ou apelido"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder-zinc-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="joao@exemplo.com"
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder-zinc-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">Confirmar E-mail</label>
                  <input
                    type="email"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    required
                    placeholder="joao@exemplo.com"
                    className={`w-full bg-zinc-50 dark:bg-zinc-950 border rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder-zinc-400 ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 dark:border-zinc-800'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">Senha</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Sua senha segura"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 pr-10 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder-zinc-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex="-1"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">Confirmar Senha</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Repita a senha"
                      className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 pr-10 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder-zinc-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      tabIndex="-1"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Medidor de Força */}
              <div>
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={`text-xs font-semibold transition-colors duration-300 ${strengthProps.labelClass}`}>
                      {strengthProps.label}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ease-out rounded-full ${strengthProps.bg}`}
                      style={{ width: strengthProps.width }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-medium">
                  <RequirementItem isValid={hasLength} text="Mínimo 8 caracteres" />
                  <RequirementItem isValid={hasUpper} text="Letra maiúscula" />
                  <RequirementItem isValid={hasNumber} text="Um número" />
                  <RequirementItem isValid={hasSpecial} text="Símbolo (!@#)" />
                  <div className="sm:col-span-2">
                    <RequirementItem isValid={hasMatch} text="Senhas conferem" />
                  </div>
                </div>
              </div>

              {/* Termos */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center mt-0.5">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      required
                      className="peer opacity-0 absolute h-5 w-5 cursor-pointer"
                    />
                    <div className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-700 rounded bg-white dark:bg-zinc-950 flex items-center justify-center transition-colors peer-checked:bg-red-600 peer-checked:border-red-600 peer-checked:[&_svg]:block">
                      <Check className="hidden h-3.5 w-3.5 text-white pointer-events-none" strokeWidth={3} />
                    </div>
                  </div>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400 select-none leading-tight">
                    Eu concordo com os <Link to="/termos" className="text-red-600 font-bold hover:underline">Termos de Uso</Link> e a <Link to="/termos" className="text-red-600 font-bold hover:underline">Política de Privacidade</Link>.
                  </span>
                </label>
              </div>

              {isDuplicateEmail && (
                <div className="bg-zinc-900 border border-red-900/50 rounded-xl p-5 mb-4 shadow-xl shadow-red-900/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-red-500/10 p-2 rounded-full">
                      <UserCheck className="h-6 w-6 text-red-500" />
                    </div>
                    <h4 className="text-white font-bold text-lg leading-tight">Você já possui uma conta com este e-mail!</h4>
                  </div>
                  <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
                    Identificamos que o e-mail preenchido já está registrado na nossa plataforma.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      type="button"
                      onClick={() => navigate('/login')}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-bold text-sm transition-colors text-center shadow-lg shadow-red-600/20"
                    >
                      Ir para o Login
                    </button>
                    <button 
                      type="button"
                      onClick={() => navigate('/esqueci-senha')}
                      className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white py-2.5 rounded-lg font-bold text-sm transition-colors text-center"
                    >
                      Esqueci minha senha
                    </button>
                  </div>
                </div>
              )}

              {emailError && (
                <div className="text-xs text-red-500 font-bold mt-2">
                  Os e-mails informados não conferem.
                </div>
              )}

              {authError && (
                <div className="text-sm bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-4 rounded-xl font-medium border border-red-200 dark:border-red-900/50">
                  {authError}
                </div>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full py-4 rounded-xl font-bold text-base transition-transform shadow-lg flex justify-center items-center gap-2 ${isSuccess
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-600/30'
                      : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30 hover:-translate-y-1'
                    } ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <><Loader2 className="h-5 w-5 animate-spin" /> Criando conta...</>
                  ) : isSuccess ? (
                    <><Check className="h-5 w-5" /> Conta Criada!</>
                  ) : (
                    <>Criar minha conta <ArrowRight className="h-4 w-4" /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer Simplificado */}
      <SimpleFooter />

      {/* Modal de Verificação de E-mail */}
      <VerificationModal show={showModal} />
    </div>
  );
}
