/* ── NAVBAR SCROLL ──────────────────────────────────── */
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50)
  updateActiveLink()
})

/* ── ACTIVE NAV LINK ON SCROLL ──────────────────────── */
const sections  = document.querySelectorAll('section')
const navLinks  = document.querySelectorAll('.nav-link')

function updateActiveLink() {
  let current = ''
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id')
  })
  navLinks.forEach(link => {
    link.classList.remove('active')
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active')
  })
}

/* ── NAV WHEEL ──────────────────────────────────────── */
(function () {
  const sections = [
    { label: 'Home',     desc: 'Start of the journey.\nWhere it all begins.',      color: '#2A6DD9', stroke: '#1a4da0', target: '#hero'     },
    { label: 'About',    desc: 'Engineering Physics at\nIIT Kharagpur.',            color: '#1D9E75', stroke: '#0f6e56', target: '#about'    },
    { label: 'Projects', desc: 'Things I\'ve shipped.\nCode meets hardware.',       color: '#7F77DD', stroke: '#534AB7', target: '#projects' },
    { label: 'Skills',   desc: 'Frontend to ML.\nFull-spectrum builder.',           color: '#2A6DD9', stroke: '#1a4da0', target: '#about'    },
    { label: 'Contact',  desc: 'Let\'s build something.\nOpen to ideas.',           color: '#1D9E75', stroke: '#0f6e56', target: '#contact'  },
    { label: 'Resume',   desc: 'My work on paper.\nDownload & explore.',            color: '#7F77DD', stroke: '#534AB7', target: '#contact', highlight: '#resume-btn' },
  ]

  const icons = {
    Home:     (cx,cy) => `<line x1="${cx}" y1="${cy-9}" x2="${cx}" y2="${cy-2}" stroke="currentColor" stroke-width="1.2"/>
                           <polyline points="${cx-7},${cy-2} ${cx},${cy-9} ${cx+7},${cy-2}" fill="none" stroke="currentColor" stroke-width="1.2"/>
                           <rect x="${cx-5}" y="${cy-2}" width="10" height="8" rx="1" fill="none" stroke="currentColor" stroke-width="1.2"/>`,
    About:    (cx,cy) => `<circle cx="${cx}" cy="${cy-4}" r="4" fill="none" stroke="currentColor" stroke-width="1.2"/>
                           <path d="M${cx-7},${cy+6} Q${cx-7},${cy+1} ${cx},${cy+1} Q${cx+7},${cy+1} ${cx+7},${cy+6}" fill="none" stroke="currentColor" stroke-width="1.2"/>`,
    Projects: (cx,cy) => `<rect x="${cx-7}" y="${cy-6}" width="14" height="11" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/>
                           <line x1="${cx-4}" y1="${cy-3}" x2="${cx+4}" y2="${cy-3}" stroke="currentColor" stroke-width="1.2"/>
                           <line x1="${cx-4}" y1="${cy}" x2="${cx+2}" y2="${cy}" stroke="currentColor" stroke-width="1.2"/>
                           <line x1="${cx-3}" y1="${cy+7}" x2="${cx+3}" y2="${cy+7}" stroke="currentColor" stroke-width="1.2"/>
                           <line x1="${cx}" y1="${cy+5}" x2="${cx}" y2="${cy+7}" stroke="currentColor" stroke-width="1.2"/>`,
    Skills:   (cx,cy) => `<polygon points="${cx},${cy-8} ${cx+7},${cy-2} ${cx+4},${cy+7} ${cx-4},${cy+7} ${cx-7},${cy-2}" fill="none" stroke="currentColor" stroke-width="1.2"/>
                           <circle cx="${cx}" cy="${cy}" r="2.5" fill="none" stroke="currentColor" stroke-width="1.2"/>`,
    Contact:  (cx,cy) => `<rect x="${cx-7}" y="${cy-5}" width="14" height="10" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.2"/>
                           <polyline points="${cx-7},${cy-5} ${cx},${cy+1} ${cx+7},${cy-5}" fill="none" stroke="currentColor" stroke-width="1.2"/>`,
    Resume:   (cx,cy) => `<rect x="${cx-5}" y="${cy-8}" width="10" height="13" rx="1" fill="none" stroke="currentColor" stroke-width="1.2"/>
                           <line x1="${cx-3}" y1="${cy-4}" x2="${cx+3}" y2="${cy-4}" stroke="currentColor" stroke-width="1.2"/>
                           <line x1="${cx-3}" y1="${cy-1}" x2="${cx+3}" y2="${cy-1}" stroke="currentColor" stroke-width="1.2"/>
                           <line x1="${cx-3}" y1="${cy+2}" x2="${cx+1}" y2="${cy+2}" stroke="currentColor" stroke-width="1.2"/>
                           <line x1="${cx+2}" y1="${cy+6}" x2="${cx+2}" y2="${cy+10}" stroke="currentColor" stroke-width="1.2"/>
                           <polyline points="${cx-1},${cy+9} ${cx+2},${cy+6} ${cx+5},${cy+9}" fill="none" stroke="currentColor" stroke-width="1.2"/>`,
  }

  const SVG     = 'http://www.w3.org/2000/svg'
  const N       = sections.length
  const CX      = 80, CY = 80, R = 74, Ri = 28
  const TAU     = Math.PI * 2
  const gap     = 0.04
  const slicesG = document.getElementById('wheel-slices')
  const iconsG  = document.getElementById('wheel-icons')
  const tooltip = document.getElementById('wheel-tooltip')
  const wtTitle = document.getElementById('wt-title')
  const wtDesc  = document.getElementById('wt-desc')
  const heroImageWrap = document.getElementById('hero-image-wrap')
  const heroImage     = document.getElementById('hero-image')
  const heroImageLink = document.getElementById('hero-image-link')
  const mobileNavWheelQuery = window.matchMedia('(max-width: 768px)')

  heroImageWrap?.addEventListener('mouseenter', () => {
    if (mobileNavWheelQuery.matches) return

    heroImage?.classList.add('nav-wheel-scale')
    document.getElementById('nav-wheel-wrap')?.classList.remove('exiting')
  })

  heroImageWrap?.addEventListener('mouseleave', () => {
    if (mobileNavWheelQuery.matches) return

    heroImage?.classList.remove('nav-wheel-scale')
    const navWheelWrap = document.getElementById('nav-wheel-wrap')
    navWheelWrap?.classList.add('exiting')
    setTimeout(() => navWheelWrap?.classList.remove('exiting'), 750)
  })

  heroImageLink?.addEventListener('click', (event) => {
    if (!mobileNavWheelQuery.matches) return

    event.preventDefault()
    const navWheelWrap = document.getElementById('nav-wheel-wrap')
    heroImageWrap?.classList.toggle('active')
    heroImage?.classList.toggle('nav-wheel-scale', heroImageWrap?.classList.contains('active'))
    navWheelWrap?.classList.remove('exiting')
  })

  function polar(r, a) {
    return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
  }

  function arcPath(r1, r2, a1, a2) {
    const [x1,y1] = polar(r2, a1), [x2,y2] = polar(r2, a2)
    const [x3,y3] = polar(r1, a2), [x4,y4] = polar(r1, a1)
    const lg = a2 - a1 > Math.PI ? 1 : 0
    return `M${x1},${y1} A${r2},${r2} 0 ${lg} 1 ${x2},${y2} L${x3},${y3} A${r1},${r1} 0 ${lg} 0 ${x4},${y4} Z`
  }

  sections.forEach((s, i) => {
    const a1   = (i / N) * TAU - TAU / 4 + gap
    const a2   = ((i + 1) / N) * TAU - TAU / 4 - gap
    const aMid = (a1 + a2) / 2
    const Rm   = (Ri + R) / 2
    const [icx, icy] = polar(Rm, aMid)
    const [lx,  ly]  = polar(R + 18, aMid)

    const path = document.createElementNS(SVG, 'path')
    path.setAttribute('d', arcPath(Ri, R, a1, a2))
    path.setAttribute('fill', 'rgba(13,21,36,0.7)')
    path.setAttribute('stroke', s.stroke)
    path.setAttribute('stroke-width', '0.5')
    path.style.cssText = `transition:transform 0.22s cubic-bezier(.34,1.56,.64,1),fill 0.18s;transform-origin:${CX}px ${CY}px;cursor:pointer`

    const iconG = document.createElementNS(SVG, 'g')
    iconG.innerHTML = icons[s.label](icx, icy)
    iconG.setAttribute('color', s.color)
    iconG.style.cssText = `transition:transform 0.22s cubic-bezier(.34,1.56,.64,1),opacity 0.18s;transform-origin:${CX}px ${CY}px;opacity:0.45;pointer-events:none`

    const label = document.createElementNS(SVG, 'text')
    label.textContent = s.label
    label.setAttribute('x', lx)
    label.setAttribute('y', ly)
    label.setAttribute('text-anchor', 'middle')
    label.setAttribute('dominant-baseline', 'middle')
    label.setAttribute('fill', s.color)
    label.setAttribute('font-size', '8')
    label.setAttribute('font-family', 'monospace')
    label.setAttribute('letter-spacing', '1.5')
    label.style.cssText = 'opacity:0.3;transition:opacity 0.18s;pointer-events:none'

    slicesG.appendChild(path)
    iconsG.appendChild(iconG)
    iconsG.appendChild(label)

    path.addEventListener('mouseenter', () => {
      path.setAttribute('fill', s.color + '22')
      path.style.transform = 'rotate(0deg) scale(1.08)'
      iconG.style.transform = 'rotate(0deg) scale(1.08)'
      iconG.style.opacity = '1'
      label.style.opacity = '1'
      wtTitle.textContent = s.label
      wtDesc.innerHTML    = s.desc.replace(/\n/g, '<br>')
      tooltip.classList.add('visible')
    })

    path.addEventListener('mouseleave', () => {
      path.setAttribute('fill', 'rgba(13,21,36,0.7)')
      path.style.transform = 'rotate(0deg) scale(1)'
      iconG.style.transform = 'rotate(0deg) scale(1)'
      iconG.style.opacity = '0.45'
      label.style.opacity = '0.3'
      tooltip.classList.remove('visible')
    })

    path.addEventListener('click', () => {
      document.querySelector(s.target)?.scrollIntoView({ behavior: 'smooth' })

      if (s.highlight) {
        const button = document.querySelector(s.highlight)
        window.setTimeout(() => {
          button?.classList.remove('wheel-highlight')
          button?.offsetHeight
          button?.classList.add('wheel-highlight')
          window.setTimeout(() => button?.classList.remove('wheel-highlight'), 1600)
        }, 520)
      }
    })
  })
})();

