import request from 'supertest'
import api from 'server/api'

describe('Test oauth_request endpoint', () => {
  test('It should be listening', () => {
    return request(api).get('/oauth_request').then(response => {
      expect(response.statusCode).toBe(200)
    })
  })
  test('It should return a Twitter URL', () => {
    return request(api).get('/oauth_request').then(response => {
      expect(response.body.authorisationUrl).toMatch(/api.twitter.com/)
    })
  })
})
