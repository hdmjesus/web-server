import express from 'express'
import path from 'node:path'

interface IOptions {
  port?: number
  pathPublic?: string
}
export class Server {
  private app = express()
  private readonly port: number
  private readonly pathPublic: string
  constructor (private readonly options: IOptions) {
    const { port, pathPublic } = options || {}
    this.port = port!
    this.pathPublic = pathPublic!
  }

  async start (): Promise<void> {
    //middlewares

    this.app.use(express.static(this.pathPublic))

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
