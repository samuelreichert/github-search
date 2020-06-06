import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mountWithIntl } from '../../../helpers/intl-enzyme-test-helper'
import RepositoryDetails from './index'
import ReactMarkdown from 'react-markdown/with-html'

const languages = ['abc', 'def']
const license = {
  url: 'http://foo.com',
  name: 'FOO'
}
const readme = 'Foo'

const props = {
  repository: {
    description: 'description',
    forks: 4,
    full_name: 'facebook/react',
    homepage: 'http://foo.com',
    html_url: 'http://foo.com',
    language: 'foo.js',
    open_issues: 2,
    owner: {
      avatar_url: 'abc',
      html_url: 'abc',
      login: 'abc'
    },
    updated_at: new Date(),
    stargazers_count: 1,
    watchers: 3
  },
  languages: []
}

const fullProps = {
  repository: {
    ...props.repository,
    license
  },
  languages,
  readme
}

const setup = (props) => {
  const wrapper = mountWithIntl(
    <MemoryRouter>
      <RepositoryDetails {...props} />
    </MemoryRouter>
  )
  return { wrapper }
}

describe('RepositoryDetails', () => {
  it('should render self and subcomponents', () => {
    const { wrapper } = setup(props)

    expect(wrapper.exists()).toBe(true)

    expect(wrapper.find('h1').text()).toMatch('facebook/react')
    expect(wrapper.find('span.hover-badge').length).toEqual(5)
    expect(wrapper.find('span.hover-badge').first().text()).toMatch('1')
    expect(wrapper.find('span.hover-badge').at(1).text()).toMatch('foo.js')
    expect(wrapper.find('span.hover-badge').at(2).text()).toMatch('2')
    expect(wrapper.find('span.hover-badge').at(3).text()).toMatch('3')
    expect(wrapper.find('span.hover-badge').last().text()).toMatch('4')
    expect(wrapper.find('p.mb-1').text()).toEqual('description')
  })

  it('should render a repository with license, languages and readme', () => {
    const { wrapper } = setup(fullProps)

    expect(wrapper.exists()).toBe(true)

    // license
    const licenseLink = wrapper.find('a.ml-2')
    expect(licenseLink.props().href).toEqual('http://foo.com')
    expect(licenseLink.text()).toMatch('FOO')

    // languages
    expect(wrapper.find('span.badge').length).toEqual(2)
    expect(wrapper.find('span.badge').first().text()).toEqual('abc')

    // readme
    expect(wrapper.find('h3').text()).toEqual('Readme')
    expect(wrapper.find('div.jumbotron').exists()).toBe(true)
    expect(wrapper.find(ReactMarkdown).exists()).toBe(true)
    expect(wrapper.find(ReactMarkdown).props().source).toEqual('Foo')
  })
})
