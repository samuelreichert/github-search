import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('pages/SearchPage.tsx'),
  route('repository', 'pages/RepositoryPage.tsx'),
] satisfies RouteConfig
