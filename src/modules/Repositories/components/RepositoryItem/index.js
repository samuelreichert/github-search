import React from 'react'
import PropTypes from 'prop-types'

const buildReadableDate = (date) => {
  const localDate = new Date(date)

  return localDate.toLocaleString(navigator.language)
}

const buildReadableCount = (count) => {
  if (count <= 1000) return count

  return `${(count / 1000).toFixed(1)}k`
}

const RepositoryItem = ({ item }) => {
  const {
    description,
    forks,
    full_name: fullName,
    language,
    // license,
    open_issues: openIssues,
    // owner,
    private: isPrivate,
    stargazers_count: starsCount,
    updated_at: updatedAt,
    url,
    watchers
  } = item

  console.log(item)

  return (
    <a href={url} className='list-group-item list-group-item-action flex-column align-items-start'>
      <div className='d-flex w-100 justify-content-between'>
        <h5 className='mb-1'>
          {isPrivate && <span className='mr-3'><i className='fas fa-user-lock' /></span>}
          {fullName}
        </h5>
        <small>Updated {buildReadableDate(updatedAt)}</small>
      </div>
      <p className='mb-1'>{description}</p>
      <small>
        <span className='mr-3'><i className='far fa-star' /> {buildReadableCount(starsCount)}</span>
        {language && <span className='mr-3'><i className='fas fa-code' /> {language}</span>}
        <span className='mr-3'><i className='fas fa-exclamation-circle' /> {buildReadableCount(openIssues)}</span>
        <span className='mr-3'><i className='far fa-eye' /> {buildReadableCount(watchers)}</span>
        <span className='mr-3'><i className='fas fa-code-branch' /> {buildReadableCount(forks)}</span>

      </small>
    </a>
  )
}

RepositoryItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default RepositoryItem
