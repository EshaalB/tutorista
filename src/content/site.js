// Single source for business facts. Anything `null` is unconfirmed and its UI stays
// hidden until the owner supplies a real value (see docs/REDESIGN.md).
export const site = {
  name: 'Tutorista',
  email: 'hello@tutorista.pk',
  whatsapp: null, // digits only, e.g. '923001234567'
  phone: null,
  social: {
    instagram: null,
    facebook: null,
    linkedin: null,
  },
}

// Level labels live in the language files under `levels.<id>`.
export const catalog = [
  { id: 'cambridge', subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English Language', 'Economics', 'Accounting'] },
  { id: 'board', subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English', 'Urdu', 'Islamiyat', 'Pakistan Studies'] },
  { id: 'entry', subjects: ['MDCAT', 'ECAT', 'NUST NET', 'SAT'] },
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
  'SAT': { ur: 'ایس اے ٹی', alias: 'sat' },
  'IELTS': { ur: 'آئلٹس', alias: 'ielts' },
  'Spoken English': { ur: 'بول چال انگریزی', alias: 'speaking angrezi' },
  'Essay writing': { ur: 'مضمون نویسی', alias: 'writing essay' },
}

export function subjectName(subject, lang) {
  return lang === 'ur' ? subjectInfo[subject]?.ur ?? subject : subject
}

// Exam boards and tests we prepare students for. Marks belong to their owners.
export const examLogos = [
  { src: '/logos/cambridge.webp', alt: 'Cambridge International Education', w: 426 },
  { src: '/logos/fbise.webp', alt: 'Federal Board of Intermediate and Secondary Education', w: 96 },
  { src: '/logos/uet.webp', alt: 'UET Lahore (ECAT)', w: 95 },
  { src: '/logos/nust.webp', alt: 'NUST (NET)', w: 142 },
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
