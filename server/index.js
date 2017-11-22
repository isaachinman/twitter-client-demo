import api from 'server/api'
import config from 'config'

// Start listening
api.listen(config.server.port, () => {
  console.log(`API is listening on port ${config.server.port}.`)
})
