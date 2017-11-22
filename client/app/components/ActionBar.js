import React from 'react'
import styles from 'client/app/styles'
import { fetchTweets, logout } from 'client/app/actions/twitter'

export default function ActionBar(props) {
  return (
    <div style={styles.actionBar}>
      <button
        style={styles.refreshTweetsButton}
        onClick={() => props.dispatch(fetchTweets())}
      >
        Refresh Tweets
      </button>
      <button
        style={styles.logoutButton}
        onClick={() => props.dispatch(logout())}
      >
        Logout
      </button>
    </div>
  )
}
