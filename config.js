const config = {
  client: {
    base: 'http://localhost',
    port: 3000,
  },
  server: {
    base: 'http://localhost',
    port: 3001,
  },
}

config.twitter = {
  consumerKey: 'ULAa86UdhrwgweVRa2fJ9RxqP',
  consumerSecret: 'C0TICMMkPoM0eqBgtHDLDPa6Sn4vs7OlK3mVl0e4MeseoQDXyx',
  callback: `${config.client.base}:${config.client.port}/auth-callback`,
}

export default config
