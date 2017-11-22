import React, { Component } from 'react'
import styles from 'client/app/styles'
import { postTweet } from '../actions/twitter'

export default class NewTweet extends Component {

  state = {
    modalOpen: false,
    tweet: null,
  }

  handleModalToggle = () => this.setState({ modalOpen: !this.state.modalOpen })
  handleTweetChange = e => this.setState({ tweet: e.target.value })

  handlePostTweet = () => {
    const { dispatch } = this.props
    const { tweet } = this.state

    if (tweet.length > 0) {
      dispatch(postTweet(tweet))
      this.setState({
        modalOpen: false,
        tweet: null,
      })
    }

  }

  render() {
    const { modalOpen, tweet } = this.state
    return (
      <div>
        <div style={styles.newTweetBtn} onClick={this.handleModalToggle}>+</div>
        {modalOpen &&
          <div style={styles.overlay}>
            <div style={styles.closeOverlayBtn} onClick={this.handleModalToggle}>×</div>
            <div style={styles.newTweetTitle}>New Tweet</div>
            <div>
              <input
                style={styles.newTweetInput}
                onChange={this.handleTweetChange}
                type='text'
                maxLength={140}
                value={tweet}
              />
              <button
                style={styles.tweetItBtn}
                onClick={this.handlePostTweet}
              >
                Tweet it
              </button>
            </div>
          </div>
        }
      </div>
    )
  }
}

