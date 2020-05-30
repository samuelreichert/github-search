import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import locales from './locales'
import store from './store'

import App from './screens/Root'
import * as serviceWorker from './serviceWorker'

const languages = ['en', 'pt', 'nl']
let language = navigator.language.split(/[-_]/)[0]
if (!languages.includes(language)) language = 'en'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider locale={language} messages={locales[language]}>
        <App />
      </IntlProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
