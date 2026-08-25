# Roadmap

## Recommended Next Features

### 1. Advanced Search Filters

Add filters for language, minimum stars, updated date, sort order, and topic. Store filter values in URL parameters so searches remain shareable and browser navigation works correctly.

### 2. Saved Repositories and Collections

Allow users to bookmark repositories, organize them into collections, and persist data in `localStorage`. This adds value without requiring a backend. Repository comparison can be added later.

### 3. Secure GitHub Authentication

Add GitHub OAuth through a small backend or serverless function. The current `VITE_GITHUB_TOKEN` approach is suitable for local development only. It must not be used in a deployed build because build-time browser environment values are exposed to users.

Authentication would safely enable private repository search and higher API limits.

## Recommended Order

1. Advanced search filters
2. Saved repositories and collections
3. Secure GitHub authentication before deploying private repository support
