import { envs } from './config/envs'
import { AppRoutes } from './presentation/routers'
import { Server } from './presentation/server'
;(async () => {
  main()
})()

async function main () {
  const server = new Server({
    port: envs.PORT,
    pathPublic: envs.PUBLIC_PATH,
    routes: AppRoutes.routes
  })
  server.start()
}
