export interface RepositoryOwner {
  avatar_url: string
  html_url: string
  login: string
}

export interface Repository {
  description: string | null
  forks: number
  full_name: string
  homepage: string | null
  html_url: string
  language: string | null
  languages_url: string
  license: { name: string; url: string } | null
  open_issues: number
  owner: RepositoryOwner
  private: boolean
  stargazers_count: number
  updated_at: string
  watchers: number
}

export interface RepositorySearchResponse {
  items: Repository[]
  total_count: number
}

const githubUrl = import.meta.env.VITE_GITHUB_URL || 'https://api.github.com'
const githubToken = import.meta.env.VITE_GITHUB_TOKEN

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const url = path.startsWith('http') ? path : `${githubUrl}${path}`
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }

  if (githubToken) headers.Authorization = `Bearer ${githubToken}`

  const response = await fetch(url, { headers, signal })
  if (!response.ok) {
    throw new Error(`GitHub request failed with status ${response.status}`)
  }
  return response.json() as Promise<T>
}

export async function searchRepositories(
  search: string,
  page = 1,
  signal?: AbortSignal,
) {
  const params = new URLSearchParams({
    q: search,
    page: page.toString(),
    per_page: '10',
  })
  return request<RepositorySearchResponse>(
    `/search/repositories?${params}`,
    signal,
  )
}

export function getRepository(name: string, signal?: AbortSignal) {
  return request<Repository>(`/repos/${name}`, signal)
}

export async function getLanguages(url: string, signal?: AbortSignal) {
  const languages = await request<Record<string, number>>(url, signal)
  return Object.keys(languages).sort((a, b) => languages[b] - languages[a])
}

export async function getReadme(name: string, signal?: AbortSignal) {
  const { content } = await request<{ content: string }>(
    `/repos/${name}/readme`,
    signal,
  )
  const binary = window.atob(content.replace(/\n/g, ''))
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}
