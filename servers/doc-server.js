const express = require('express')
const chalk = require('chalk')
const utils = require('./utils')
const app = express()

module.exports = (bridge) => {
  if (!bridge.isParsed) {
    utils.parseFilesToJson(bridge)
  }

  utils.addDocRouter(app, bridge)

  let {host, docPort} = bridge
  app.listen(docPort, (err) => {
    if (err) {
      console.log(chalk.red('Document server is failed to startup. ') + err)
      process.exit(1)
    }
    console.log(chalk.magenta(`API Document is available at [ ${`http://${host + ':' + docPort}`} ]`))
  })
}




