import axios from 'axios'

const BASE_URL = `${process.env.REACT_APP_GITHUB_URL}/search/repositories`

// ?q=react&per_page=10&page=1
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
