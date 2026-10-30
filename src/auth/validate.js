export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
export const isPassword = (v) => v.length >= 8 && /\d/.test(v)
