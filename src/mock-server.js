const chalk = require('chalk')
const express = require('express')
const Parser = require('./parser')
const mockRouter = require('./router/mock')
const app = express()

module.exports = (bridge) => {
  if (!bridge.isParsed) {
    bridge = Parser(bridge)
  }

  app.use(mockRouter(bridge))

  app.listen(bridge.mockPort, (err) => {
    if (err) {
      console.log(chalk.red('Mock server is failed to startup. ') + err)
      process.exit(1)
    }
    console.log(chalk.magenta(`Mock server is available at [ ${`http://${bridge.host + ':' + bridge.mockPort}`} ]`))
  })
}



