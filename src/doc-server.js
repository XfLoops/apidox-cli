const path = require('path')
const express = require('express')
const chalk = require('chalk')
const parseFiles = require('./utils/parse-files')
const docRouter = require('./utils/doc-router')
const app = express()

module.exports = (bridge) => {
  bridge = parseFiles(bridge)
  
  app.use(docRouter(bridge))
  app.set('view engine', 'pug')
  app.set('views', path.join(__dirname, '../templates'))
  app.use('/assets', express.static(path.join(__dirname, '../templates/style')))

  app.listen(bridge.docPort, (err) => {
    if (err) {
      console.log(chalk.red('Document server is failed to startup. ') + err)
      process.exit(1)
    }
    console.log(chalk.magenta(`API Document is available at [ ${`http://${bridge.host + ':' + bridge.docPort}`} ]`))
  })
}

