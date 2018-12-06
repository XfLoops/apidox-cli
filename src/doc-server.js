const path = require('path')
const express = require('express')
const ora = require('ora')
const favicon = require('serve-favicon')
const Parser = require('./parser')
const docRouter = require('./router/doc')
const app = express()

module.exports = (bridge) => {
  const spinner = ora('Starting doc server....').start()

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
      spinner.fail('Document server is failed to startup.')
      process.exit(1)
    }
    spinner.succeed(`API Document is available at [ ${`http://${bridge.host + ':' + bridge.docPort}`} ]`)
  })
}

