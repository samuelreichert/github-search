import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
    license: {
      name: licenseName,
      url: licenseUrl
    } = {},
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
  languages,
  formatMessage
}) => (
  <div className='pt-3 pb-5 container'>
    <Link to='/' className='btn btn-link mb-3'>
      <i className='fas fa-arrow-left mr-2' /> {formatMessage({ id: 'home' })}
    </Link>

    <h1 className='h3'>
      {isPrivate && <span className='mr-3'><i className='fas fa-user-lock' /></span>}
      {fullName}
      <a href={homeUrl} target='_blank' rel='noopener noreferrer' className='ml-3'>
        <i className='fas fa-external-link-alt fa-xs' />
      </a>
    </h1>

    <div className='bg-white py-4 px-3 mt-3'>
      <div className='d-flex justify-content-between'>
        <span className='hover-badge d-inline-block'>
          <i className='far fa-star' /> {buildReadableCount(starsCount)} {formatMessage({ id: 'stars' })}
        </span>

        {language &&
          <span className='hover-badge d-inline-block'>
            <i className='fas fa-code' /> {language}
          </span>}

        <span className='hover-badge d-inline-block'>
          <i className='fas fa-exclamation-circle' /> {buildReadableCount(openIssues)} {formatMessage({ id: 'issues' })}
        </span>

        <span className='hover-badge d-inline-block'>
          <i className='far fa-eye' /> {buildReadableCount(watchers)} {formatMessage({ id: 'watchers' })}
        </span>

        <span className='hover-badge d-inline-block'>
          <i className='fas fa-code-branch' /> {buildReadableCount(forks)} {formatMessage({ id: 'forks' })}
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

          <p>
            {formatMessage({ id: 'license' })}
            <a href={licenseUrl} className='ml-2'>
              <i className='fas fa-balance-scale mr-1' />
              {licenseName}
            </a>
          </p>

          <h5>
            {languages.map((lang) => (
              <span className='badge badge-info mr-2' key={lang}>{lang}</span>
            ))}
          </h5>
        </div>
      </div>

      <div>
        <h3 className='ml-3'>{formatMessage({ id: 'readme' })}</h3>

        <div className='jumbotron ml-3'>
          <ReactMarkdown source={readme} escapeHtml={false} />
        </div>
      </div>
    </div>
  </div>
)

RepositoryDetails.propTypes = {
  repository: PropTypes.shape({
    description: PropTypes.string,
    forks: PropTypes.number,
    full_name: PropTypes.string,
    language: PropTypes.string,
    license: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string
    }),
    open_issues: PropTypes.number,
    owner: PropTypes.shape({
      avatar_url: PropTypes.string,
      html_url: PropTypes.string,
      login: PropTypes.string
    }),
    private: PropTypes.bool,
    stargazers_count: PropTypes.number,
    updated_at: PropTypes.string,
    watchers: PropTypes.number
  }),
  readme: PropTypes.string,
  languages: PropTypes.array,
  formatMessage: PropTypes.func.isRequired
}

export default RepositoryDetails
