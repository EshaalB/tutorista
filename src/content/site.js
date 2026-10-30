// Single source for business facts. Anything marked `null` is unconfirmed and
// its UI is hidden until the owner supplies a real value (see docs/REDESIGN.md).
export const site = {
  name: 'Tutorista',
  city: 'Lahore',
  email: 'hello@tutorista.pk',
  whatsapp: null, // e.g. '923001234567' (digits only)
  phone: null,
  social: {
    instagram: null,
    facebook: null,
    linkedin: null,
  },
}

export const catalog = [
  {
    id: 'cambridge',
    label: 'O & A Levels',
    blurb: 'Cambridge curriculum, paper by paper',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English Language', 'Economics', 'Accounting'],
  },
  {
    id: 'board',
    label: 'Matric & FSc',
    blurb: 'Punjab and Federal Board',
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'English', 'Urdu', 'Islamiyat', 'Pakistan Studies'],
  },
  {
    id: 'entry',
    label: 'Entry tests',
    blurb: 'Medical, engineering and university',
    subjects: ['MDCAT', 'ECAT', 'NUST NET', 'LUMS / SAT'],
  },
  {
    id: 'language',
    label: 'Language & skills',
    blurb: 'For school, study abroad and work',
    subjects: ['IELTS', 'Spoken English', 'Essay writing', 'Urdu for O Level'],
  },
]

export function requestLink({ level, subject, role } = {}) {
  const params = new URLSearchParams()
  if (role) params.set('role', role)
  if (level) params.set('level', level)
  if (subject) params.set('subject', subject)
  const qs = params.toString()
  return qs ? `/contact?${qs}` : '/contact'
}
