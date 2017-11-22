/* ---------- Client entry point ---------- */

// Deps
import config from 'config'
import express from 'express'

// Instantiate our HTML server
const app = express()

const routes = ['/', '/auth-callback', '/home']

routes.map(route => {
  app.get(route, (req, res) => {
    res.sendFile('client/index.html', { root: '.' })
  })
})

app.use(express.static('client/dist/'))

// Start listening
app.listen(config.client.port, () => {
  console.log(`Client is listening on port ${config.client.port}.`)
})
