import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import useQuery from '../../../hooks/useQuery'
import { getLanguagesFromUrl, getReadme, getRepository } from '../../../api'
import RepositoryDetails from '../components'
import ErrorCard from '../../ErrorCard'

const mapStateToProps = ({ repositories: { items } }) => ({ items })

export const RepositoryDetailsContainer = ({ items }) => {
  const [repository, setRepository] = useState()
  const [readme, setReadme] = useState('')
  const [languages, setLanguages] = useState([])
  const [error, setError] = useState(null)
  const query = useQuery()
  const repoName = query.get('name')

  useEffect(() => {
    let selectedRepository

    const getRepositoryAsync = async (name, selectedRepository) => {
      if (typeof selectedRepository === 'object') {
        setRepository(selectedRepository)
      }

      if (name) {
        const repo = await getRepository(name)

        if (repo.error) {
          return setError(repo.error)
        }

        setRepository(repo)
      }
    }

    if (items.length) {
      selectedRepository = items.find(item => item.full_name === repoName)
    }

    getRepositoryAsync(repoName, selectedRepository)
  }, [items])

  useEffect(() => {
    const getLanguagesAsync = async (url) => {
      let langsArray = []
      const langs = await getLanguagesFromUrl(url)

      if (langs) {
        langsArray = Object.keys(langs).sort((a, b) => {
          return langs[b] - langs[a]
        })
      }

      setLanguages(langsArray)
    }

    const getReadmeAsync = async (name) => {
      const readmeContent = await getReadme(name)
      setReadme(readmeContent)
    }

    if (repository) {
      const {
        languages_url: languagesUrl,
        full_name: fullName
      } = repository

      getLanguagesAsync(languagesUrl)
      getReadmeAsync(fullName)
    }
  }, [repository])

  if (error) {
    return <ErrorCard messageId='repositoryError' />
  }

  return (
    <RepositoryDetails
      repository={repository}
      readme={readme}
      languages={languages}
    />
  )
}

RepositoryDetailsContainer.propTypes = {
  items: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(RepositoryDetailsContainer)
