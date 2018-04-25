const fs = require('fs')
const path = require('path')
const resolvePath = p => path.resolve(__dirname, p)
const appConfig = require('../api.config')
const reference = appConfig.renderOption.locals.reference
const fontsUtil = require('./fontsUtil')

const renderOption = Object.assign(
  {}, appConfig.renderOption,
  {
    locals: {},
    includePath: resolvePath('../reference')
  }
)

module.exports = () => {
  return new Promise((resolve, reject) => {
    // remove old files
    require('rimraf').sync(reference.output)

    // render index.html
    let blueprint = fs.readFileSync(reference.entry, {encoding: 'utf8'})
    require('aglio').render(blueprint, renderOption, (err, html, warnings) => {
      if (err) {
        // @bug: Cannot write or read cache for themes (ENOENT on cache folder)
        // @fix https://github.com/danielgtaylor/aglio/issues/257
        reject('error: ', err)
      }

      let newHtml = fontsUtil.replaceCDN(html)

      fs.writeFileSync(reference.output, newHtml, {encoding: 'utf8'})

      resolve()
    })
  })
}
