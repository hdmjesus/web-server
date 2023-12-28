import express, { Router } from 'express'
import path from 'node:path'

interface IOptions {
  port?: number
  routes: Router
  pathPublic?: string
}
export class Server {
  private app = express()
  private readonly routes: Router
  private readonly port: number
  private readonly pathPublic: string

  constructor (private readonly options: IOptions) {
    const { port, routes, pathPublic } = options || {}
    this.port = port!
    this.routes = routes!
    this.pathPublic = pathPublic!
  }

  async start (): Promise<void> {
    //middlewares
    this.app.use(express.json())
    this.app.use(express.static(this.pathPublic))
    this.app.use(this.routes)

    //* Routes

    //* SPA
    this.app.get('*', (req, res) => {
      console.log(req.url)

      const indexPath = path.join(__dirname, '..', '..', 'public', 'index.html')

      res.sendFile(indexPath)
    })

    const port = this.port || 3000
    this.app.listen(port, () =>
      console.log(`Server running at http://localhost:${port}`)
    )
  }
}
