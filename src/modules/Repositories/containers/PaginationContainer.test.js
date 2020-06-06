import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { mount } from 'enzyme'
import MyPaginationContainer, { PaginationContainer } from './Pagination'
import Pagination from '../components/Pagination'

const storeFake = state => {
  return {
    default: jest.fn(),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => state
  }
}

const setup = () => {
  const store = storeFake({ repositories: { totalCount: 11 } })
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <MyPaginationContainer />
      </MemoryRouter>
    </Provider>
  )
  return { wrapper }
}

describe('container <Pagination />', () => {
  it('should render both the container and the component ', () => {
    const { wrapper } = setup()
    const container = wrapper.find(PaginationContainer)
    const component = wrapper.find(Pagination)

    expect(wrapper.exists()).toBe(true)
    expect(container.length).toBeTruthy()
    expect(component.length).toBeTruthy()
  })

  it('should map state to props', () => {
    const { wrapper } = setup()
    const container = wrapper.find(PaginationContainer)
    const expectedPropKeys = ['totalCount']

    expect(Object.keys(container.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  })

  it('should map dispatch to props', () => {
    const { wrapper } = setup()
    const container = wrapper.find(PaginationContainer)
    const expectedPropKeys = ['setLoading', 'updateRepositories', 'setError']

    expect(Object.keys(container.props())).toEqual(expect.arrayContaining(expectedPropKeys))
  })
})
