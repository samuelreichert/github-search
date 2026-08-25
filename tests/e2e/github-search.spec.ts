import { expect, test } from '@playwright/test'

const repository = {
  description: 'The library for web and native user interfaces.',
  forks: 45000,
  full_name: 'facebook/react',
  homepage: 'https://react.dev',
  html_url: 'https://github.com/facebook/react',
  language: 'JavaScript',
  languages_url: 'https://api.github.com/repos/facebook/react/languages',
  license: { name: 'MIT License', url: 'https://api.github.com/licenses/mit' },
  open_issues: 1000,
  owner: {
    avatar_url: 'https://avatars.githubusercontent.com/u/69631?v=4',
    html_url: 'https://github.com/facebook',
    login: 'facebook',
  },
  private: false,
  stargazers_count: 240000,
  updated_at: '2026-01-01T00:00:00Z',
  watchers: 240000,
}

async function mockGithub(page: import('@playwright/test').Page) {
  await page.route('https://api.github.com/**', async (route) => {
    const url = new URL(route.request().url())
    if (url.pathname === '/search/repositories') {
      const selectedPage = Number(url.searchParams.get('page'))
      return route.fulfill({
        json: {
          items:
            selectedPage === 1
              ? [repository]
              : [{ ...repository, full_name: 'vitejs/vite' }],
          total_count: 20,
        },
      })
    }
    if (url.pathname === '/repos/facebook/react/languages') {
      return route.fulfill({ json: { JavaScript: 100, TypeScript: 50 } })
    }
    if (url.pathname === '/repos/facebook/react/readme') {
      return route.fulfill({
        json: { content: btoa('# React\n\nA JavaScript library.') },
      })
    }
    if (url.pathname === '/repos/facebook/react') {
      return route.fulfill({ json: repository })
    }
    return route.abort()
  })
}

test.beforeEach(async ({ page }) => {
  await mockGithub(page)
})

test('searches repositories and changes results pages', async ({ page }) => {
  await page.goto('/')
  await page.getByPlaceholder('Search repositories...').fill('react')

  await expect(page).toHaveURL('/?q=react&page=1')
  await expect(
    page.getByRole('heading', { name: 'facebook/react' }),
  ).toBeVisible()

  await page.getByRole('button', { name: '2' }).click()
  await expect(page).toHaveURL('/?q=react&page=2')
  await expect(page.getByRole('heading', { name: 'vitejs/vite' })).toBeVisible()
})

test('opens a repository deep link', async ({ page }) => {
  await page.goto('/repository?name=facebook%2Freact')

  await expect(
    page.getByRole('heading', { name: 'facebook/react' }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Readme' })).toBeVisible()
  await expect(page.getByText('TypeScript')).toBeVisible()
  await expect(page.getByRole('link', { name: 'MIT License' })).toBeVisible()
})
