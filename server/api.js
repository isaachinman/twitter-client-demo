/* ---------- Server entry point ---------- */

// Deps
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

// Import endpoints
import { connect, disconnect, new_tweet, oauth_request, tweets } from 'server/endpoints'

// Instantiate our API server
const app = express()

// CORS and JSON parsing
app.use(bodyParser.json())
app.use(cors())

// Set up endpoints
app.post('/connect', connect)
app.post('/disconnect', disconnect)
app.post('/new-tweet', new_tweet)
app.get('/oauth_request', oauth_request)
app.get('/tweets', tweets)

export default app
