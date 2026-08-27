import type { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'

import { store } from './app/store'
import { Footer } from './components/Footer'
import './index.css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return (
    <Provider store={store}>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Provider>
  )
}
