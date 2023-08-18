/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const jsonServer = require('json-server')
const path = require('path')

var https = require('https')
var http = require('http')

var options = {
  key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
}
const server = jsonServer.create()

const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

// small artificial delay so requests aren't instant — mimics a real API
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800)
  })
  next()
})

// login endpoint
server.post('/login', (req, res) => {
  try {
    const { username, password } = req.body
    const db = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8')
    )
    const { users = [] } = db

    const userFromBd = users.find(
      (user) => user.username === username && user.password === password
    )

    if (userFromBd) {
      // never send the stored password back to the client
      const { password: _password, ...safeUser } = userFromBd
      return res.json(safeUser)
    }

    return res.status(403).json({ message: 'User not found' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
})

// auth guard: reads (GET) are open so guests can browse articles; any mutation
// (POST/PUT/PATCH/DELETE) still requires an Authorization header
// eslint-disable-next-line
server.use((req, res, next) => {
  if (req.method !== 'GET' && !req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' })
  }

  next()
})

server.use(router)
const PORT = 8443
// 8003 instead of the common 8000, which is often taken by other local apps
const HTTP_PORT = 8003
const httpsServer = https.createServer(options, server)
const httpServer = http.createServer(server)
// start the servers (HTTPS + HTTP)
httpsServer.listen(PORT, () => {
  console.log(`server is running on ${PORT} port`)
})
httpServer.listen(HTTP_PORT, () => {
  console.log(`server is running on ${HTTP_PORT} port`)
})
