import { ChevronLeft, ChevronRight } from 'lucide-react'

import { t } from '../i18n'

interface PaginationProps {
  activePage: number
  onPageChange: (page: number) => void
  totalCount: number
}

function getVisiblePages(activePage: number, pageCount: number) {
  const firstPage = Math.max(1, Math.min(activePage - 2, pageCount - 4))
  return Array.from(
    { length: Math.min(5, pageCount) },
    (_, index) => firstPage + index,
  )
}

export function Pagination({
  activePage,
  onPageChange,
  totalCount,
}: PaginationProps) {
  const pageCount = Math.ceil(Math.min(totalCount, 1000) / 10)
  if (pageCount < 2) return null

  const buttonClass =
    'inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium'

  return (
    <nav className="mt-8 flex justify-center gap-2" aria-label="Pagination">
      <button
        className={`${buttonClass} border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40`}
        disabled={activePage === 1}
        onClick={() => onPageChange(activePage - 1)}
        type="button"
      >
        <ChevronLeft size={16} aria-hidden="true" />
        <span className="sr-only">{t('previous')}</span>
      </button>
      {getVisiblePages(activePage, pageCount).map((page) => (
        <button
          aria-current={page === activePage ? 'page' : undefined}
          className={`${buttonClass} ${
            page === activePage
              ? 'border-brand-600 bg-brand-600 text-white'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
          }`}
          key={page}
          onClick={() => onPageChange(page)}
          type="button"
        >
          {page}
        </button>
      ))}
      <button
        className={`${buttonClass} border-slate-200 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40`}
        disabled={activePage === pageCount}
        onClick={() => onPageChange(activePage + 1)}
        type="button"
      >
        <ChevronRight size={16} aria-hidden="true" />
        <span className="sr-only">{t('next')}</span>
      </button>
    </nav>
  )
}
