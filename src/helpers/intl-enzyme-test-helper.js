/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import { IntlProvider } from 'react-intl'
import { mount, shallow } from 'enzyme'
import en from '../locales/en'

const messages = en
const defaultLocale = 'en'
const locale = defaultLocale

export const mountWithIntl = (node) => {
  return mount(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages
    }
  })
}
export const shallowWithIntl = (node) => {
  return shallow(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages
    }
  })
}
