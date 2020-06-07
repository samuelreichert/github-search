import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useIntl } from 'react-intl'
import ReactMarkdown from 'react-markdown/with-html'
import buildReadableCount from '../../../common/buildReadableCount'

import './index.css'

const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''))

const RepositoryDetails = ({
  repository: {
    description,
    forks,
    full_name: fullName,
    homepage,
    html_url: homeUrl,
    language,
    license,
    open_issues: openIssues,
    owner: {
      avatar_url: avatarUrl,
      html_url: htmlUrl,
      login: ownerLogin = ''
    } = {},
    private: isPrivate,
    stargazers_count: starsCount,
    watchers
  } = {},
  readme,
  languages
}) => {
  const { formatMessage } = useIntl()

  return (
    <div className='pt-3 pb-5 container'>
      <Link to='/' className='btn btn-link mb-3'>
        <i className='fas fa-arrow-left mr-2' /> {formatMessage({ id: 'home' })}
      </Link>

      <h1 className='h3 full-name'>
        {isPrivate && <span className='mr-3'><i className='fas fa-user-lock fa-xs' /></span>}
        {fullName}
        <a href={homeUrl} target='_blank' rel='noopener noreferrer' className='ml-3'>
          <i className='fas fa-external-link-alt fa-xs' />
        </a>
      </h1>

      <div className='bg-white py-4 px-3 mt-3'>
        <div className='d-flex justify-content-between'>
          <span className='hover-badge d-inline-block'>
            <i className='far fa-star mr-1' /> {buildReadableCount(starsCount)} {formatMessage({ id: 'stars' })}
          </span>

          {language &&
            <span className='hover-badge d-inline-block'>
              <i className='fas fa-code mr-1' /> {language}
            </span>}

          <span className='hover-badge d-inline-block'>
            <i className='fas fa-exclamation-circle mr-1' /> {buildReadableCount(openIssues)} {formatMessage({ id: 'issues' })}
          </span>

          <span className='hover-badge d-inline-block'>
            <i className='far fa-eye mr-1' /> {buildReadableCount(watchers)} {formatMessage({ id: 'watchers' })}
          </span>

          <span className='hover-badge d-inline-block'>
            <i className='fas fa-code-branch mr-1' /> {buildReadableCount(forks)} {formatMessage({ id: 'forks' })}
          </span>
        </div>

        <div className='d-flex align-items-center justify-content-center'>
          <div className='d-flex my-5 pr-4 border-right'>
            <img
              alt={formatMessage({ id: 'repoOwnerImage' })}
              className='rounded'
              src={avatarUrl}
              style={{ width: '100px' }}
            />
            <div className='ml-4 d-flex flex-column justify-content-between'>
              {ownerLogin && <p className='lead'>{capitalize(ownerLogin)}</p>}
              <a href={htmlUrl}>{htmlUrl}</a>
            </div>
          </div>

          <div className='pl-4'>
            <p className='mb-1'>{description}</p>
            <a href={homepage} className='mb-1 d-block'>{homepage}</a>

            {license &&
              <p>
                {formatMessage({ id: 'license' })}
                <a href={license.url} className='ml-2'>
                  <i className='fas fa-balance-scale mr-1' />
                  {license.name}
                </a>
              </p>}

            <h5 className='languages'>
              {languages.map((lang) => (
                <span className='badge badge-info mr-2' key={lang}>{lang}</span>
              ))}
            </h5>
          </div>
        </div>

        {readme &&
          <div>
            <h3 className='ml-3'>{formatMessage({ id: 'readme' })}</h3>

            <div className='jumbotron ml-3'>
              <ReactMarkdown source={readme} escapeHtml={false} />
            </div>
          </div>}
      </div>
    </div>
  )
}

RepositoryDetails.propTypes = {
  repository: PropTypes.shape({
    description: PropTypes.string,
    forks: PropTypes.number,
    full_name: PropTypes.string.isRequired,
    homepage: PropTypes.string,
    html_url: PropTypes.string,
    language: PropTypes.string,
    license: PropTypes.object,
    open_issues: PropTypes.number,
    owner: PropTypes.shape({
      avatar_url: PropTypes.string,
      html_url: PropTypes.string,
      login: PropTypes.string
    }),
    private: PropTypes.bool,
    stargazers_count: PropTypes.number,
    watchers: PropTypes.number
  }),
  readme: PropTypes.string,
  languages: PropTypes.array
}

export default RepositoryDetails
