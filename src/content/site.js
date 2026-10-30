// Single source for business facts. Anything `null` is unconfirmed and its UI stays
// hidden until the owner supplies a real value (see docs/REDESIGN.md).
// PLACEHOLDERS for the concept design: whatsapp and social point nowhere real yet.
// The number is deliberately invalid and the socials open each platform's homepage,
// so no stranger's account is linked. Replace before launch.
export const site = {
  name: 'Tutorista',
  email: 'hello@tutorista.pk',
  whatsapp: '920000000000', // digits only, e.g. '923001234567'
  phone: null,
  social: {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    linkedin: 'https://www.linkedin.com/',
  },
}

// Level labels live in the language files under `levels.<id>`.
export const catalog = [
  { id: 'cambridge', subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English Language', 'Economics', 'Accounting'] },
  { id: 'board', subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English', 'Urdu', 'Islamiyat', 'Pakistan Studies'] },
  { id: 'entry', subjects: ['MDCAT', 'ECAT', 'NUST NET', 'FAST NU test', 'LUMS LCAT', 'GIKI test', 'SAT'] },
  { id: 'language', subjects: ['IELTS', 'Spoken English', 'Essay writing'] },
]

// Urdu display names and search aliases. Requests always carry the English name.
export const subjectInfo = {
  'Mathematics': { ur: 'ریاضی', alias: 'maths math riazi riyazi' },
  'Physics': { ur: 'فزکس', alias: 'tabiyat طبیعیات' },
  'Chemistry': { ur: 'کیمسٹری', alias: 'kimya کیمیا' },
  'Biology': { ur: 'بیالوجی', alias: 'hayatiyat حیاتیات bio' },
  'Computer Science': { ur: 'کمپیوٹر سائنس', alias: 'cs computer' },
  'English Language': { ur: 'انگریزی زبان', alias: 'angrezi' },
  'English': { ur: 'انگریزی', alias: 'angrezi' },
  'Economics': { ur: 'اکنامکس', alias: 'maashiyat معاشیات' },
  'Accounting': { ur: 'اکاؤنٹنگ', alias: 'accounts hisab' },
  'Urdu': { ur: 'اردو', alias: 'urdu' },
  'Islamiyat': { ur: 'اسلامیات', alias: 'islamiat islamic' },
  'Pakistan Studies': { ur: 'مطالعہ پاکستان', alias: 'pak studies mutala' },
  'MDCAT': { ur: 'ایم ڈی کیٹ', alias: 'medical entry test' },
  'ECAT': { ur: 'ای کیٹ', alias: 'engineering entry test uet' },
  'NUST NET': { ur: 'نسٹ نیٹ', alias: 'net nust' },
  'FAST NU test': { ur: 'فاسٹ داخلہ ٹیسٹ', alias: 'fast nuces nu entry' },
  'LUMS LCAT': { ur: 'لمز ایل کیٹ', alias: 'lums lcat sbase' },
  'GIKI test': { ur: 'جی آئی کے آئی ٹیسٹ', alias: 'giki gik admission' },
  'SAT': { ur: 'ایس اے ٹی', alias: 'sat' },
  'IELTS': { ur: 'آئلٹس', alias: 'ielts' },
  'Spoken English': { ur: 'بول چال انگریزی', alias: 'speaking angrezi' },
  'Essay writing': { ur: 'مضمون نویسی', alias: 'writing essay' },
}

export function subjectName(subject, lang) {
  return lang === 'ur' ? subjectInfo[subject]?.ur ?? subject : subject
}

// Boards, universities and tests our students prepare for. Marks belong to their owners;
// Tutorista is not affiliated with any of them.
export const examLogos = [
  { src: '/logos/cambridge.webp', alt: 'Cambridge International Education', w: 426 },
  { src: '/logos/biselahore.webp', alt: 'Board of Intermediate and Secondary Education Lahore', w: 87 },
  { src: '/logos/fbise.webp', alt: 'Federal Board of Intermediate and Secondary Education', w: 96 },
  { src: '/logos/lums.webp', alt: 'LUMS', w: 117 },
  { src: '/logos/fast.webp', alt: 'FAST-NUCES', w: 96 },
  { src: '/logos/giki.webp', alt: 'GIK Institute', w: 379 },
  { src: '/logos/nust.webp', alt: 'NUST (NET)', w: 142 },
  { src: '/logos/uet.webp', alt: 'UET Lahore (ECAT)', w: 95 },
  { src: '/logos/sat.webp', alt: 'SAT', w: 139 },
  { src: '/logos/ielts.webp', alt: 'IELTS', w: 255 },
]

export function requestLink({ level, subject, role } = {}) {
  const params = new URLSearchParams()
  if (role) params.set('role', role)
  if (level) params.set('level', level)
  if (subject) params.set('subject', subject)
  const qs = params.toString()
  return qs ? `/contact?${qs}` : '/contact'
}
