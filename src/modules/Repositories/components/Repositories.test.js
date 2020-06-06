import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { mountWithIntl } from '../../../helpers/intl-enzyme-test-helper'
import Repositories from './index'
import store from '../../../store'

const item = {
  description: 'foo',
  full_name: 'facebook/react',
  updated_at: new Date(),
  forks: 4,
  open_issues: 2,
  stargazers_count: 1,
  watchers: 3
}

const setup = (items, totalCount) => {
  const props = {
    items: items || [item],
    totalCount: totalCount || 1,
    responseTime: 100
  }

  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <Repositories {...props} />
      </MemoryRouter>
    </Provider>
  )
  return { wrapper }
}

describe('Repositories', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()

    expect(wrapper.exists()).toBe(true)

    expect(wrapper.find('p').first().hasClass('text-info')).toBe(true)
    expect(wrapper.find('p').first().text()).toEqual('Results in 100 milliseconds')

    expect(wrapper.find('div').at(2).hasClass('list-group')).toBe(true)
    expect(wrapper.find('RepositoryItem').exists()).toBe(true)

    expect(wrapper.find('Pagination').exists()).toBe(false)
  })

  describe('when items prop is bigger than 10', () => {
    it('should render the pagination component', () => {
      const totalCount = 11
      const items = Array(totalCount).fill(item)
      const { wrapper } = setup(items, totalCount)

      expect(wrapper.exists()).toBe(true)
      expect(wrapper.find('RepositoryItem').length).toEqual(11)
      expect(wrapper.find('Pagination').exists()).toBe(true)
    })
  })

  describe('when items prop is empty', () => {
    it('should render the initial screen component', () => {
      const { wrapper } = setup([], 0)

      expect(wrapper.find('div').at(1).hasClass('card')).toBe(true)

      expect(wrapper.find('p').first().hasClass('lead')).toBe(true)
      expect(wrapper.find('p').first().text()).toMatch('Today is a beautiful day')
      expect(wrapper.find('p').last().text()).toMatch('Start now by')
    })
  })
})
