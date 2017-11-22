import { twitter } from 'server/helpers'

export default (req, res) => {

  const accessToken = req.query.accessToken || null
  const userID = req.query.user_id || null

  // Send 400 if accessToken or userID is not present
  if (!accessToken || !userID) {
    res.sendStatus(400)
  }

  twitter.getTimeline('user_timeline', {}, accessToken, twitter.accessPairs[accessToken])
    .then(tweets => {
      res.json({
        tweets,
      })
    })
    .catch(error => res.sendStatus(error.statusCode))

}
