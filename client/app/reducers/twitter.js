import {
  FETCH_AUTHORISATION_URL_SUCCESS,
  SET_REQUEST_TOKEN,
  SET_OAUTH_VERIFIER,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAIL,
  LOGOUT_SUCCESS,
  SET_OAUTH_ACCESS_TOKEN,
  FETCH_TWEETS_SUCCESS,
} from '../actions/twitter'

const initialState = {
  authorisationUrl: null,
  requestToken: null,
  oauthVerifier: null,
  oauthAccessToken: null,
  userData: {},
  tweets: [],
  error: null,
  errorMessage: null,
}

export default function twitter(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case FETCH_AUTHORISATION_URL_SUCCESS:
      return Object.assign({}, state, {
        authorisationUrl: action.authorisationUrl,
      })
    case SET_REQUEST_TOKEN:
      return Object.assign({}, state, {
        requestToken: action.requestToken,
      })
    case SET_OAUTH_VERIFIER:
      return Object.assign({}, state, {
        oauthVerifier: action.oauthVerifier,
      })
    case SET_OAUTH_ACCESS_TOKEN:
      return Object.assign({}, state, {
        oauthAccessToken: action.oauthAccessToken,
      })
    case FETCH_USER_DATA_SUCCESS:
      return Object.assign({}, state, {
        userData: action.userData,
      })
    case FETCH_USER_DATA_FAIL:
      return Object.assign({}, state, {
        error: true,
        errorMessage: action.error,
      })
    case FETCH_TWEETS_SUCCESS:
      return Object.assign({}, state, {
        tweets: action.tweets,
      })
    case LOGOUT_SUCCESS:
      return initialState
    default:
      return state
  }
}
