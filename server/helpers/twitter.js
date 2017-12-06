import config from 'config'
import twitterGenerator from 'node-twitter-api-promisified'

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
