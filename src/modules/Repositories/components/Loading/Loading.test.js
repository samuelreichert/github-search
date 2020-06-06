import React from 'react'
import { mountWithIntl } from '../../../../helpers/intl-enzyme-test-helper'

import Loading from './index'

const setup = () => {
  const wrapper = mountWithIntl(<Loading />)
  return { wrapper }
}

describe('Loading', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('div').last().hasClass('spinner-border')).toBe(true)
    expect(wrapper.find('span').text()).toEqual('Loading...')
  })
})
