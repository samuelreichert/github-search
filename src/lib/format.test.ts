import { describe, expect, it } from 'vitest'

import { capitalize, formatCount } from './format'

describe('formatCount', () => {
  it('keeps small counts readable', () => {
    expect(formatCount(999)).toBe('999')
  })

  it('abbreviates counts over one thousand', () => {
    expect(formatCount(1500)).toBe('1.5k')
  })
})

describe('capitalize', () => {
  it('capitalizes a repository owner login', () => {
    expect(capitalize('github')).toBe('Github')
  })
})