/* ── SKILL TAG BOUNCER ──────────────────────────────── */
(function(){
  const skills = document.getElementById('about-skills')
  const about = document.getElementById('about')
  if (!skills || !about) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const tags = Array.from(skills.querySelectorAll('.tag'))
  if (!tags.length) return

  const ball = document.createElement('div')
  ball.id = 'skill-ball'
  document.body.appendChild(ball)

  let active = false
  let rafId = null
  let timerId = null
  let tagIndex = 0
  let current = null
  const radius = 8

  const tagTarget = (tag) => {
    const rect = tag.getBoundingClientRect()
    return {
      x: rect.left + rect.width / 2 - radius,
      y: rect.top - radius + 2,
      w: rect.width
    }
  }

  const setBall = (x, y, squash = 1) => {
    ball.style.transform = `translate3d(${x}px, ${y}px, 0) scaleX(${1 / squash}) scaleY(${squash})`
  }

  const hitTag = (tag) => {
    tag.classList.remove('skill-hit')
    tag.offsetHeight
    tag.classList.add('skill-hit')
  }

  const stopLoop = () => {
    cancelAnimationFrame(rafId)
    clearTimeout(timerId)
    rafId = null
    timerId = null
    ball.classList.remove('visible')
  }

  const jumpToNext = () => {
    if (!active) return

    const nextTag = tags[tagIndex % tags.length]
    const next = tagTarget(nextTag)
    const start = current || {
      x: next.x,
      y: next.y - 90,
      w: next.w
    }

    const dx = next.x - start.x
    const dy = next.y - start.y
    const distance = Math.hypot(dx, dy)
    const duration = Math.min(1180, Math.max(760, distance * 3.2))
    const arc = Math.min(118, Math.max(54, distance * 0.34 + 34))
    const startedAt = performance.now()

    ball.classList.add('visible')

    const frame = (now) => {
      if (!active) return

      const raw = Math.min((now - startedAt) / duration, 1)
      const ease = raw < 0.5
        ? 2 * raw * raw
        : 1 - Math.pow(-2 * raw + 2, 2) / 2
      const x = start.x + dx * ease
      const y = start.y + dy * ease - Math.sin(Math.PI * raw) * arc
      const landingSquash = raw > 0.88 ? 1 - Math.sin((raw - 0.88) / 0.12 * Math.PI) * 0.08 : 1

      setBall(x, y, landingSquash)

      if (raw < 1) {
        rafId = requestAnimationFrame(frame)
        return
      }

      setBall(next.x, next.y, 0.92)
      hitTag(nextTag)
      current = next
      tagIndex += 1

      timerId = setTimeout(() => {
        setBall(next.x, next.y, 1)
        jumpToNext()
      }, 190)
    }

    rafId = requestAnimationFrame(frame)
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      active = entry.isIntersecting

      if (active) {
        if (!rafId && !timerId) jumpToNext()
      } else {
        stopLoop()
        current = null
      }
    })
  }, { threshold: 0.3 })

  observer.observe(about)

  window.addEventListener('resize', () => {
    current = null
  })
})();

