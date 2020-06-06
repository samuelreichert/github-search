import React from 'react'
import { Provider } from 'react-redux'
import { mountWithIntl } from './helpers/intl-enzyme-test-helper'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

import Repositories from './modules/Repositories'
import Search from './modules/Search'
import Footer from './modules/Footer'
import RepositoryDetails from './modules/RepositoryDetails'

const storeFake = state => {
  return {
    default: jest.fn(),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => state
  }
}

const setup = (initialEntries) => {
  const initialState = {
    repositories: {
      items: [],
      loading: false,
      totalCount: 0,
      responseTime: 0,
      error: null
    },
    search: {
      searchText: ''
    }
  }
  const store = storeFake(initialState)
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    </Provider>
  )
  return { wrapper }
}

describe('App', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup(['/'])

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find(Search)).toHaveLength(1)
    expect(wrapper.find(Repositories)).toHaveLength(1)
    expect(wrapper.find(Footer)).toHaveLength(1)

    expect(wrapper.find(RepositoryDetails)).toHaveLength(0)
  })
})
