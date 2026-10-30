import { useEffect } from 'react'

export function usePageMeta({ title, desc } = {}) {
  useEffect(() => {
    document.title = title ? `${title} | Tutorista` : 'Tutorista | Tested tutors, fair fees, Lahore'
    if (desc) document.querySelector('meta[name="description"]')?.setAttribute('content', desc)
  }, [title, desc])
}