/* ── MOBILE MENU ────────────────────────────────────── */
function toggleMenu() {
  const mobileMenu = document.getElementById('mobile-menu')
  const hamburger = document.getElementById('nav-hamburger')
  const isOpen = mobileMenu.classList.toggle('open')

  hamburger?.classList.toggle('active', isOpen)
  hamburger?.setAttribute('aria-expanded', String(isOpen))
}

/* ── TYPEWRITER ─────────────────────────────────────── */
const pcExperienceNote = document.getElementById('pc-experience-note')
const pcNoteClose = document.getElementById('pc-note-close')
pcNoteClose?.addEventListener('click', () => {
  pcExperienceNote?.classList.add('is-hidden')
})

const roles   = ['Engineer.', 'Builder.', 'Frontend Dev.', 'ML Enthusiast.', 'IIT KGP EP \'30.']
let roleIdx   = 0
let charIdx   = 0
let deleting  = false
const roleEl  = document.getElementById('role-text')

function typeWriter() {
  const current = roles[roleIdx]
  if (!deleting) {
    roleEl.textContent = current.slice(0, ++charIdx)
    if (charIdx === current.length) {
      deleting = true
      setTimeout(typeWriter, 1800)
      return
    }
  } else {
    roleEl.textContent = current.slice(0, --charIdx)
    if (charIdx === 0) {
      deleting = false
      roleIdx  = (roleIdx + 1) % roles.length
    }
  }
  setTimeout(typeWriter, deleting ? 60 : 100)
}
setTimeout(typeWriter, 1200)

