import React from 'react'
import { mountWithIntl } from '../../../../helpers/intl-enzyme-test-helper'

import RepositoriesNotFound from './index'

const setup = () => {
  const wrapper = mountWithIntl(<RepositoriesNotFound />)
  return { wrapper }
}

describe('RepositoriesNotFound', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup()

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('div').at(1).hasClass('card')).toBe(true)

    expect(wrapper.find('p').text()).toMatch('We could not find any repository')
  })
})
