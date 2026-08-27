export function formatCount(count = 0) {
  if (count < 1000) return count.toString()
  return `${(count / 1000).toFixed(1)}k`
}

export function formatDate(date: string) {
  return new Date(date).toLocaleString(navigator.language)
}

export function capitalize(value = '') {
  return value ? `${value[0].toUpperCase()}${value.slice(1)}` : ''
}
