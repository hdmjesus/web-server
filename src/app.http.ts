import http2 from 'node:http2'
import fs from 'node:fs'
;(async () => {
  main()
})()

async function main () {
  const server = http2.createSecureServer(
    {
      key: fs.readFileSync('./keys/server.key'),
      cert: fs.readFileSync('./keys/server.crt')
    },
    (req, res) => {
      // res.writeHead(200, { 'Content-Type': 'text/html' })
      // res.write('<button>Click me</button>')
      // res.end()

      // const data = { name: 'John', age: 30, city: 'New York' }
      // res.writeHead(200, { 'Content-Type': 'application/json' })
      // res.write(JSON.stringify(data))
      // res.end()

      if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(htmlFile)
        return
      } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' })
      } else if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'aplication/javascript' })
      }

      const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8')

      res.end(responseContent)
    }
  )
  server.listen(4000, () => {
    console.log('Server running at http://localhost:8080/')
  })
}