/* ── HERO CANVAS — WAVEFORM + BINARY RAIN ───────────── */
const canvas  = document.getElementById('hero-canvas')
const ctx     = canvas.getContext('2d')
let   W, H, drops, offset = 0

let digitalSignal = []

function resize() {
  W = canvas.width  = window.innerWidth
  H = canvas.height = window.innerHeight
  const cols = Math.floor(W / 20)
  drops = Array.from({ length: cols }, () => Math.random() * -50)
  generateDigitalSignal()
}

function generateDigitalSignal() {
  digitalSignal = []
  let x = 0
  while (x < window.innerWidth + 100) {
    const pulseWidth = 45 + Math.floor(Math.random() * 70)
    const amp        = 18 + Math.floor(Math.random() * 22)
    const high       = Math.random() > 0.45
    digitalSignal.push({ x, amp, high })
    x += pulseWidth
  }
}

resize()
window.addEventListener('resize', resize)

/* mouse probe trail */
let mouseX = -999, mouseY = -999
window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY })

function drawCanvas() {
  /* fade background */
  ctx.fillStyle = 'rgba(6,10,18,0.18)'
  ctx.fillRect(0, 0, W, H)

  /* binary rain */
  ctx.font = '13px monospace'
  drops.forEach((y, i) => {
    const bright = Math.random()
    ctx.fillStyle = bright > 0.97
      ? 'rgba(255,255,255,0.9)'
      : `rgba(29,158,117,${0.1 + Math.random() * 0.4})`
    ctx.fillText(Math.random() > 0.5 ? '1' : '0', i * 20, y)
    drops[i] += 14 + Math.random() * 6
    if (drops[i] > H && Math.random() > 0.97) drops[i] = Math.random() * -100
  })

  /* waveform — Fourier sine wave CH1 */
  offset += 1.2
  const t = Date.now() * 0.01
  ctx.beginPath()
  ctx.strokeStyle = 'rgba(42,109,217,0.45)'
  ctx.lineWidth   = 1.6
  for (let x = 0; x < W; x++) {
    const nx = (x + offset) * 0.018
    const y = H * 0.72
      + Math.sin(nx)           * 22
      + Math.sin(nx * 21)     * 11
      + Math.sin(nx * 37)     * 7
      + Math.sin(nx * 51)     * 4
      + Math.sin(nx * 4 + t) * 14
      + Math.sin(nx * 13)    * 9
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.stroke()

  /* waveform — digital signal CH2 */
  ctx.beginPath()
  ctx.strokeStyle = 'rgba(29,158,117,0.55)'
  ctx.lineWidth   = 1.8

  const speed  = offset * 10
  const totalW = digitalSignal.reduce((sum, s, i) => {
    const next = digitalSignal[i + 1]
    return next ? Math.max(sum, next.x) : sum
  }, 0) + 120
  const scrollX = totalW - (speed % totalW)

  ctx.moveTo(0, H * 0.72)
  for (let rep = 0; rep < 3; rep++) {
    digitalSignal.forEach((seg, i) => {
      const x    = seg.x - scrollX + rep * totalW
      const segY = H * 0.72 + (seg.high ? -seg.amp : seg.amp)
      const prev = digitalSignal[i - 1]
      const prevY = prev
        ? H * 0.72 + (prev.high ? -prev.amp : prev.amp)
        : H * 0.72
      if (x > W + 100) return
      ctx.lineTo(x, prevY)
      ctx.lineTo(x, segY)
    })
  }
  ctx.lineTo(W, H * 0.72)
  ctx.stroke()

  /* neural dots — right side */
  const dotPositions = [
    [W*0.78, H*0.28], [W*0.84, H*0.42], [W*0.91, H*0.28],
    [W*0.78, H*0.58], [W*0.84, H*0.72], [W*0.91, H*0.58]
  ]
  ctx.strokeStyle = 'rgba(127,119,221,0.25)'
  ctx.lineWidth   = 0.6
  dotPositions.forEach(([x1,y1], i) => {
    dotPositions.forEach(([x2,y2], j) => {
      if (j > i) {
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke()
      }
    })
  })
  dotPositions.forEach(([x, y], i) => {
    const dist  = Math.hypot(mouseX - x, mouseY - y)
    const pulse = dist < 120 ? 1 : 0.45 + Math.sin(Date.now()*0.002 + i) * 0.2
    ctx.beginPath()
    ctx.arc(x, y, 3.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(127,119,221,${pulse})`
    ctx.fill()
    if (dist < 120) {
      ctx.beginPath()
      ctx.arc(x, y, 10, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(127,119,221,${0.3 * (1 - dist/120)})`
      ctx.lineWidth = 1
      ctx.stroke()
    }
  })

  requestAnimationFrame(drawCanvas)
}
drawCanvas()

/* ── SCROLL REVEAL ──────────────────────────────────── */
const revealEls = document.querySelectorAll('.project-card, #about-grid, #contact-links')
const hideRevealElement = (el) => {
  el.style.opacity = '0'
  el.style.transform = 'translateY(30px)'
}
const showRevealElement = (el) => {
  el.style.opacity = '1'
  el.style.transform = 'translateY(0)'
}
const observer  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      showRevealElement(e.target)
    } else {
      hideRevealElement(e.target)
    }
  })
}, { threshold: 0.1 })

