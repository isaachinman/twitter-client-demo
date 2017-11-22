import React from 'react'
import styles from 'client/app/styles'

export default function TweetList(props) {
  const tweetList = props.tweets.map(tweet => {
    const createdDate = new Date(tweet.created_at)
    return (
      <div style={styles.tweet} key={tweet.id}>
        <div style={styles.tweetText}>{tweet.text}</div>
        <small style={styles.tweetTimestamp}>
          {`${createdDate.getDate()}-${createdDate.getMonth() + 1}-${createdDate.getFullYear()}`}
        </small>
      </div>
    )
  })
  return (
    <div style={styles.tweetList}>
      {props.tweets.length > 0 ?
        <span>{tweetList}</span>
        :
        <span style={styles.tweetText}>Your tweets will be displayed here.</span>
      }
    </div>
  )
}
