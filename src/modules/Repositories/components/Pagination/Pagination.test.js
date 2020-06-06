import React from 'react'
import { mount } from 'enzyme'

import Pagination from './index'

const setup = () => {
  const props = {
    handlePageChange: jest.fn(),
    totalCount: 12,
    activePage: '1'
  }
  const wrapper = mount(<Pagination {...props} />)
  return { wrapper, props }
}

describe('Pagination', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('div').first().hasClass('justify-content-center')).toBe(true)
  })

  it('should render two page number links', () => {
    const { wrapper } = setup()

    expect(wrapper.find('a').at(2).text()).toEqual('1')
    expect(wrapper.find('a').at(3).text()).toEqual('2')
    expect(wrapper.find('a').at(4).text()).not.toMatch('3')
  })

  it('should call handlePageChange when changing in a page number', () => {
    const { wrapper, props } = setup()

    const pagetwoLink = wrapper.find('a').at(3)
    pagetwoLink.simulate('click')

    expect(pagetwoLink.text()).toEqual('2')
    expect(props.handlePageChange).toHaveBeenCalled()
    expect(props.handlePageChange).toHaveBeenCalledWith(2)
  })
})
