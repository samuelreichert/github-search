import React from 'react'
import { useIntl } from 'react-intl'

const Footer = () => {
  const { formatMessage } = useIntl()
  const url = 'https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line'

  return (
    <footer className='footer mt-auto py-3 bg-primary'>
      <div className='container text-center'>
        <p className='text-white mb-0'>
          {formatMessage({ id: 'footerText' })}
        </p>
        <p className='text-white mt-1'>
          {`${formatMessage({ id: 'footerText2' })} `}
          <a href={url} target='_blank' rel='noopener noreferrer'>
            {formatMessage({ id: 'footerLink' })}
          </a>.
          {` ${formatMessage({ id: 'footerText3' })}`}
        </p>
      </div>
    </footer>
  )
}

export default Footer
