import { twitter } from 'server/helpers'

export default (req, res) => {

  twitter.getRequestToken()
    .catch(error => {
      console.error(`Error authenticating application with Twitter: ${error}`)
      res.send(500)
    })
    .then(data => {
      const { oauthToken, oauthTokenSecret } = data
      twitter.requestPairs[oauthToken] = oauthTokenSecret
      res.json({
        authorisationUrl: `https://api.twitter.com/oauth/authenticate?oauth_token=${oauthToken}`,
      })
    })

}
