import React from 'react'

import ReactDOM from 'react-dom'

import App from './App'
import './index.css'
import {Provider} from './context/context'
import {SpeechProvider} from '@speechly/react-client'

ReactDOM.render(
  <SpeechProvider appId="ae62fcff-7584-4fd5-96ad-48fff6a0d76e" language = "en-US">
<Provider>
  <App />
</Provider>
</SpeechProvider>
,
 document.getElementById('root'))