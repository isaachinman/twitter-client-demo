import { twitter } from 'server/helpers'

export default (req, res) => {

  const oauth_token = req.body.oauth_token || null
  const oauth_verifier = req.body.oauth_verifier || null

  // Send 400 if token or verifier are not present
  if (!oauth_token || !oauth_verifier) {
    res.sendStatus(400)
  }

  twitter.getAccessToken(oauth_token, twitter.requestPairs[oauth_token], oauth_verifier)
    .then(data => {

      const { oauthAccessToken, oauthAccessTokenSecret, results } = data

      // Set access pair for continued use
      twitter.accessPairs[oauthAccessToken] = oauthAccessTokenSecret

      // User ID
      const userID = results.user_id

      // Get user profile data
      twitter.users('lookup', { user_id: userID }, oauthAccessToken, oauthAccessTokenSecret)
        .catch(() => res.sendStatus(500))
        .then(userData => {
          res.json({
            userData: userData.parsedData[0],
            oauthAccessToken,
          })
        })

    })
    .catch(err => res.sendStatus(err.statusCode))
}
