import config from 'config'
import request from 'request-promise-native'
import { push } from 'react-router-redux'
import { persistor } from '../store/configureStore'

// Get authorisation url
export const FETCH_AUTHORISATION_URL_START = 'twitterclient/FETCH_AUTHORISATION_URL_START'
export const FETCH_AUTHORISATION_URL_SUCCESS = 'twitterclient/FETCH_AUTHORISATION_URL_SUCCESS'
export const FETCH_AUTHORISATION_URL_FAIL = 'twitterclient/FETCH_AUTHORISATION_URL_FAIL'

// Setters
export const SET_REQUEST_TOKEN = 'twitterclient/SET_REQUEST_TOKEN'
export const SET_OAUTH_VERIFIER = 'twitterclient/SET_OAUTH_VERIFIER'
export const SET_OAUTH_ACCESS_TOKEN = 'twitterclient/SET_OAUTH_ACCESS_TOKEN'

// Fetch user data
export const FETCH_USER_DATA_START = 'twitterclient/FETCH_USER_DATA_START'
export const FETCH_USER_DATA_SUCCESS = 'twitterclient/FETCH_USER_DATA_SUCCESS'
export const FETCH_USER_DATA_FAIL = 'twitterclient/FETCH_USER_DATA_FAIL'

// Fetch tweets
export const FETCH_TWEETS_START = 'twitterclient/FETCH_TWEETS_START'
export const FETCH_TWEETS_SUCCESS = 'twitterclient/FETCH_TWEETS_SUCCESS'
export const FETCH_TWEETS_FAIL = 'twitterclient/FETCH_TWEETS_FAIL'

// Post tweet
export const POST_TWEET_START = 'twitterclient/POST_TWEET_START'
export const POST_TWEET_SUCCESS = 'twitterclient/POST_TWEET_SUCCESS'
export const POST_TWEET_FAIL = 'twitterclient/POST_TWEET_FAIL'

// Logout
export const LOGOUT_START = 'twitterclient/LOGOUT_START'
export const LOGOUT_SUCCESS = 'twitterclient/LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'twitterclient/LOGOUT_FAIL'

export const fetchAuthorisationUrl = () =>
  async dispatch => {

    // First, dispatch start event
    dispatch({ type: FETCH_AUTHORISATION_URL_START })

    request({ url: `${config.server.base}:${config.server.port}/oauth_request`, json: true })
      .catch(error => dispatch({ type: FETCH_AUTHORISATION_URL_FAIL, error }))
      .then(data => {
        if (data.authorisationUrl) {
          dispatch({
            type: FETCH_AUTHORISATION_URL_SUCCESS,
            authorisationUrl: data.authorisationUrl,
          })
          window.location = data.authorisationUrl
        }
      })
  }

export const setRequestToken = requestToken => ({
  type: SET_REQUEST_TOKEN,
  requestToken,
})

export const setOauthVerifier = oauthVerifier => ({
  type: SET_OAUTH_VERIFIER,
  oauthVerifier,
})

export const fetchUserData = () =>
  async (dispatch, getState) => {

    dispatch({ type: FETCH_USER_DATA_START })
    const { requestToken, oauthVerifier } = getState().twitter

    request({
      url: `${config.server.base}:${config.server.port}/connect`,
      method: 'POST',
      json: true,
      body: {
        oauth_token: requestToken,
        oauth_verifier: oauthVerifier,
      },
    })
      .then(data => {
        dispatch({ type: SET_OAUTH_ACCESS_TOKEN, oauthAccessToken: data.oauthAccessToken })
        dispatch({ type: FETCH_USER_DATA_SUCCESS, userData: data.userData })
        dispatch(push('/home'))
      })
      .catch(data => {
        dispatch({ type: FETCH_USER_DATA_FAIL, error: data.error })
        dispatch(push('/'))
      })
  }

export const fetchTweets = () =>
  async (dispatch, getState) => {

    dispatch({ type: FETCH_TWEETS_START })
    const { oauthAccessToken, userData } = getState().twitter

    request({
      url: `${config.server.base}:${config.server.port}/tweets?user_id=${userData.id}&accessToken=${oauthAccessToken}`,
      json: true,
    })
      .then(data => {
        dispatch({ type: FETCH_TWEETS_SUCCESS, tweets: JSON.parse(data.tweets) })
      })
      .catch(error => {
        dispatch({ type: FETCH_TWEETS_FAIL, error })
        dispatch(logout())
      })
  }

export const postTweet = tweet =>
  async (dispatch, getState) => {

    dispatch({ type: POST_TWEET_START })
    const { oauthAccessToken } = getState().twitter

    request({
      url: `${config.server.base}:${config.server.port}/new-tweet`,
      method: 'POST',
      json: true,
      body: {
        oauthAccessToken,
        tweet,
      },
    })
      .then(() => {
        dispatch({ type: POST_TWEET_SUCCESS })
        dispatch(fetchTweets())
      })
      .catch(error => {
        dispatch({ type: POST_TWEET_FAIL, error })
        dispatch(logout())
      })
  }

export const logout = () =>
  async (dispatch, getState) => {

    dispatch({ type: LOGOUT_START })

    request({
      url: `${config.server.base}:${config.server.port}/disconnect`,
      method: 'POST',
      json: true,
      body: {
        accessToken: getState().twitter.oauthAccessToken,
      },
    })
      .then(() => {

        dispatch({ type: LOGOUT_SUCCESS })

        // Purge localStorage and return to root url
        dispatch(push('/'))
        persistor.purge()

      })
      .catch(() => dispatch({ type: LOGOUT_FAIL }))

  }
