const express = require('express')
const ora = require('ora')
const Parser = require('./parser')
const mockRouter = require('./router/mock')
const app = express()

module.exports = (bridge) => {
  const spinner = ora('Starting mock server....').start()

  if (!bridge.isParsed) {
    bridge = Parser(bridge)
  }

  app.use(mockRouter(bridge))

  app.listen(bridge.mockPort, (err) => {
    if (err) {
      spinner.fail('Mock server is failed to startup. ')
      process.exit(1)
    }
    spinner.succeed(`Mock server is available at [ ${`http://${bridge.host + ':' + bridge.mockPort}`} ]`)
  })
}



