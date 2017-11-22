import React, { Component } from 'react'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux'
import { configureStore } from '../store/configureStore'
import App from './App'

const { persistor, store } = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    )
  }
}
