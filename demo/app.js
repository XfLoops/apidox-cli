const express = require('express')
const appConfig = require('./api.config')
const cors = require('cors')
const app = express()
const server = require('http').Server(app, appConfig.socketOption)
const io = require('socket.io')(server)
const renderApibs = require('./renderApibs')
const renderReference = require('./renderReference')
const chalk = require('chalk')
const {timestamp} = require('./index')
const log = console.log
const reference = appConfig.renderOption.locals.reference

// watch changes
const watcher = require('chokidar').watch(appConfig.watch)

watcher.on('change', path => {
  renderApibs(path).then(() => {
    io.emit('notifyUpdate', {seconds: appConfig.waitUtilRefresh})
    log(chalk.blue('Notified to all clients.', chalk.white(timestamp())))
  })
})

app.use(cors())

// static
app.use(express.static(appConfig.output))
app.use('/lib', express.static(appConfig.vendor))

// reference page
app.get(reference.url, (req, res) => {
  res.sendFile(reference.output)
})

// api page
app.get('/', (req, res) => {
  res.sendFile(appConfig.output + '/index.html')
})

// notify client when api document updated
io.on('connection', (socket) => {})

/**
 * initial
 **/
// reference doc
renderReference().then(() => {
  log(chalk.magenta(`Reference Document is available at [ ${`http://${appConfig.host + ':' + appConfig.port}${reference.url}`} ]`))
})

// api doc
renderApibs().then(() => {
  log(chalk.magenta(`API Document is available at [ ${`http://${appConfig.host + ':' + appConfig.port}`} ]`))
})

// listen on port
server.listen(appConfig.port, (err) => {
  if (err) {
    log(chalk.red(err))
  }
})

module.exports = io
