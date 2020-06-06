import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { mountWithIntl } from '../../../helpers/intl-enzyme-test-helper'
import MyRepositoryDetailsContainer, { RepositoryDetailsContainer } from './RepositoryDetails'
import RepositoryDetails from '../components'

const storeFake = state => {
  return {
    default: jest.fn(),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => state
  }
}

const setup = () => {
  const store = storeFake({ repositories: { items: [] } })
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <MemoryRouter>
        <MyRepositoryDetailsContainer />
      </MemoryRouter>
    </Provider>
  )
  return { wrapper }
}

describe('container <RepositoryDetails />', () => {
  it('should render both the container and the component ', () => {
    const { wrapper } = setup()
    const container = wrapper.find(RepositoryDetailsContainer)
    const component = wrapper.find(RepositoryDetails)

    expect(wrapper.exists()).toBe(true)
    expect(container.length).toBeTruthy()
    expect(component.length).toBeTruthy()
  })

  it('should map state to props', () => {
    const { wrapper } = setup()
    const container = wrapper.find(RepositoryDetailsContainer)
    const expectedPropKeys = ['items']

    expect(Object.keys(container.props())).toEqual(expect.arrayContaining(expectedPropKeys))
  })
})
