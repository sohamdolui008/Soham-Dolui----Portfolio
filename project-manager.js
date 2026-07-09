(function(){
  const PROJECT_STORAGE_KEY = 'portfolioProjects'
  const form = document.getElementById('project-form')
  const mediaRows = document.getElementById('media-rows')
  const mediaTemplate = document.getElementById('media-row-template')
  const savedList = document.getElementById('saved-projects-list')
  const addMediaRowButton = document.getElementById('add-media-row')
  const resetFormButton = document.getElementById('reset-form')
  const exportButton = document.getElementById('export-projects')
  const importInput = document.getElementById('import-projects')
  const clearButton = document.getElementById('clear-projects')

  const readProjects = () => {
    try {
      const projects = JSON.parse(localStorage.getItem(PROJECT_STORAGE_KEY) || '[]')
      return Array.isArray(projects) ? projects : []
    } catch {
      return []
    }
  }

  const saveProjects = (projects) => {
    localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects, null, 2))
    renderSavedProjects()
  }

  const splitLines = (value) =>
    String(value || '')
      .split(/\r?\n/)
      .map(item => item.trim())
      .filter(Boolean)

  const splitTags = (value) =>
    String(value || '')
      .split(',')
      .map(item => item.trim())
      .filter(Boolean)

  const readFileAsDataUrl = (file) => new Promise((resolve, reject) => {
    if (!file) {
      resolve('')
      return
    }

    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })

  const addMediaRow = () => {
    const fragment = mediaTemplate.content.cloneNode(true)
    const row = fragment.querySelector('.manager-media-row')
    row.querySelector('.remove-media-row')?.addEventListener('click', () => row.remove())
    mediaRows.appendChild(fragment)
  }

  const collectMedia = async () => {
    const rows = Array.from(mediaRows.querySelectorAll('.manager-media-row'))
    const media = []

    for (const row of rows) {
      const title = row.querySelector('[name="mediaTitle"]')?.value.trim()
      const description = row.querySelector('[name="mediaDescription"]')?.value.trim()
      const srcField = row.querySelector('[name="mediaSrc"]')?.value.trim()
      const href = row.querySelector('[name="mediaHref"]')?.value.trim()
      const file = row.querySelector('[name="mediaFile"]')?.files?.[0]
      const fileSrc = await readFileAsDataUrl(file)
      const src = fileSrc || srcField

      if (title || description || src || href) {
        media.push({
          title,
          description,
          src,
          href: href || src,
          alt: title
        })
      }
    }

    return media
  }

  const projectFromForm = async () => {
    const formData = new FormData(form)
    const links = []
    const live = formData.get('live')?.trim()
    const github = formData.get('github')?.trim()

    if (live) links.push({ label: 'Live', href: live })
    if (github) links.push({ label: 'GitHub', href: github })

    return {
      id: `project-${Date.now()}`,
      title: formData.get('title')?.trim(),
      description: formData.get('description')?.trim(),
      longDescription: formData.get('longDescription')?.trim(),
      tags: splitTags(formData.get('tags')),
      highlights: splitLines(formData.get('highlights')),
      links,
      media: await collectMedia()
    }
  }

  const renderSavedProjects = () => {
    const projects = readProjects()
    savedList.innerHTML = ''

    if (!projects.length) {
      const empty = document.createElement('p')
      empty.className = 'manager-empty'
      empty.textContent = 'No added projects yet.'
      savedList.appendChild(empty)
      return
    }

    projects.forEach((project, index) => {
      const card = document.createElement('article')
      card.className = 'saved-project-item'

      const copy = document.createElement('div')
      const title = document.createElement('h3')
      title.textContent = project.title || 'Untitled Project'
      const meta = document.createElement('p')
      const tagCount = Array.isArray(project.tags) ? project.tags.length : 0
      const mediaCount = Array.isArray(project.media) ? project.media.length : 0
      meta.textContent = `${tagCount} tags · ${mediaCount} media items`
      copy.append(title, meta)

      const remove = document.createElement('button')
      remove.type = 'button'
      remove.className = 'manager-icon-button'
      remove.textContent = 'Delete'
      remove.addEventListener('click', () => {
        const nextProjects = readProjects().filter((_, projectIndex) => projectIndex !== index)
        saveProjects(nextProjects)
      })

      card.append(copy, remove)
      savedList.appendChild(card)
    })
  }

  form?.addEventListener('submit', async (event) => {
    event.preventDefault()
    const submit = form.querySelector('[type="submit"]')
    submit.disabled = true
    submit.textContent = 'Saving...'

    try {
      const project = await projectFromForm()
      const projects = readProjects()
      projects.push(project)
      saveProjects(projects)
      form.reset()
      mediaRows.innerHTML = ''
      addMediaRow()
    } finally {
      submit.disabled = false
      submit.textContent = 'Save project'
    }
  })

  addMediaRowButton?.addEventListener('click', addMediaRow)
  resetFormButton?.addEventListener('click', () => {
    form.reset()
    mediaRows.innerHTML = ''
    addMediaRow()
  })

  exportButton?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(readProjects(), null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'portfolio-projects.json'
    anchor.click()
    URL.revokeObjectURL(url)
  })

  importInput?.addEventListener('change', async () => {
    const file = importInput.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const incoming = JSON.parse(text)
      if (!Array.isArray(incoming)) throw new Error('Project import must be an array.')
      saveProjects(incoming)
    } catch (error) {
      alert(error.message || 'Could not import projects.')
    } finally {
      importInput.value = ''
    }
  })

  clearButton?.addEventListener('click', () => {
    if (!confirm('Clear all projects added through the manager?')) return
    saveProjects([])
  })

  addMediaRow()
  renderSavedProjects()
})();
