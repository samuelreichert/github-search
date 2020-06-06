import React from 'react'
import { mountWithIntl } from '../../../helpers/intl-enzyme-test-helper'

import Search from './index'

const setup = () => {
  const props = {
    onChange: jest.fn()
  }
  const wrapper = mountWithIntl(<Search {...props} />)
  return { wrapper, props }
}

describe('Search', () => {
  it('should render self and subcomponents', () => {
    const { wrapper, props } = setup()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('h1').text()).toEqual('GitHub Search')
    expect(wrapper.find('input').hasClass('form-control')).toBe(true)
    expect(wrapper.find('input').props().onChange).toEqual(props.onChange)
  })

  it('should call onChange when typing something on the input', () => {
    const { wrapper, props } = setup()

    const input = wrapper.find('input')
    input.props().onChange('react')

    expect(props.onChange).toHaveBeenCalled()
    expect(props.onChange).toHaveBeenCalledWith('react')
  })
})
