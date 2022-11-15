import {
  Server as HyperspaceServer
} from 'hyperspace'
//import Hyperdrive from 'hyperdrive'

async function main () {
  // Setup the Hyperspace Daemon connection
  // 
  let server: any
  try {
    server = new HyperspaceServer({
      host: 'localhost'
    })
    await server.ready()
    if (server._networkOpts){
      let _networkOpts = server._networkOpts
      console.log(`Server Started on localhost with ${_networkOpts.preferredPort}`)
    }
  }catch(e) {
    console.log(e)
  }

}

async function setupHyperspace () {
  let client: any
  let server: any
  
  try {
    server = new HyperspaceServer({
      host: 'localhost'
    })
    await server.ready()
    console.log(server)
  } catch (e) {
    // no daemon, start it in-process
    // server = new HyperspaceServer()
    // await server.ready()
    // client = new HyperspaceClient()
    // await client.ready()
    console.log('Some error',e)
  }
  
  return {
    client,
    async cleanup () {
      await client.close()
      if (server) {
        console.log('Shutting down Hyperspace, this may take a few seconds...')
        await server.stop()
      }
    }
  }
}

main()
