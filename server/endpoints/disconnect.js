import { twitter } from 'server/helpers'

export default (req, res) => {

  const accessToken = req.body.accessToken || null

  // Send 400 if accessToken is not present
  if (!accessToken) {
    res.sendStatus(400)
  }

  try {

    // Remove pair from in-memory "cache"
    delete twitter.accessPairs[accessToken]
    res.sendStatus(200)

  } catch (error) {
    res.sendStatus(500)
  }

}
