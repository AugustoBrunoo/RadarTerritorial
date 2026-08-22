import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../hooks/useAuth';
import {
  ArrowLeft,
  UserCog,
  Pencil,
  BellRing,
  Sliders,
  ShieldCheck,
  KeyRound,
  TriangleAlert,
  LogOut,
  Trash2,
  X,
  User,
  Bell,
  Circle,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import LoggedHeader from '../../components/LoggedHeader/index.jsx';

export default function Settings() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  // Modals state
  const [activeModal, setActiveModal] = useState(null); // 'profile' | 'notifications' | 'security' | 'delete' | null

  // Toast state
  const [toast, setToast] = useState({ show: false, title: '', msg: '' });

  // Profile form state
  const [profileName, setProfileName] = useState('');
  const [initialProfileName, setInitialProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileError, setProfileError] = useState('');

  React.useEffect(() => {
    async function loadUserProfile() {
      let fullName = profile?.nome_completo || profile?.nome || user?.user_metadata?.nome_completo || user?.user_metadata?.nome;
      let email = user?.email;

      if (!fullName || !email) {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser) {
          if (!email) email = currentUser.email;
          if (!fullName) {
            fullName = currentUser.user_metadata?.nome_completo;
          }
          if (!fullName) {
            const { data: dbProfile } = await supabase
              .from('profiles')
              .select('nome_completo')
              .eq('id', currentUser.id)
              .maybeSingle();
            if (dbProfile) {
              fullName = dbProfile.nome_completo;
            }
          }
        }
      }

      if (fullName) {
        setProfileName(fullName);
        setInitialProfileName(fullName);
      }
      if (email) setProfileEmail(email);
    }

    loadUserProfile();
  }, [profile, user]);

  const isProfileChanged = profileName.trim() !== '' && profileName.trim() !== initialProfileName.trim();
  const canSaveProfile = isProfileChanged && !isUpdatingProfile;

  // Security form state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Delete form state
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Toast Helper
  const showToast = (title, msg) => {
    setToast({ show: true, title, msg });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const closeModal = () => {
    setActiveModal(null);
    setProfileName(initialProfileName);
    setProfileError('');
    setPasswordError('');
    setDeleteError('');
    setDeleteConfirmText('');
  };

  // Profile Handlers
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const cleanName = profileName.trim();
    if (!cleanName || isUpdatingProfile) return;

    setIsUpdatingProfile(true);
    setProfileError('');

    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      const currentUserId = user?.id || currentUser?.id;
      if (!currentUserId) throw new Error('Usuário não autenticado.');

      // Atualiza na tabela profiles apenas o campo existente nome_completo
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ nome_completo: cleanName })
        .eq('id', currentUserId);

      if (profileError) throw profileError;

      // Sincroniza também nos metadados do Supabase Auth
      await supabase.auth.updateUser({
        data: { nome_completo: cleanName }
      });

      setInitialProfileName(cleanName);
      setProfileName(cleanName);
      closeModal();
      showToast('Perfil Atualizado!', `Nome atualizado para ${cleanName}.`);
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      setProfileError('Não foi possível atualizar o perfil. Tente novamente.');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Notification Handlers
  const handleSaveNotifications = () => {
    closeModal();
    showToast('Notificações Salvas!', 'Preferências atualizadas com sucesso.');
  };

  // Security Handlers
  const hasLen = newPass.length >= 8;
  const hasUpper = /[A-Z]/.test(newPass);
  const hasNum = /[0-9]/.test(newPass);
  const hasSym = /[!@#$%^&*(),.?":{}|<>]/.test(newPass);
  const hasMatch = newPass.length > 0 && newPass === confirmPass;
  const canUpdatePassword = hasLen && hasUpper && hasNum && hasSym && hasMatch && !isUpdatingPassword;

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!canUpdatePassword) return;

    setIsUpdatingPassword(true);
    setPasswordError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado.');

      // Verificar a senha atual
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPass
      });

      if (signInError) {
        setPasswordError('A senha atual está incorreta.');
        setIsUpdatingPassword(false);
        return;
      }

      // Atualizar para a nova senha
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPass
      });

      if (updateError) {
        throw updateError;
      }

      closeModal();
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
      showToast('Senha Alterada!', 'Sua nova senha foi salva com segurança.');
    } catch (err) {
      console.error('Erro ao atualizar senha:', err);
      setPasswordError('Ocorreu um erro ao atualizar sua senha. Tente novamente.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Delete Handlers
  const canDelete = deleteConfirmText === 'EXCLUIR' && !isDeleting;

  const executeAccountDeletion = async () => {
    if (!canDelete) return;
    setIsDeleting(true);
    setDeleteError('');

    try {
      const { error } = await supabase.rpc('delete_user_account_lgpd');

      if (error) {
        throw error;
      }

      await supabase.auth.signOut();

      closeModal();
      showToast('Conta Removida', 'Sua conta foi encerrada segundo os termos da LGPD.');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error('Erro ao excluir conta:', err);
      setDeleteError('Não foi possível excluir sua conta. Verifique sua conexão e tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  const ReqItem = ({ isValid, text }) => (
    <div className={`flex items-center gap-1.5 ${isValid ? 'text-green-600 dark:text-green-400 font-bold' : 'text-zinc-400'}`}>
      <Circle className="h-3 w-3" fill={isValid ? 'currentColor' : 'none'} /> {text}
    </div>
  );

  return (
    <div className="transition-colors duration-500 ease-in-out min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col antialiased">

      <LoggedHeader />

      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex flex-col justify-start animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Cabeçalho de Boas-Vindas */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white mt-2">Configurações</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-1">
              Gerencie suas informações pessoais, canais de alerta e segurança de acesso.
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-xs transition-colors shadow-sm shrink-0"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </button>
        </div>

        <div className="space-y-4 mb-8">

          {/* CARD 1: Perfil */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center font-bold shrink-0 shadow-sm">
                <UserCog className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">Perfil e Dados Pessoais</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mt-1">
                  Atualize seu nome de exibição e endereço de e-mail associado à sua conta na plataforma.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveModal('profile')}
              className="w-full sm:w-auto bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-extrabold py-3 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shrink-0"
            >
              <Pencil className="h-4 w-4" /> <span>Editar Perfil</span>
            </button>
          </div>

          {/* CARD 2: Notificações */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center font-bold shrink-0 shadow-sm">
                <BellRing className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">Notificações e Alertas</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mt-1">
                  Escolha quais avisos sobre o andamento dos seus relatos você deseja receber por e-mail.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveModal('notifications')}
              className="w-full sm:w-auto bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-extrabold py-3 px-6 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shrink-0"
            >
              <Sliders className="h-4 w-4" /> <span>Configurar Alertas</span>
            </button>
          </div>

          {/* CARD 3: Segurança */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center font-bold shrink-0 shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">Segurança & Senha</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mt-1">
                  Altere sua senha de acesso mantendo os requisitos de segurança e encerre sessões em outros dispositivos.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={() => setActiveModal('security')}
                className="w-full sm:w-auto bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-extrabold py-3 px-5 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <KeyRound className="h-4 w-4" /> <span>Alterar Senha</span>
              </button>
            </div>
          </div>

          {/* CARD 4: Zona de Perigo */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600"></div>
            <div className="flex items-start gap-4 pl-2">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-2xl flex items-center justify-center font-bold shrink-0 shadow-sm">
                <TriangleAlert className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-zinc-900 dark:text-white tracking-tight">Zona de Perigo</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mt-1">
                  Ações definitivas para encerrar sua sessão atual ou excluir permanentemente seus dados pessoais.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0">
              {/* Note: Logout can be handled via the LoggedHeader logic if we want, but we can also just show the modal here */}
              <button
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all"
              >
                <LogOut className="h-4 w-4" /> <span>Sair</span>
              </button>
              <button
                onClick={() => setActiveModal('delete')}
                className="w-full sm:w-auto bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white border border-red-600/20 hover:border-red-600 font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Trash2 className="h-4 w-4" /> <span>Excluir Conta</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* === MODALS === */}

      {/* MODAL 1: Editar Perfil */}
      {activeModal === 'profile' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-950/40 text-red-600 rounded-xl flex items-center justify-center font-bold">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-zinc-900 dark:text-white">Editar Perfil</h3>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Informações Pessoais</p>
                </div>
              </div>
              <button onClick={closeModal} className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {profileError && (
                <div className="p-3 bg-red-100 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-600 dark:text-red-400 font-bold text-left mb-4">
                  {profileError}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Nome de Usuário</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={e => setProfileName(e.target.value)}
                  placeholder="Seu nome completo"
                  required
                  disabled={isUpdatingProfile}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3.5 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-red-600 transition-colors disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">E-mail Cadastrado</label>
                <input
                  type="email"
                  value={profileEmail}
                  readOnly
                  disabled
                  className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3.5 text-sm font-medium text-zinc-500 dark:text-zinc-500 cursor-not-allowed transition-colors"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} disabled={isUpdatingProfile} className="flex-1 py-3.5 rounded-xl font-bold text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-50 transition-all">
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!canSaveProfile}
                  className={`flex-1 py-3.5 rounded-xl font-extrabold text-xs transition-all ${canSaveProfile
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
                    }`}
                >
                  {isUpdatingProfile ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Preferências de Notificação */}
      {activeModal === 'notifications' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-950/40 text-amber-600 rounded-xl flex items-center justify-center font-bold">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-zinc-900 dark:text-white">Canais de Notificação</h3>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Alertas por E-mail</p>
                </div>
              </div>
              <button onClick={closeModal} className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Mudança de Status nos Meus Relatos</h4>
                  <p className="text-[11px] text-zinc-500">Avise quando um relato mudar para 'Encaminhado' ou 'Resolvido'.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-red-600 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Apoios e Comentários da Vizinhança</h4>
                  <p className="text-[11px] text-zinc-500">Notificar quando moradores apoiarem seus relatos.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5 accent-red-600 cursor-pointer" />
              </div>
            </div>
            <button onClick={handleSaveNotifications} className="w-full py-3.5 rounded-xl font-extrabold text-xs bg-red-600 hover:bg-red-700 text-white shadow-md">
              Salvar Preferências
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: Segurança */}
      {activeModal === 'security' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/40 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-zinc-900 dark:text-white">Alterar Senha</h3>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Segurança de Acesso</p>
                </div>
              </div>
              <button onClick={closeModal} className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              {passwordError && (
                <div className="p-3 bg-red-100 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-600 dark:text-red-400 font-bold text-left mb-4">
                  {passwordError}
                </div>
              )}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Senha Atual</label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    required
                    placeholder="Digite a senha atual"
                    value={currentPass}
                    onChange={e => setCurrentPass(e.target.value)}
                    disabled={isUpdatingPassword}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-4 pr-11 py-3.5 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-red-600 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    tabIndex={-1}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-1"
                    title={showCurrentPass ? "Ocultar senha" : "Exibir senha"}
                  >
                    {showCurrentPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Nova Senha</label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    required
                    placeholder="Digite a nova senha"
                    value={newPass}
                    onChange={e => setNewPass(e.target.value)}
                    disabled={isUpdatingPassword}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-4 pr-11 py-3.5 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-red-600 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    tabIndex={-1}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-1"
                    title={showNewPass ? "Ocultar senha" : "Exibir senha"}
                  >
                    {showNewPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">Confirmar Nova Senha</label>
                <div className="relative">
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    required
                    placeholder="Repita a nova senha"
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    disabled={isUpdatingPassword}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-4 pr-11 py-3.5 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-red-600 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    tabIndex={-1}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-1"
                    title={showConfirmPass ? "Ocultar senha" : "Exibir senha"}
                  >
                    {showConfirmPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Widget de Requisitos */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs">
                <span className="block text-[10px] font-black uppercase tracking-wider text-zinc-400 mb-1">Requisitos de Força</span>
                <div className="grid grid-cols-2 gap-2">
                  <ReqItem isValid={hasLen} text="8+ Caracteres" />
                  <ReqItem isValid={hasUpper} text="Maiúscula (A-Z)" />
                  <ReqItem isValid={hasNum} text="Um número (0-9)" />
                  <ReqItem isValid={hasSym} text="Símbolo (!@#)" />
                  <div className="col-span-2">
                    <ReqItem isValid={hasMatch} text="Senhas conferem" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!canUpdatePassword}
                className={`w-full py-3.5 rounded-xl font-extrabold text-xs transition-all ${canUpdatePassword ? 'bg-red-600 hover:bg-red-700 text-white shadow-md' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'}`}
              >
                {isUpdatingPassword ? 'Atualizando...' : 'Atualizar Senha'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Excluir Conta */}
      {activeModal === 'delete' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-950/40 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <TriangleAlert className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-black text-xl text-zinc-900 dark:text-white mb-2">Excluir Conta Permanentemente?</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                Esta ação é <strong className="text-red-600">irreversível</strong>. Todos os seus dados pessoais serão apagados. Seus relatos permanecerão anonimizados.
              </p>
            </div>

            {deleteError && (
              <div className="p-3 bg-red-100 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-600 dark:text-red-400 font-bold text-left">
                {deleteError}
              </div>
            )}

            <div className="space-y-2 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <label className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">Digite <span className="text-red-600 font-extrabold">EXCLUIR</span> para confirmar</label>
              <input
                type="text"
                placeholder="EXCLUIR"
                value={deleteConfirmText}
                onChange={e => setDeleteConfirmText(e.target.value)}
                disabled={isDeleting}
                className="w-full text-center uppercase bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 text-sm font-extrabold text-zinc-900 dark:text-white focus:outline-none focus:border-red-600 disabled:opacity-50"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                disabled={isDeleting}
                className="flex-1 py-3 rounded-xl font-bold text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-50 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={executeAccountDeletion}
                disabled={!canDelete}
                className={`flex-1 py-3 rounded-xl font-extrabold text-xs transition-all ${canDelete ? 'bg-red-600 hover:bg-red-700 text-white shadow-md' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'}`}
              >
                {isDeleting ? 'Excluindo conta...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      <div
        className={`fixed bottom-6 right-6 z-[120] bg-zinc-900 text-white border border-green-500/40 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300 pointer-events-none ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
          <Check className="h-4 w-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold">{toast.title}</h4>
          <p className="text-[11px] text-zinc-400">{toast.msg}</p>
        </div>
      </div>

    </div>
  );
}
