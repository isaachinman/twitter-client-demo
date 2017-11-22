import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from 'client/app/styles'
import { fetchAuthorisationUrl } from '../actions/twitter'

class LoggedOut extends Component {
  handleLoginWithTwitter = () => {
    const { dispatch } = this.props
    dispatch(fetchAuthorisationUrl())
  }
  render() {
    return (
      <div>
        Click anywhere to login with Twitter.
        <a
          onClick={this.handleLoginWithTwitter}
          onKeyDown={this.handleLoginWithTwitter}
          style={styles.overlayLink}
        >
          Login with Twitter
        </a>
      </div>
    )
  }
}

export default connect(state => ({
  twitter: state.twitter,
}))(LoggedOut)

