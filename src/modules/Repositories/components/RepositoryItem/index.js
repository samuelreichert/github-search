import React from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import buildReadableCount from '../../../../common/buildReadableCount'

const buildReadableDate = (date) => {
  const localDate = new Date(date)

  return localDate.toLocaleString(navigator.language)
}

const RepositoryItem = ({ item }) => {
  const { formatMessage } = useIntl()
  const {
    description,
    forks,
    full_name: fullName,
    language,
    open_issues: openIssues,
    private: isPrivate,
    stargazers_count: starsCount,
    updated_at: updatedAt,
    watchers
  } = item

  return (
    <Link to={`/repository?name=${fullName}`} className='list-group-item list-group-item-action flex-column align-items-start'>
      <div className='d-flex w-100 justify-content-between flex-column flex-sm-row'>
        <h5 className='mb-1'>
          {isPrivate && <span className='mr-3'><i className='fas fa-user-lock' /></span>}
          {fullName}
        </h5>

        <small>{formatMessage({ id: 'updatedAt' }, { date: buildReadableDate(updatedAt) })}</small>
      </div>

      <p className='mb-1'>{description}</p>

      <small>
        <span className='mr-3 d-inline-block'><i className='far fa-star mr-1' /> {buildReadableCount(starsCount)}</span>
        {language && <span className='mr-3 d-inline-block'><i className='fas fa-code mr-1' /> {language}</span>}
        <span className='mr-3 d-inline-block'><i className='fas fa-exclamation-circle mr-1' /> {buildReadableCount(openIssues)}</span>
        <span className='mr-3 d-inline-block'><i className='far fa-eye mr-1' /> {buildReadableCount(watchers)}</span>
        <span className='mr-3 d-inline-block'><i className='fas fa-code-branch mr-1' /> {buildReadableCount(forks)}</span>
      </small>
    </Link>
  )
}

RepositoryItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default RepositoryItem
