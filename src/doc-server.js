const path = require('path')
const express = require('express')
const chalk = require('chalk')
const favicon = require('serve-favicon')
const Parser = require('./parser')
const docRouter = require('./router/doc')
const app = express()

module.exports = (bridge) => {
  bridge = Parser(bridge)

  // favicon
  app.use(favicon(path.join(__dirname, '../public/favicon.ico')))
  // static assets
  app.use('/assets', express.static(path.join(__dirname, '../public/style')))
  // api routes
  app.use(docRouter(bridge))
  
  app.set('view engine', 'pug')
  app.set('views', path.join(__dirname, '../public'))

  app.listen(bridge.docPort, (err) => {
    if (err) {
      console.log(chalk.red('Document server is failed to startup. ') + err)
      process.exit(1)
    }
    console.log(chalk.magenta(`API Document is hosted at [ ${`http://${bridge.host + ':' + bridge.docPort}`} ]`))
  })
}