revealEls.forEach(el => {
  // skip project cards that are part of the 3D carousel (they use transforms for rotateZ/translateZ)
  if (el.classList.contains('project-card') && el.closest('.projects-slider')) return

  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
  hideRevealElement(el)
  observer.observe(el)
});

/* ── COPY EMAIL ─────────────────────────────────────── */
(function(){
  const emailBtn = document.getElementById('copy-email')
  if (!emailBtn) return

  const email = emailBtn.dataset.email
  const originalHTML = emailBtn.innerHTML
  let resetTimer = null

  const fallbackCopy = (text) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    const copied = document.execCommand('copy')
    textarea.remove()
    return copied
  }

  const showCopied = () => {
    emailBtn.classList.add('copied')
    emailBtn.innerHTML = '<span class="contact-icon">OK</span> Copied'

    resetTimer = setTimeout(() => {
      emailBtn.classList.remove('copied')
      emailBtn.innerHTML = originalHTML
    }, 1400)
  }

  emailBtn.addEventListener('click', async (event) => {
    event.preventDefault()
    clearTimeout(resetTimer)

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email)
      } else if (!fallbackCopy(email)) {
        throw new Error('Copy fallback failed')
      }

      showCopied()
    } catch {
      window.location.href = emailBtn.href
    }
  })
})();

/* ── PROJECT CONTENT LOADER ───────────────────────────── */
(function(){
  const slider = document.querySelector('#projects-grid .projects-slider')
  if (!slider) return

  const PROJECT_STORAGE_KEY = 'portfolioProjects'
  const fallbackTagClasses = ['tag-blue', 'tag-green', 'tag-purple', 'tag-muted']

  const readSavedProjects = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(PROJECT_STORAGE_KEY) || '[]')
      return Array.isArray(saved) ? saved : []
    } catch {
      return []
    }
  }

  const appendTextBlock = (parent, text) => {
    String(text || '')
      .split(/\n{2,}/)
      .map(block => block.trim())
      .filter(Boolean)
      .forEach(block => {
        const paragraph = document.createElement('p')
        paragraph.textContent = block
        parent.appendChild(paragraph)
      })
  }

  const createTag = (label, index) => {
    const tag = document.createElement('span')
    tag.className = `tag ${fallbackTagClasses[index % fallbackTagClasses.length]}`
    tag.textContent = label
    return tag
  }

  const createProjectCard = (project, index) => {
    const card = document.createElement('div')
    const mediaItems = Array.isArray(project.media) ? project.media.filter(item => item && (item.title || item.src || item.href)) : []
    const tags = Array.isArray(project.tags) ? project.tags.filter(Boolean) : []
    const links = Array.isArray(project.links) ? project.links.filter(link => link && link.href && link.label) : []

    card.className = mediaItems.length ? 'project-card media-project-card' : 'project-card'
    card.style.setProperty('--position', index + 1)
    card.dataset.projectLong = project.longDescription || project.description || ''

    const number = document.createElement('div')
    number.className = 'project-number'
    number.textContent = String(index + 1).padStart(2, '0')

    const title = document.createElement('h3')
    title.className = 'project-title'
    title.textContent = project.title || 'Untitled Project'

    const desc = document.createElement('p')
    desc.className = 'project-desc'
    desc.textContent = project.description || 'Project details coming soon.'

    const tagList = document.createElement('div')
    tagList.className = 'project-tags'
    tags.forEach((tag, tagIndex) => tagList.appendChild(createTag(tag, tagIndex)))

    const linkList = document.createElement('div')
    linkList.className = 'project-links'
    links.forEach(link => {
      const anchor = document.createElement('a')
      anchor.className = 'project-link'
      anchor.href = link.href
      anchor.target = '_blank'
      anchor.rel = 'noopener noreferrer'
      anchor.textContent = `${link.label} ↗`
      linkList.appendChild(anchor)
    })

    const detailCopy = document.createElement('div')
    detailCopy.className = 'project-long-copy'
    detailCopy.hidden = true
    appendTextBlock(detailCopy, project.longDescription || project.description)

    if (Array.isArray(project.highlights) && project.highlights.length) {
      const list = document.createElement('ul')
      project.highlights.filter(Boolean).forEach(highlight => {
        const item = document.createElement('li')
        item.textContent = highlight
        list.appendChild(item)
      })
      detailCopy.appendChild(list)
    }

    card.append(number, title, desc, tagList, linkList, detailCopy)

    if (mediaItems.length) {
      const mediaList = document.createElement('div')
      mediaList.className = 'project-media-list'
      mediaList.hidden = true

      mediaItems.forEach(media => {
        const article = document.createElement('article')
        article.className = 'media-item'

        const thumb = document.createElement('a')
        thumb.className = 'media-thumb'
        thumb.href = media.href || media.src || '#'
        thumb.target = '_blank'
        thumb.rel = 'noopener noreferrer'
        thumb.setAttribute('aria-label', `Open ${media.title || project.title || 'project'} media`)

        if (media.src) {
          const image = document.createElement('img')
          image.src = media.src
          image.alt = media.alt || media.title || project.title || 'Project media'
          thumb.appendChild(image)
        }

        const placeholder = document.createElement('span')
        placeholder.className = 'media-placeholder'
        placeholder.textContent = media.title || 'Project Media'

        const open = document.createElement('span')
        open.className = 'media-open'
        open.setAttribute('aria-hidden', 'true')
        open.textContent = '↗'
        thumb.append(placeholder, open)

        const copy = document.createElement('div')
        copy.className = 'media-copy'
        const mediaTitle = document.createElement('h4')
        mediaTitle.textContent = media.title || 'Project media'
        const mediaDescription = document.createElement('p')
        mediaDescription.textContent = media.description || ''
        copy.append(mediaTitle, mediaDescription)

        article.append(thumb, copy)
        mediaList.appendChild(article)
      })

      card.appendChild(mediaList)
    }

    return card
  }

  const savedProjects = readSavedProjects()
  if (!savedProjects.length) return

  const existingCards = Array.from(slider.querySelectorAll('.project-card'))
  savedProjects.forEach((project, offset) => {
    slider.appendChild(createProjectCard(project, existingCards.length + offset))
  })

  Array.from(slider.querySelectorAll('.project-card')).forEach((card, index) => {
    card.style.setProperty('--position', index + 1)
    const number = card.querySelector('.project-number')
    if (number) number.textContent = String(index + 1).padStart(2, '0')
  })
  slider.style.setProperty('--quantity', slider.querySelectorAll('.project-card').length)
})();

