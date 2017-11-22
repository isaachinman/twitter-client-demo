import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import styles from 'client/app/styles'
import { ActionBar, NewTweet, TweetList, UserBar } from 'client/app/components'

class LoggedIn extends Component {

  componentWillMount = () => {
    const { dispatch, twitter } = this.props
    if (!twitter.oauthAccessToken) {
      dispatch(push('/'))
    }
  }

  render() {
    const { dispatch, twitter } = this.props
    const { userData, tweets } = twitter
    return (
      <div style={styles.relative}>
        <UserBar userData={userData} />
        <TweetList tweets={tweets} />
        <NewTweet dispatch={dispatch} />
        <ActionBar dispatch={dispatch} />
        <div style={styles.hello}>
          Hello {userData.name}.
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  twitter: state.twitter,
}))(LoggedIn)
