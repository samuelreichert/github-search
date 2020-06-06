import React from 'react'
import { Provider } from 'react-redux'
import { mountWithIntl } from '../../../helpers/intl-enzyme-test-helper'
import MyRepositoriesContainer, { RepositoriesContainer } from './Repositories'
import Repositories from '../components'

const storeFake = state => {
  return {
    default: jest.fn(),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => state
  }
}

const setup = () => {
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
      <MyRepositoriesContainer />
    </Provider>
  )
  return { wrapper }
}

describe('container <Repositories />', () => {
  it('should render both the container and the component ', () => {
    const { wrapper } = setup()
    const container = wrapper.find(RepositoriesContainer)
    const component = wrapper.find(Repositories)

    expect(wrapper.exists()).toBe(true)
    expect(container.length).toBeTruthy()
    expect(component.length).toBeTruthy()
  })

  it('should map state to props', () => {
    const { wrapper } = setup()
    const container = wrapper.find(RepositoriesContainer)
    const expectedPropKeys = [
      'items',
      'loading',
      'totalCount',
      'responseTime',
      'searchText',
      'error'
    ]

    expect(Object.keys(container.props())).toEqual(expect.arrayContaining(expectedPropKeys))
  })
})