/* ── CAROUSEL ANIMATION PAUSE ON HOVER & CENTER CARD ──── */
const carouselSlider = document.querySelector('#projects-grid .projects-slider')

if (carouselSlider) {
  const carouselArea = carouselSlider.closest('#projects-grid') || carouselSlider
  const projectCards = Array.from(carouselSlider.querySelectorAll('.project-card'))
  const projectNavButtons = document.querySelectorAll('[data-project-nav]')
  const projectModal = document.getElementById('project-modal')
  const projectModalNumber = document.getElementById('project-modal-number')
  const projectModalTitle = document.getElementById('project-modal-title')
  const projectModalDesc = document.getElementById('project-modal-desc')
  const projectModalTags = document.getElementById('project-modal-tags')
  const projectModalGallery = document.getElementById('project-modal-gallery')
  const projectModalClose = document.querySelector('.project-modal-close')
  const mobileCarouselQuery = window.matchMedia('(max-width: 768px)')
  const quantity = projectCards.length || 1
  const rotationPerCard = 360 / quantity
  const autoRunDuration = 35000
  let autoStartTime = performance.now()
  let autoStartRotation = 0
  let currentRotation = 0
  let lastHoveredRotation = 0
  let activeCard = null
  let mobileProjectIndex = 0
  let isAutoRunning = true
  let hoverSettleTimer = null
  let centerCompleteTimer = null
  let delayedOpenTimer = null

  projectCards
    .filter(card => card.classList.contains('media-project-card'))
    .forEach(card => {
      card.style.setProperty('cursor', 'pointer', 'important')
      card.querySelectorAll('*').forEach(child => {
        child.style.setProperty('cursor', 'pointer', 'important')
      })
    })

  carouselSlider.style.setProperty('--carousel-start-rotation', `${autoStartRotation}deg`)

  const carouselTransform = (rotation) =>
    `perspective(1000px) rotateX(-10deg) rotateY(${rotation}deg)`

  const clearInteractionTimers = () => {
    clearTimeout(hoverSettleTimer)
    clearTimeout(centerCompleteTimer)
    clearTimeout(delayedOpenTimer)
  }

  const removeSettledHover = () => {
    clearTimeout(hoverSettleTimer)
    carouselSlider.classList.remove('is-hover-ready')
    projectCards.forEach(card => card.classList.remove('is-hovered'))
  }

  const scheduleSettledHover = (card) => {
    clearTimeout(hoverSettleTimer)

    if (
      isAutoRunning ||
      carouselSlider.classList.contains('is-centering') ||
      !card.classList.contains('active')
    ) return

    hoverSettleTimer = setTimeout(() => {
      if (
        isAutoRunning ||
        carouselSlider.classList.contains('is-centering') ||
        !card.classList.contains('active')
      ) return

      carouselSlider.classList.add('is-hover-ready')
      projectCards.forEach(projectCard => {
        projectCard.classList.toggle('is-hovered', projectCard === card)
      })
    }, 220)
  }

  const finishCentering = () => {
    clearTimeout(centerCompleteTimer)
    carouselSlider.classList.remove('is-centering')
    if (activeCard) scheduleSettledHover(activeCard)
  }

  const getAutoRotation = () => {
    const elapsed = (performance.now() - autoStartTime) % autoRunDuration
    return autoStartRotation - (elapsed / autoRunDuration) * 360
  }

  const closestRotationToCurrent = (targetRotation, fromRotation) => {
    let closest = targetRotation
    while (closest - fromRotation > 180) closest -= 360
    while (fromRotation - closest > 180) closest += 360
    return closest
  }

  const wrappedCardIndex = (index) =>
    ((index % quantity) + quantity) % quantity

  const getNearestCardIndex = (rotation) =>
    wrappedCardIndex(Math.round(-rotation / rotationPerCard))

  const closeProjectModal = () => {
    projectModal?.classList.remove('open')
    projectModal?.classList.remove('media-mode')
    projectModal?.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('project-modal-open')
  }

  const openProjectModal = (card) => {
    if (!projectModal) return

    const number = card.querySelector('.project-number')?.textContent?.trim() || ''
    const title = card.querySelector('.project-title')?.textContent?.trim() || 'Project'
    const shortDesc = card.querySelector('.project-desc')?.textContent?.trim() || ''
    const detailCopy = card.querySelector('.project-long-copy')
    const mediaList = card.querySelector('.project-media-list')
    const longDesc = card.dataset.projectLong || shortDesc
    const tags = Array.from(card.querySelectorAll('.project-tags .tag'))
    const shotLabels = ['Overview', 'Build Notes', 'Result']

    projectModal.classList.toggle('media-mode', Boolean(mediaList))
    if (projectModalNumber) projectModalNumber.textContent = number ? `project ${number}` : 'project'
    if (projectModalTitle) projectModalTitle.textContent = mediaList ? 'Media' : title
    if (projectModalDesc) {
      if (mediaList) {
        projectModalDesc.textContent = ''
      } else if (detailCopy) {
        projectModalDesc.innerHTML = detailCopy.innerHTML
      } else {
        projectModalDesc.textContent = longDesc
      }
    }

    if (projectModalTags) {
      projectModalTags.innerHTML = ''
      tags.forEach(tag => projectModalTags.appendChild(tag.cloneNode(true)))
    }

    if (projectModalGallery) {
      projectModalGallery.innerHTML = ''
      if (mediaList) {
        const mediaClone = mediaList.cloneNode(true)
        mediaClone.hidden = false
        projectModalGallery.appendChild(mediaClone)
      } else {
        shotLabels.forEach((label, index) => {
          const shot = document.createElement('div')
          const shotTitle = document.createElement('span')
          const shotMeta = document.createElement('em')

          shot.className = 'project-shot'
          shot.style.setProperty('--shot-index', index)
          shotTitle.textContent = label
          shotMeta.textContent = title
          shot.append(shotTitle, shotMeta)
          projectModalGallery.appendChild(shot)
        })
      }
    }

    projectModal.classList.add('open')
    projectModal.setAttribute('aria-hidden', 'false')
    document.body.classList.add('project-modal-open')
    projectModalClose?.focus()
  }

  const setMobileProject = (index) => {
    mobileProjectIndex = wrappedCardIndex(index)
    carouselSlider.style.setProperty('--mobile-project-index', mobileProjectIndex)
    carouselSlider.classList.remove('is-centering', 'is-hover-ready')
    projectCards.forEach((card, cardIndex) => {
      const isActive = cardIndex === mobileProjectIndex
      card.classList.toggle('active', isActive)
      card.classList.remove('is-hovered')
    })
  }

  const syncCarouselMode = () => {
    clearInteractionTimers()
    removeSettledHover()

    if (mobileCarouselQuery.matches) {
      setMobileProject(mobileProjectIndex)
      return
    }

    carouselSlider.style.removeProperty('--mobile-project-index')
    carouselSlider.classList.remove('is-centering', 'is-hover-ready')
    projectCards.forEach(card => card.classList.remove('active', 'is-hovered'))
    activeCard = null

    if (!isAutoRunning) resumeCarousel()
  }

  const resumeCarousel = () => {
    clearInteractionTimers()
    removeSettledHover()
    activeCard = null
    carouselSlider.style.setProperty('--carousel-start-rotation', `${lastHoveredRotation}deg`)
    carouselSlider.style.transition = 'none'
    carouselSlider.style.transform = carouselTransform(lastHoveredRotation)
    carouselSlider.offsetHeight
    carouselSlider.style.animation = 'autoRun 35s linear infinite'
    carouselSlider.style.removeProperty('transition')
    carouselSlider.style.removeProperty('transform')
    carouselSlider.classList.remove('is-centering', 'is-hover-ready')
    projectCards.forEach(card => card.classList.remove('active', 'is-hovered'))
    autoStartTime = performance.now()
    autoStartRotation = lastHoveredRotation
    currentRotation = lastHoveredRotation
    isAutoRunning = true
  }

  const centerCard = (card, force = false) => {
    if (mobileCarouselQuery.matches) return
    if (!force && carouselSlider.classList.contains('is-centering')) return
    if (!force && !isAutoRunning) return

    clearInteractionTimers()
    removeSettledHover()
    carouselSlider.classList.remove('is-centering')
    activeCard = card
    const position = parseInt(card.style.getPropertyValue('--position')) || 1
    const fromRotation = isAutoRunning ? getAutoRotation() : currentRotation
    const centeredRotation = closestRotationToCurrent(
      -(position - 1) * rotationPerCard,
      fromRotation
    )
    const needsCentering = Math.abs(centeredRotation - fromRotation) > 0.01

    currentRotation = centeredRotation
    lastHoveredRotation = centeredRotation
    isAutoRunning = false
    projectCards.forEach(projectCard => projectCard.classList.toggle('active', projectCard === card))
    carouselSlider.classList.add('is-centering')
    carouselSlider.style.animation = 'none'
    carouselSlider.style.transition = 'none'
    carouselSlider.style.transform = carouselTransform(fromRotation)
    carouselSlider.offsetHeight
    carouselSlider.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
    carouselSlider.style.transform = carouselTransform(centeredRotation)

    if (!needsCentering) {
      finishCentering()
    } else {
      centerCompleteTimer = setTimeout(finishCentering, 480)
    }
  }

  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      if (mobileCarouselQuery.matches) return
      centerCard(card)
    })

    card.addEventListener('click', (event) => {
      if (event.target.closest('.project-link')) return

      if (mobileCarouselQuery.matches) {
        openProjectModal(card)
        return
      }

      if (card.classList.contains('media-project-card')) {
        centerCard(card, true)
        openProjectModal(card)
        return
      }

      if (card.classList.contains('active') && carouselSlider.classList.contains('is-hover-ready')) {
        openProjectModal(card)
      } else {
        centerCard(card, true)
      }
    })
  })

  document.addEventListener('click', (event) => {
    if (mobileCarouselQuery.matches) return
    if (projectModal?.classList.contains('open')) return
    if (event.target.closest('[data-project-nav], .project-link, #project-modal')) return

    const mediaCard = projectCards.find(card => card.classList.contains('media-project-card'))
    if (!mediaCard?.classList.contains('active')) return

    const rect = mediaCard.getBoundingClientRect()
    const clickIsInsideMediaCard =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom

    if (!clickIsInsideMediaCard) return

    event.preventDefault()
    event.stopPropagation()
    openProjectModal(mediaCard)
  }, true)

  projectNavButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()

      const direction = button.dataset.projectNav === 'next' ? 1 : -1
      if (mobileCarouselQuery.matches) {
        setMobileProject(mobileProjectIndex + direction)
        return
      }

      const baseRotation = isAutoRunning ? getAutoRotation() : currentRotation
      const baseIndex = activeCard ? projectCards.indexOf(activeCard) : getNearestCardIndex(baseRotation)
      const nextIndex = wrappedCardIndex(baseIndex + direction)

      centerCard(projectCards[nextIndex], true)
    })
  })

  carouselArea.addEventListener('mouseleave', () => {
    if (mobileCarouselQuery.matches) return
    if (isAutoRunning) return
    resumeCarousel()
  })

  carouselSlider.addEventListener('transitionend', (event) => {
    if (event.target !== carouselSlider) return
    if (event.propertyName !== 'transform') return
    finishCentering()
  })

  if (mobileCarouselQuery.addEventListener) {
    mobileCarouselQuery.addEventListener('change', syncCarouselMode)
  } else {
    mobileCarouselQuery.addListener(syncCarouselMode)
  }
  projectModal?.addEventListener('click', (event) => {
    if (event.target.closest('[data-project-modal-close]')) closeProjectModal()
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectModal?.classList.contains('open')) closeProjectModal()
  })
  syncCarouselMode()
}

