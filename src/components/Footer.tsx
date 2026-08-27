import { t } from '../i18n'

export function Footer() {
  return (
    <footer className="bg-slate-950 px-6 py-8 text-center text-sm text-slate-300">
      <p>{t('footerText')}</p>
      <p className="mt-2">
        <a
          className="text-blue-300 underline hover:text-blue-200"
          href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
          rel="noreferrer"
          target="_blank"
        >
          {t('footerText2')}
        </a>{' '}
        {t('footerText3')}
      </p>
    </footer>
  )
}
