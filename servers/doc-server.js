const path = require('path')
const express = require('express')
const chalk = require('chalk')
const utils = require('./utils')
const app = express()

module.exports = (bridge) => {
  bridge = utils.parseFiles(bridge)
  
  let docRouter = utils.docRouter(bridge)
  
  app.locals.minus = function (a ,b) {
    return a - b
  }

  app.use(docRouter)
  app.set('view engine', 'pug')
  app.set('views', path.join(__dirname, './views'))

  app.listen(bridge.docPort, (err) => {
    if (err) {
      console.log(chalk.red('Document server is failed to startup. ') + err)
      process.exit(1)
    }
    console.log(chalk.magenta(`API Document is available at [ ${`http://${bridge.host + ':' + bridge.docPort}`} ]`))
  })
}

