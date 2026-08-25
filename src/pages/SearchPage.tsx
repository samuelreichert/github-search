import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Alert } from '../components/Alert'
import { Loading } from '../components/Loading'
import { Pagination } from '../components/Pagination'
import { RepositoryItem } from '../components/RepositoryItem'
import {
  clearRepositories,
  fetchRepositories,
} from '../features/repositories/repositoriesSlice'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { t } from '../i18n'

function getPage(searchParams: URLSearchParams) {
  return Math.max(1, Number(searchParams.get('page')) || 1)
}

export function SearchPage() {
  const dispatch = useAppDispatch()
  const { error, items, responseTime, status, totalCount } = useAppSelector(
    (state) => state.repositories,
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() || ''
  const page = getPage(searchParams)
  const [searchText, setSearchText] = useState(query)
  const debouncedSearchText = useDebouncedValue(searchText, 500)

  useEffect(() => setSearchText(query), [query])

  useEffect(() => {
    const nextQuery = debouncedSearchText.trim()
    if (nextQuery === query) return
    setSearchParams(nextQuery ? { q: nextQuery, page: '1' } : {})
  }, [debouncedSearchText, query, setSearchParams])

  useEffect(() => {
    if (!query) {
      dispatch(clearRepositories())
      return
    }
    const request = dispatch(fetchRepositories({ search: query, page }))
    return () => request.abort()
  }, [dispatch, page, query])

  const changePage = (selectedPage: number) => {
    setSearchParams({ q: query, page: selectedPage.toString() })
    window.scrollTo({ behavior: 'smooth', top: 0 })
  }

  return (
    <>
      <header className="bg-slate-950 px-6 py-14 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            {t('searchTitle')}
          </h1>
          <p className="mt-3 text-slate-300">{t('searchSubtitle')}</p>
          <label className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-xl bg-white px-4 py-3 text-slate-700 shadow-lg">
            <Search size={20} aria-hidden="true" />
            <span className="sr-only">{t('searchPlaceholder')}</span>
            <input
              className="w-full bg-transparent text-lg outline-none placeholder:text-slate-400"
              onChange={(event) => setSearchText(event.target.value)}
              placeholder={t('searchPlaceholder')}
              type="search"
              value={searchText}
            />
          </label>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-10">
        {!query && (
          <div className="content-card p-8 text-center">
            <p className="text-lg font-medium text-slate-800">
              {t('initialScreenPhrase')}
            </p>
            <p className="mt-2 text-slate-500">{t('secondaryPhrase')}</p>
          </div>
        )}

        {query && status === 'loading' && <Loading />}
        {status === 'failed' && <Alert message={t('repositoriesError')} />}

        {status === 'succeeded' && totalCount === 0 && (
          <div className="content-card p-8 text-center text-slate-600">
            {t('repositoriesNotFoundText')}
          </div>
        )}

        {status === 'succeeded' && items.length > 0 && (
          <>
            <p className="mb-3 text-right text-xs text-slate-500">
              {t('searchTime', { time: responseTime })}
            </p>
            <div className="content-card divide-y divide-slate-100 overflow-hidden">
              {items.map((repository) => (
                <RepositoryItem
                  key={repository.full_name}
                  repository={repository}
                />
              ))}
            </div>
            <Pagination
              activePage={page}
              onPageChange={changePage}
              totalCount={totalCount}
            />
          </>
        )}

        {error && <span className="sr-only">{error}</span>}
      </section>
    </>
  )
}

export default SearchPage
