/**
 * Email validation utility with domain typo detection
 * Ensures email addresses don't have typos like .con, .cpm, gmai.com, etc.
 * and strictly validates top-level domains (.com, .id, .co.id, etc.)
 */

// Explicitly blocked typo TLDs (common keyboard slips)
const BLOCKED_TLD_TYPOS = new Set([
  'con',
  'cpm',
  'cmo',
  'comm',
  'coom',
  'cm',
  'ocm',
  'xom',
  'vom',
  'bom',
  'kom',
  'clm',
  'ner',
  'ne',
  'nett',
  'met',
  'og',
  'or',
  'orgg',
  'coid',
  'coi',
]);

// Allowed valid single TLDs
const VALID_SINGLE_TLDS = new Set([
  'com',
  'id',
  'net',
  'org',
  'co',
  'io',
  'ai',
  'biz',
  'info',
  'tech',
  'app',
  'dev',
  'agency',
  'me',
  'xyz',
  'space',
  'pro',
  'asia',
  'sg',
  'my',
  'uk',
  'au',
  'jp',
  'de',
  'us',
  'ca',
  'fr',
  'it',
  'nl',
  'gov',
  'edu',
  'mil',
  'int',
  'live',
  'store',
  'cloud',
  'design',
  'group',
  'online',
  'site',
  'global',
  'ltd',
  'corp',
  'tv',
  'cc',
]);

// Allowed valid second-level / multi-part TLDs (e.g. .co.id, .ac.id, .com.sg)
const VALID_MULTI_TLDS = new Set([
  'co.id',
  'web.id',
  'my.id',
  'net.id',
  'biz.id',
  'or.id',
  'ac.id',
  'go.id',
  'sch.id',
  'mil.id',
  'co.uk',
  'org.uk',
  'com.sg',
  'com.my',
  'com.au',
]);

/**
 * Validates an email address and checks for domain typos.
 * @param {string} email
 * @param {boolean} isId - Whether to return Indonesian error message
 * @returns {{ isValid: boolean, error: string | null }}
 */
export function validateEmail(email, isId = true) {
  if (!email || !email.trim()) {
    return {
      isValid: false,
      error: isId ? 'Alamat email wajib diisi' : 'Email address is required',
    };
  }

  const cleanEmail = email.trim().toLowerCase();

  // Basic syntax check: user@domain.tld
  const basicRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!basicRegex.test(cleanEmail)) {
    return {
      isValid: false,
      error: isId ? 'Format email tidak valid (contoh: nama@perusahaan.com)' : 'Invalid email format (e.g. name@company.com)',
    };
  }

  const parts = cleanEmail.split('@');
  if (parts.length !== 2) {
    return {
      isValid: false,
      error: isId ? 'Format email tidak valid' : 'Invalid email format',
    };
  }

  const domain = parts[1];

  // 2. Extract TLD parts
  const domainParts = domain.split('.');
  if (domainParts.length < 2) {
    return {
      isValid: false,
      error: isId ? 'Domain email tidak lengkap' : 'Incomplete email domain',
    };
  }

  const lastPart = domainParts[domainParts.length - 1];
  const secondLastPart = domainParts[domainParts.length - 2];
  const multiPartTLD = `${secondLastPart}.${lastPart}`;

  // 3. Check blocked typo TLDs (e.g. .con, .cpm, .coid)
  if (BLOCKED_TLD_TYPOS.has(lastPart) || BLOCKED_TLD_TYPOS.has(multiPartTLD)) {
    return {
      isValid: false,
      error: isId
        ? `Domain '.${lastPart}' tidak valid. Mohon gunakan domain resmi seperti .com, .id, atau .co.id`
        : `Domain '.${lastPart}' is invalid. Please use a valid domain like .com, .id, or .co.id`,
    };
  }

  // 4. Validate against allowed TLDs
  const isMultiValid = VALID_MULTI_TLDS.has(multiPartTLD);
  const isSingleValid = VALID_SINGLE_TLDS.has(lastPart);

  if (!isMultiValid && !isSingleValid) {
    return {
      isValid: false,
      error: isId
        ? `Ekstensi domain '.${lastPart}' tidak valid. Gunakan domain resmi (.com, .id, .co.id, dll)`
        : `Domain extension '.${lastPart}' is not recognized. Please check your domain.`,
    };
  }

  return {
    isValid: true,
    error: null,
  };
}
