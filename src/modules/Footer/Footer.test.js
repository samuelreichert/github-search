import React from 'react'
import { mountWithIntl } from '../../helpers/intl-enzyme-test-helper'

import Footer from './index'

const setup = () => {
  const wrapper = mountWithIntl(<Footer />)
  return { wrapper }
}

describe('Footer', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()

    expect(wrapper.find('footer').hasClass('footer')).toBe(true)
    expect(wrapper.find('p').first().text()).toMatch('Would you like to search')
    expect(wrapper.find('a').text()).toBe('here')
  })
})
