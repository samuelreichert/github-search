import {
  ArrowLeft,
  Binoculars,
  CircleAlert,
  Code2,
  ExternalLink,
  GitFork,
  LockKeyhole,
  Scale,
  Star,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, useSearchParams } from 'react-router'

import { getLanguages, getReadme, getRepository } from '../api/github'
import type { Repository } from '../api/github'
import { Alert } from '../components/Alert'
import { Loading } from '../components/Loading'
import { Metric } from '../components/Metric'
import { t } from '../i18n'
import { capitalize } from '../lib/format'

export function RepositoryPage() {
  const [searchParams] = useSearchParams()
  const name = searchParams.get('name') || ''
  const [repository, setRepository] = useState<Repository>()
  const [languages, setLanguages] = useState<string[]>([])
  const [readme, setReadme] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    setRepository(undefined)
    setLanguages([])
    setReadme('')
    setError(false)

    async function loadRepository() {
      try {
        if (!name) throw new Error('Repository name is required')
        const nextRepository = await getRepository(name, controller.signal)
        setRepository(nextRepository)

        const [nextLanguages, nextReadme] = await Promise.allSettled([
          getLanguages(nextRepository.languages_url, controller.signal),
          getReadme(nextRepository.full_name, controller.signal),
        ])
        if (nextLanguages.status === 'fulfilled')
          setLanguages(nextLanguages.value)
        if (nextReadme.status === 'fulfilled') setReadme(nextReadme.value)
      } catch (caughtError) {
        if (
          caughtError instanceof DOMException &&
          caughtError.name === 'AbortError'
        )
          return
        setError(true)
      }
    }

    void loadRepository()
    return () => controller.abort()
  }, [name])

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-10">
        <BackLink />
        <Alert message={t('repositoryError')} />
      </div>
    )
  }

  if (!repository) return <Loading />

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <BackLink />
      <div className="mt-6 flex items-center gap-3">
        {repository.private && <LockKeyhole size={20} aria-hidden="true" />}
        <h1 className="text-3xl font-bold tracking-tight">
          {repository.full_name}
        </h1>
        <a
          aria-label={`Open ${repository.full_name} on GitHub`}
          className="text-brand-600 hover:text-brand-700"
          href={repository.html_url}
          rel="noreferrer"
          target="_blank"
        >
          <ExternalLink size={20} aria-hidden="true" />
        </a>
      </div>

      <section className="content-card mt-6 overflow-hidden">
        <div className="flex flex-wrap justify-between gap-4 border-b border-slate-100 p-5 text-sm text-slate-600">
          <Metric
            icon={Star}
            label={t('stars')}
            value={repository.stargazers_count}
          />
          {repository.language && (
            <Metric icon={Code2} value={repository.language} />
          )}
          <Metric
            icon={CircleAlert}
            label={t('issues')}
            value={repository.open_issues}
          />
          <Metric
            icon={Binoculars}
            label={t('watchers')}
            value={repository.watchers}
          />
          <Metric icon={GitFork} label={t('forks')} value={repository.forks} />
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[220px_1fr]">
          <div className="flex flex-col items-center gap-3 border-b border-slate-100 pb-6 text-center md:border-r md:border-b-0 md:pr-6 md:pb-0">
            <img
              alt={t('repoOwnerImage')}
              className="h-24 w-24 rounded-2xl"
              src={repository.owner.avatar_url}
            />
            <p className="font-medium">{capitalize(repository.owner.login)}</p>
            <a
              className="break-all text-sm text-brand-600 hover:text-brand-700 hover:underline"
              href={repository.owner.html_url}
              rel="noreferrer"
              target="_blank"
            >
              {repository.owner.html_url}
            </a>
          </div>

          <div>
            {repository.description && (
              <p className="text-slate-700">{repository.description}</p>
            )}
            {repository.homepage && (
              <a
                className="mt-3 block break-all text-brand-600 hover:text-brand-700 hover:underline"
                href={repository.homepage}
                rel="noreferrer"
                target="_blank"
              >
                {repository.homepage}
              </a>
            )}
            {repository.license && (
              <a
                className="mt-4 inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 hover:underline"
                href={repository.license.url}
                rel="noreferrer"
                target="_blank"
              >
                <Scale size={16} aria-hidden="true" />
                {t('license')}: {repository.license.name}
              </a>
            )}
            {languages.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2" aria-label="Languages">
                {languages.map((language) => (
                  <span
                    className="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-700"
                    key={language}
                  >
                    {language}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {readme && (
        <section className="content-card mt-6 p-6">
          <h2 className="text-2xl font-semibold">{t('readme')}</h2>
          <div className="markdown-body mt-5">
            <ReactMarkdown>{readme}</ReactMarkdown>
          </div>
        </section>
      )}
    </div>
  )
}

export default RepositoryPage

function BackLink() {
  return (
    <Link
      className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700"
      to="/"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      {t('home')}
    </Link>
  )
}
