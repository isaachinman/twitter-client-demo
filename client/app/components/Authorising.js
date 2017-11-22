import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserData, setOauthVerifier, setRequestToken } from '../actions/twitter'

class Authorising extends Component {
  componentDidMount = () => {

    const { dispatch, location } = this.props
    const params = new URLSearchParams(location.search)

    if (params.has('oauth_token') && params.has('oauth_verifier')) {

      const requestToken = params.get('oauth_token')
      const oauthVerifier = params.get('oauth_verifier')

      dispatch(setRequestToken(requestToken))
      dispatch(setOauthVerifier(oauthVerifier))
      dispatch(fetchUserData())

    }

  }
  render() {
    return (
      <div>
        Authorising...
      </div>
    )
  }
}

export default connect(state => ({
  twitter: state.twitter,
}))(Authorising)
