import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mountWithIntl } from '../../../../helpers/intl-enzyme-test-helper'
import RepositoryItem from './index'

const setup = () => {
  const props = {
    item: {
      description: 'foo',
      full_name: 'facebook/react',
      updated_at: new Date(),
      forks: 4,
      open_issues: 2,
      stargazers_count: 1,
      watchers: 3
    }
  }
  const wrapper = mountWithIntl(
    <MemoryRouter>
      <RepositoryItem {...props} />
    </MemoryRouter>
  )
  return { wrapper }
}

describe('RepositoryItem', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()

    expect(wrapper.exists()).toBe(true)

    expect(wrapper.find('h5').text()).toMatch('facebook/react')
    expect(wrapper.find('p').text()).toEqual('foo')
    expect(wrapper.find('span').first().text()).toMatch('1')
    expect(wrapper.find('span').at(1).text()).toMatch('2')
    expect(wrapper.find('span').at(2).text()).toMatch('3')
    expect(wrapper.find('span').last().text()).toMatch('4')
  })

  it('should render Link correctly', () => {
    const { wrapper } = setup()

    const link = wrapper.find('Link')
    expect(link.hasClass('list-group-item')).toBe(true)
    expect(link.props().to).toBe('/repository?name=facebook/react')
  })
})
