import { twitter } from 'server/helpers'

export default (req, res) => {

  const accessToken = req.body.oauthAccessToken || null
  const tweet = req.body.tweet || null

  // Send 400 if any of the three fields aren't present
  if (!accessToken || !tweet) {
    res.sendStatus(400)
  }

  twitter.statuses('update', { status: tweet }, accessToken, twitter.accessPairs[accessToken])
    .then(success => {
      res.json({
        success,
      })
    })
    .catch(error => res.sendStatus(error.statusCode))

}
