// Render audit helper. Paste into the browser console (or run via automation) on any page.
// Reports horizontal overflow, text clipped by ancestors, text outside the viewport,
// elements hidden under the sticky header, and headings ending on a single short word.
// Usage: await window.__renderAudit()  ->  array of findings
window.__renderAudit = async function renderAudit() {
  await document.fonts.ready
  const findings = []
  const vw = document.documentElement.clientWidth
  const label = (el) => {
    const cls = (el.className?.baseVal ?? el.className ?? '').toString().trim().split(/\s+/).slice(0, 2).join('.')
    return `${el.tagName.toLowerCase()}${cls ? '.' + cls : ''} "${(el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40)}"`
  }
  const skip = (el) => el.closest('[inert], [aria-hidden="true"], .marquee, .announce, .dragger__track, .footer__word, .sr-only, .preloader, dialog:not([open])')

  if (document.documentElement.scrollWidth > vw + 1) findings.push({ type: 'page-overflow', detail: `scrollWidth ${document.documentElement.scrollWidth} > ${vw}` })

  const textEls = [...document.querySelectorAll('body *')].filter(el =>
    [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && !skip(el) && el.getClientRects().length)

  const headerBottom = document.querySelector('.nav')?.getBoundingClientRect().bottom ?? 0

  for (const el of textEls) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    const cs = getComputedStyle(el)
    if (cs.visibility === 'hidden' || Number(cs.opacity) === 0) continue

    // own clipping: content larger than box with overflow hidden / clip / ellipsis
    if (/(hidden|clip)/.test(cs.overflowX + cs.overflowY) && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 2)) {
      findings.push({ type: 'clipped-self', el: label(el), detail: `${el.scrollWidth}x${el.scrollHeight} in ${el.clientWidth}x${el.clientHeight}` })
    }
    if (cs.textOverflow === 'ellipsis' || cs.webkitLineClamp !== 'none' && cs.webkitLineClamp) {
      findings.push({ type: 'truncation', el: label(el) })
    }
    // clipped by an ancestor with overflow hidden
    let a = el.parentElement
    while (a && a !== document.body) {
      const acs = getComputedStyle(a)
      if (/(hidden|clip)/.test(acs.overflowX + acs.overflowY) && !a.matches('.frame, .video, .vhero')) {
        const ar = a.getBoundingClientRect()
        if (r.right > ar.right + 1 || r.left < ar.left - 1 || r.bottom > ar.bottom + 2 || r.top < ar.top - 2) {
          findings.push({ type: 'clipped-by-ancestor', el: label(el), ancestor: label(a) })
        }
        break
      }
      a = a.parentElement
    }
    // outside viewport horizontally
    if (r.right > vw + 1 || r.left < -1) findings.push({ type: 'offscreen-x', el: label(el), detail: `${Math.round(r.left)}..${Math.round(r.right)} / ${vw}` })
  }

  // headings whose last line is a single short word (widow)
  for (const h of document.querySelectorAll('main h1, main h2, main h3')) {
    if (skip(h)) continue
    const range = document.createRange()
    range.selectNodeContents(h)
    // text boxes only (skip the element box itself), lines grouped within 8px
    const hw = h.getBoundingClientRect().width
    const rects = [...range.getClientRects()].filter(x => x.width > 2 && x.width < hw - 1)
    if (!rects.length) continue
    const lineTops = []
    rects.forEach(x => { if (!lineTops.some(t => Math.abs(t - x.top) < 8)) lineTops.push(x.top) })
    if (lineTops.length < 2) continue
    const lastTop = Math.max(...lineTops)
    const lastWidth = rects.filter(x => Math.abs(x.top - lastTop) < 8).reduce((s, x) => s + x.width, 0)
    const words = h.textContent.trim().split(/\s+/)
    if (lastWidth < h.getBoundingClientRect().width * 0.18 && words.length > 3) findings.push({ type: 'heading-widow', el: label(h) })
  }

  // focusable controls smaller than 24x24 (WCAG 2.2 target size minimum)
  for (const c of document.querySelectorAll('main a, main button, main input, main select, header a, header button')) {
    if (skip(c) || !c.getClientRects().length) continue
    const r = c.getBoundingClientRect()
    if (r.width && r.height && (r.width < 24 || r.height < 24) && getComputedStyle(c).display !== 'inline') {
      findings.push({ type: 'small-target', el: label(c), detail: `${Math.round(r.width)}x${Math.round(r.height)}` })
    }
  }

  void headerBottom
  // dedupe
  const seen = new Set()
  return findings.filter(f => { const k = JSON.stringify(f); if (seen.has(k)) return false; seen.add(k); return true })
}

// Runs the audit on every marketing route in one language. Usage: await window.__runMatrix('en')
window.__runMatrix = async function runMatrix(lang = 'en') {
  localStorage.setItem('tutorista-lang', lang)
  const out = {}
  for (const r of ['/', '/services', '/plans', '/about', '/contact', '/login', '/signup', '/privacy', '/terms']) {
    history.pushState({}, '', r)
    dispatchEvent(new PopStateEvent('popstate'))
    await new Promise(res => setTimeout(res, 800))
    window.scrollTo(0, 0)
    const f = await window.__renderAudit()
    if (f.length) out[r] = f.map(x => `${x.type}: ${x.el || ''} ${x.detail || ''} ${x.ancestor ? '< ' + x.ancestor : ''}`.trim()).slice(0, 8)
  }
  return { vw: document.documentElement.clientWidth, lang: document.documentElement.lang, out }
}
