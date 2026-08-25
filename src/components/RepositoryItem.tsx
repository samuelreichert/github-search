import {
  Binoculars,
  CircleAlert,
  Code2,
  GitFork,
  LockKeyhole,
  Star,
} from 'lucide-react'
import { Link } from 'react-router'

import type { Repository } from '../api/github'
import { t } from '../i18n'
import { formatDate } from '../lib/format'
import { Metric } from './Metric'

export function RepositoryItem({ repository }: { repository: Repository }) {
  return (
    <Link
      aria-label={t('viewRepository', { name: repository.full_name })}
      className="block px-5 py-5 hover:bg-brand-50 focus:bg-brand-50 focus:outline-none"
      to={`/repository?name=${encodeURIComponent(repository.full_name)}`}
    >
      <div className="flex flex-col justify-between gap-2 sm:flex-row">
        <h2 className="flex items-center gap-2 font-semibold text-brand-700">
          {repository.private && <LockKeyhole size={16} aria-hidden="true" />}
          {repository.full_name}
        </h2>
        <span className="text-xs text-slate-500">
          {t('updatedAt', { date: formatDate(repository.updated_at) })}
        </span>
      </div>
      {repository.description && (
        <p className="mt-2 text-sm text-slate-600">{repository.description}</p>
      )}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
        <Metric icon={Star} value={repository.stargazers_count} />
        {repository.language && (
          <Metric icon={Code2} value={repository.language} />
        )}
        <Metric icon={CircleAlert} value={repository.open_issues} />
        <Metric icon={Binoculars} value={repository.watchers} />
        <Metric icon={GitFork} value={repository.forks} />
      </div>
    </Link>
  )
}
