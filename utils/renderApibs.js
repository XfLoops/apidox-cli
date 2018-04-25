const fs = require('fs')
const appConfig = require('../api.config')
const {timestamp} = require('./index')
const chalk = require('chalk')
const fontsUtil = require('./fontsUtil')
const log = console.log

module.exports = (filePath) => {
  return new Promise((resolve, reject) => {
    filePath && log(chalk.cyan(`Changes captured at [${filePath}]`, chalk.white(timestamp())))

    // remove old files
    require('rimraf').sync(appConfig.output + '/*')

    // merge *.apib into index.apib
    require('./index').merge(appConfig.entry, appConfig.output + '/index.apib')

    // render index.apib => index.html
    const input = fs.readFileSync(appConfig.output + '/index.apib', {encoding: 'utf8'})
    const output = appConfig.output + '/index.html'

    require('aglio').render(input, appConfig.renderOption, (err, html, warnings) => {
      if (err) {
        // @bug: Cannot write or read cache for themes (ENOENT on cache folder)
        // @fix https://github.com/danielgtaylor/aglio/issues/257
        reject('aglio render error: ', err)
      }

      let newHtml = fontsUtil.replaceCDN(html)

      fs.writeFileSync(output, newHtml, {encoding: 'utf8'})

      resolve()
    })
  })
}
