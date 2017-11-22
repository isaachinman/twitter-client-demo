/*

  Quick fork of https://github.com/reneraab/node-twitter-api
  Ripped a bunch of stuff out, swapped callbacks for promises,
  changed OO approach to "functional"

*/

import config from 'config'
import oauth from 'oauth'
import querystring from 'querystring'

const baseUrl = 'https://api.twitter.com/1.1/'

const twitterGenerator = (options) => {

  const oa = new oauth.OAuth(
    'https://twitter.com/oauth/request_token', 'https://twitter.com/oauth/access_token',
    options.consumerKey, options.consumerSecret, '1.0A', options.callback, 'HMAC-SHA1',
  )

  const getRequestToken = () =>
    new Promise((resolve, reject) => {
      oa.getOAuthRequestToken({ x_auth_access_type: options.x_auth_access_type }, (error, oauthToken, oauthTokenSecret, results) => {
        if (error) reject(error)
        resolve({ oauthToken, oauthTokenSecret, results })
      })
    })

  const getAccessToken = (requestToken, requestTokenSecret, oauth_verifier) =>
    new Promise((resolve, reject) => {
      oa.getOAuthAccessToken(requestToken, requestTokenSecret, oauth_verifier, (error, oauthAccessToken, oauthAccessTokenSecret, results) => {
        if (error) {
          reject(error)
        } else {
          resolve({ oauthAccessToken, oauthAccessTokenSecret, results })
        }
      })
    })

  // Timelines
  const getTimeline = (type, params, accessToken, accessTokenSecret) =>
    new Promise((resolve, reject) => {

      type = type.toLowerCase()

      let url
      switch (type) {
        case 'home_timeline':
        case 'home':
          url = 'home_timeline'
          break
        case 'mentions_timeline':
        case 'mentions':
          url = 'mentions_timeline'
          break
        case 'user_timeline':
        case 'user':
          url = 'user_timeline'
          break
        case 'retweets_of_me':
        case 'retweets':
          url = 'retweets_of_me'
          break
        default:
          reject(new Error('Please specify an existing type.'))
      }

      oa.get(baseUrl + 'statuses/' + url + '.json?' + querystring.stringify(params), accessToken, accessTokenSecret, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })

  // Tweets
  const statuses = (type, params, accessToken, accessTokenSecret) =>
    new Promise((resolve, reject) => {
      let url = type.toLowerCase()

      let method = 'GET'
      switch (type) {
        case 'retweets':
          url = 'retweets/' + params.id
          delete params.id
          break
        case 'show':
          url = 'show/' + params.id
          delete params.id
          break
        case 'lookup':
          url = 'lookup'
          method = 'POST'
          break
        case 'destroy':
          url = 'destroy/' + params.id
          delete params.id
          method = 'POST'
          break
        case 'update':
          method = 'POST'
          break
        case 'retweet':
          url = 'retweet/' + params.id
          delete params.id
          method = 'POST'
          break
        case 'unretweet':
          url = 'unretweet/' + params.id
          delete params.id
          method = 'POST'
          break
        case 'oembed':
          url = 'oembed'
          break
        case 'update_with_media':
          reject(new Error("'update_with_media' type has been removed. Use 'upload_media' instead"))
          break
        default:
          reject(new Error('Please specify an existing type.'))
      }

      if (method === 'GET') {
        oa.get(baseUrl + 'statuses/' + url + '.json?' + querystring.stringify(params), accessToken, accessTokenSecret, (error, data, response) => {
          if (error) {
            reject(error, data, response, baseUrl + 'statuses/' + url + '.json?' + querystring.stringify(params))
          } else {
            let parsedData
            try {
              parsedData = JSON.parse(data)
            } catch (e) {
              reject(e)
            }
            resolve({ parsedData, response })
          }
        })
      } else {
        oa.post(baseUrl + 'statuses/' + url + '.json', accessToken, accessTokenSecret, params, (error, data, response) => {
          if (error) {
            reject(error, data, response)
          } else {
            resolve(data)
          }
        })
      }
    })

  const users = (type, params, accessToken, accessTokenSecret) =>
    new Promise((resolve, reject) => {

      const url = type.toLowerCase()

      let method = 'GET' // show, search, contributees, contributors
      if (url === 'lookup') method = 'POST'


      if (method === 'GET') {
        oa.get(baseUrl + 'users/' + url + '.json?' + querystring.stringify(params), accessToken, accessTokenSecret, (error, data, response) => {
          if (error) {
            reject(error, data, response, baseUrl + 'users/' + url + '.json?' + querystring.stringify(params))
          } else {
            let parsedData = null
            try {
              parsedData = JSON.parse(data)
            } catch (e) {
              reject(e, data, response)
            }
            resolve({ parsedData, response })
          }
        })
      } else {
        oa.post(baseUrl + 'users/' + url + '.json', accessToken, accessTokenSecret, params, (error, data, response) => {
          if (error) {
            reject(error, data, response)
          } else {
            let parsedData = null
            try {
              parsedData = JSON.parse(data)
            } catch (e) {
              reject(e, data, response)
            }
            resolve({ parsedData, response })
          }
        })
      }
    })

  return {
    consumerKey: options.consumerKey,
    consumerSecret: options.consumerSecret,
    callback: options.callback,
    x_auth_access_type: options.x_auth_access_type,
    oa,
    getRequestToken,
    getAccessToken,
    getTimeline,
    statuses,
    users,
  }
}

const { consumerKey, consumerSecret, callback } = config.twitter

const twitter = twitterGenerator({
  consumerKey,
  consumerSecret,
  callback,
})

// Create objects in which to store user auth key pairs
twitter.requestPairs = {}
twitter.accessPairs = {}

export default twitter
