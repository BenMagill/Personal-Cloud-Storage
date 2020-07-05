const http = require("http")
const app = require("./server/app")
const dotenv = require('dotenv')

dotenv.config()
const server = http.createServer(app)
const port = process.env.PORT || 3030

server.listen(port)
console.log(`Running server on ${port}`)