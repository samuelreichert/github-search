import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { mountWithIntl } from '../../../helpers/intl-enzyme-test-helper'

import MySearchContainer, { SearchContainer } from './Search'
import Search from '../components'

const storeFake = state => {
  return {
    default: jest.fn(),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => state
  }
}

const setup = () => {
  const store = storeFake({ search: { searchText: '' } })
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <MySearchContainer />
      </MemoryRouter>
    </Provider>
  )
  return { wrapper }
}

describe('container <Search />', () => {
  it('should render both the container and the component ', () => {
    const { wrapper } = setup()
    const container = wrapper.find(SearchContainer)
    const component = wrapper.find(Search)

    expect(wrapper.exists()).toBe(true)
    expect(container.length).toBeTruthy()
    expect(component.length).toBeTruthy()
  })

  it('should map state to props', () => {
    const { wrapper } = setup()
    const container = wrapper.find(SearchContainer)
    const expectedPropKeys = ['searchText']

    expect(Object.keys(container.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  })

  it('should map dispatch to props', () => {
    const { wrapper } = setup()
    const container = wrapper.find(SearchContainer)
    const expectedPropKeys = [
      'setLoading',
      'updateRepositories',
      'setSearchText',
      'setError'
    ]

    expect(Object.keys(container.props())).toEqual(expect.arrayContaining(expectedPropKeys))
  })
})
