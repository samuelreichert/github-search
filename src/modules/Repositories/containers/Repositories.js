import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useIntl } from 'react-intl'
// import useQuery from '../../../hooks/useQuery'
// import { postUserCode } from '../../../api'

import Repositories from '../components'
import Loading from '../components/Loading'

const mapStateToProps = ({ repositories: { items, totalCount, loading, responseTime } }) => ({
  items,
  loading,
  totalCount,
  responseTime
})

const RepositoriesContainer = ({ items, loading, totalCount, responseTime }) => {
  const { formatMessage } = useIntl()
  // const query = useQuery()

  // const sendUserCode = async (code) => {
  //   const data = await postUserCode(code)
  //   console.log(data)
  // }

  // useEffect(() => {
  //   const code = query.get('code')

  //   if (code) sendUserCode(code)
  // })

  if (loading) return <Loading formatMessage={formatMessage} />

  return <Repositories items={items} totalCount={totalCount} formatMessage={formatMessage} responseTime={responseTime} />
}

RepositoriesContainer.propTypes = {
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  totalCount: PropTypes.number.isRequired,
  responseTime: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(RepositoriesContainer)
