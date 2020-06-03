import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_GITHUB_URL}/search/repositories`

export const searchRepositories = async ({ search, page = 1, perPage = 10 } = {}) => {
  try {
    const params = {
      q: search,
      page,
      per_page: perPage
    }

    const { data } = await axios.get(BASE_URL, { params })
    return data
  } catch (error) {
    console.error('Error trying to search repositories from GitHub', error)
  }
}

export const getRepository = async (name) => {
  try {
    const params = { q: `repo:${name}` }
    const { data: { items } } = await axios.get(BASE_URL, { params })

    return items[0]
  } catch (error) {
    console.error('Error trying to search a specific repository from GitHub', error)
  }
}

export const getReadme = async (name) => {
  try {
    const { data: { content } } = await axios.get(`${process.env.REACT_APP_GITHUB_URL}/repos/${name}/readme`)
    const decodedReadme = window.atob(content)

    return decodedReadme
  } catch (error) {
    console.error('Error trying to find a readme from GitHub', error)
  }
}

export const getLanguagesFromUrl = async (url) => {
  try {
    return (await axios.get(url)).data
  } catch (error) {
    console.error('Error trying to get languages from a repository from GitHub', error)
  }
}

export const postUserCode = async (code) => {
  const AUTH_URL = `${process.env.REACT_APP_AUTH_URL}/access_token`

  try {
    const params = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      code: code,
      redirect_uri: 'http://localhost:3000/'
    }

    const teste = await axios.post(AUTH_URL, params)
    console.log(teste)
    return teste
  } catch (error) {
    console.error('Error trying to search repositories from GitHub', error)
  }
}
