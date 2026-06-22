const textarea = typeof document !== 'undefined' ? document.createElement('textarea') : null

export function decodeHtml(str) {
  if (!str || !textarea) return str ?? ''
  textarea.innerHTML = str
  return textarea.value
}
