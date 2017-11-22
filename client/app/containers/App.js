import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import styles from 'client/app/styles'
import { history } from '../store/configureStore'


// Components
import { Authorising, Header, LoggedIn, LoggedOut } from '../components'

export default class App extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <div style={styles.app}>
          <Header />
          <main>
            <Route path='/' exact component={LoggedOut} />
            <Route path='/auth-callback' component={Authorising} />
            <Route path='/home' component={LoggedIn} />
          </main>
        </div>
      </ConnectedRouter>
    )
  }
}
