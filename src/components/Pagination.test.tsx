import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('selects another results page', () => {
    const onPageChange = vi.fn()
    render(
      <Pagination activePage={1} onPageChange={onPageChange} totalCount={30} />,
    )

    fireEvent.click(screen.getByRole('button', { name: '2' }))

    expect(onPageChange).toHaveBeenCalledWith(2)
    expect(screen.getByRole('button', { name: '1' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })
})
