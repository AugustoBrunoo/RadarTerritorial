/**
 * Utilitários de Segurança e Sanitização
 * Proteção contra XSS, Injeção de Scripts, Open Redirect e Brute Force.
 */

// Expressão regular rigorosa para validação de e-mail (RFC 5322)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Remove scripts maliciosos, tags HTML, caracteres de controle e nulos.
 * @param {string} input 
 * @param {number} maxLength 
 * @returns {string}
 */
export function sanitizeInput(input, maxLength = 255) {
  if (typeof input !== 'string') return '';
  
  return input
    // Remove caracteres nulos e de controle perigosos
    .replace(/\0/g, '')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    // Remove tags HTML/Scripts
    .replace(/<[^>]*>?/gm, '')
    // Limita tamanho
    .slice(0, maxLength)
    .trim();
}

/**
 * Valida formato do e-mail com regras estritas.
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const sanitized = email.trim();
  if (sanitized.length < 5 || sanitized.length > 100) return false;
  return EMAIL_REGEX.test(sanitized);
}

/**
 * Valida e sanitiza rotas de redirecionamento para prevenir Open Redirect.
 * Permite apenas caminhos relativos válidos do próprio domínio (ex: "/admin", "/central-cidadao").
 * Bloqueia "javascript:", "data:", URLs externas ("https://", "//evil.com", etc).
 * @param {string|null} url 
 * @param {string} defaultUrl 
 * @returns {string}
 */
export function sanitizeRedirectUrl(url, defaultUrl = '/central-cidadao') {
  if (!url || typeof url !== 'string') return defaultUrl;

  const trimmed = url.trim();

  // Decodifica para checar payloads disfarçados (ex: %2F%2Fevil.com)
  let decoded = trimmed;
  try {
    decoded = decodeURIComponent(trimmed);
  } catch {
    return defaultUrl;
  }

  // Deve iniciar com uma única barra '/', e não duas '//' ou '/\'
  if (!decoded.startsWith('/') || decoded.startsWith('//') || decoded.startsWith('/\\')) {
    return defaultUrl;
  }

  // Bloqueia protocolos perigosos
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:', 'http:', 'https:'];
  const lower = decoded.toLowerCase();
  for (const protocol of dangerousProtocols) {
    if (lower.includes(protocol)) {
      return defaultUrl;
    }
  }

  // Bloqueia caracteres que tentam quebrar a rota
  if (/[\r\n\t<>"'`]/.test(decoded)) {
    return defaultUrl;
  }

  return trimmed;
}

/**
 * Gerenciador de Rate Limiting no cliente para prevenir ataques de força bruta.
 */
const STORAGE_PREFIX = 'rt_sec_rl_';

export function getRateLimitStatus(actionKey = 'login', maxAttempts = 5, lockoutDurationSeconds = 30) {
  try {
    const raw = sessionStorage.getItem(`${STORAGE_PREFIX}${actionKey}`);
    if (!raw) return { isLocked: false, remainingSeconds: 0, attempts: 0 };

    const data = JSON.parse(raw);
    const now = Date.now();

    if (data.lockoutUntil && data.lockoutUntil > now) {
      const remainingSeconds = Math.ceil((data.lockoutUntil - now) / 1000);
      return { isLocked: true, remainingSeconds, attempts: data.attempts };
    }

    // Se o lockout expirou, reseta
    if (data.lockoutUntil && data.lockoutUntil <= now) {
      sessionStorage.removeItem(`${STORAGE_PREFIX}${actionKey}`);
      return { isLocked: false, remainingSeconds: 0, attempts: 0 };
    }

    return { isLocked: false, remainingSeconds: 0, attempts: data.attempts || 0 };
  } catch {
    return { isLocked: false, remainingSeconds: 0, attempts: 0 };
  }
}

export function registerFailedAttempt(actionKey = 'login', maxAttempts = 5, lockoutDurationSeconds = 30) {
  try {
    const current = getRateLimitStatus(actionKey, maxAttempts, lockoutDurationSeconds);
    const newAttempts = current.attempts + 1;
    const now = Date.now();

    if (newAttempts >= maxAttempts) {
      const lockoutUntil = now + (lockoutDurationSeconds * 1000);
      sessionStorage.setItem(`${STORAGE_PREFIX}${actionKey}`, JSON.stringify({
        attempts: newAttempts,
        lockoutUntil
      }));
      return { isLocked: true, remainingSeconds: lockoutDurationSeconds, attempts: newAttempts };
    }

    sessionStorage.setItem(`${STORAGE_PREFIX}${actionKey}`, JSON.stringify({
      attempts: newAttempts,
      lockoutUntil: null
    }));

    return { isLocked: false, remainingSeconds: 0, attempts: newAttempts };
  } catch {
    return { isLocked: false, remainingSeconds: 0, attempts: 0 };
  }
}

export function resetRateLimit(actionKey = 'login') {
  try {
    sessionStorage.removeItem(`${STORAGE_PREFIX}${actionKey}`);
  } catch {
    // Ignora falhas de storage em modo estrito
  }
}
