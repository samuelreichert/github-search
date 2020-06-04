import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_GITHUB_URL}/search/repositories`
const username = process.env.REACT_APP_GITHUB_USERNAME
const token = process.env.REACT_APP_GITHUB_TOKEN
let userToken = ''
let headers = {}

if (username && token) {
  userToken = username + ':' + token
  headers = { Authorization: `Basic ${window.btoa(unescape(encodeURIComponent(userToken)))}` }
}

export const searchRepositories = async ({ search, page = 1, perPage = 10 } = {}) => {
  try {
    const params = { q: search, page, per_page: perPage }
    const options = { params }

    if (userToken) options.headers = headers

    const { data } = await axios.get(BASE_URL, options)
    return data
  } catch (error) {
    console.error('Error trying to search repositories from GitHub', error)
  }
}

export const getRepository = async (name) => {
  try {
    const params = { q: `repo:${name}` }
    const options = { params }

    if (userToken) options.headers = headers

    const { data: { items } } = await axios.get(BASE_URL, options)

    return items[0]
  } catch (error) {
    console.error('Error trying to search a specific repository from GitHub', error)
  }
}

export const getReadme = async (name) => {
  try {
    const options = userToken ? { headers } : {}
    const { data: { content } } = await axios.get(`${process.env.REACT_APP_GITHUB_URL}/repos/${name}/readme`, options)
    const decodedReadme = window.atob(content)

    return decodedReadme
  } catch (error) {
    console.error('Error trying to find a readme from GitHub', error)
  }
}

export const getLanguagesFromUrl = async (url) => {
  try {
    const options = userToken ? { headers } : {}
    return (await axios.get(url, options)).data
  } catch (error) {
    console.error('Error trying to get languages from a repository from GitHub', error)
  }
}
