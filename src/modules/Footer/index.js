import React from 'react'
import { useIntl } from 'react-intl'

const authLink = `${process.env.REACT_APP_AUTH_URL}/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`

const Footer = () => {
  const { formatMessage } = useIntl()

  return (
    <footer className='footer mt-auto py-3 bg-primary'>
      <div className='container text-center'>
        <p className='text-white mb-0'>
          {formatMessage({ id: 'footerText' })}
          <a href={authLink}> {formatMessage({ id: 'githubLogin' })}</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
