import { LoaderCircle } from 'lucide-react'

import { t } from '../i18n'

export function Loading() {
  return (
    <div
      className="flex items-center justify-center gap-3 py-16 text-slate-500"
      role="status"
    >
      <LoaderCircle className="animate-spin" aria-hidden="true" />
      <span>{t('loading')}</span>
    </div>
  )
}
