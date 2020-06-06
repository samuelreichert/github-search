import React from 'react'
import { mountWithIntl } from '../../helpers/intl-enzyme-test-helper'

import ErrorCard from './index'

const setup = () => {
  const props = { messageId: 'repositoriesError' }
  const wrapper = mountWithIntl(<ErrorCard {...props} />)
  return { wrapper }
}

describe('ErrorCard', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()

    expect(wrapper.find('p').hasClass('lead')).toBe(true)
    expect(wrapper.find('i').hasClass('fa-exclamation-circle')).toBe(true)

    expect(wrapper.find('span').text()).toMatch('Unfortunately')
  })
})