/* ── PHOTON: show only in #projects and follow mouse with subtle jitter ── */
(function(){
  const projects = document.getElementById('projects')
  if (!projects) return

  // avoid duplicate
  if (document.getElementById('photon')) return

  const photon = document.createElement('div')
  photon.id = 'photon'
  document.body.appendChild(photon)

  let tx = window.innerWidth / 2, ty = window.innerHeight / 2
  let x = tx, y = ty
  let active = false

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        active = true
        photon.classList.add('visible')
      } else {
        active = false
        photon.classList.remove('visible')
      }
    })
  }, { threshold: 0.25 })
  io.observe(projects)

  function onMove(e) {
    tx = e.clientX
    ty = e.clientY
  }
  window.addEventListener('mousemove', onMove)

  function animate() {
    // smooth follow
    x += (tx - x) * 0.16
    y += (ty - y) * 0.16
    const t = Date.now() * 0.002
    const jx = Math.sin(t * 6) * 4 // jitter
    const jy = Math.cos(t * 4) * 3

    if (active) {
      photon.style.left = (x + jx) + 'px'
      photon.style.top  = (y + jy) + 'px'
      photon.classList.add('visible')
    } else {
      photon.classList.remove('visible')
    }

    requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)

  // disable on touch devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    photon.style.display = 'none'
    window.removeEventListener('mousemove', onMove)
    io.disconnect()
  }
})();
