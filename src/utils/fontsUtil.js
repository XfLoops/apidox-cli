const appConfig = require('../api.config')

module.exports = {
  replaceCDN (html) {

    if (appConfig.fonts) {
      let {oldCDN, newCDN} = appConfig.fonts

      return html.replace(new RegExp(oldCDN, 'g'), newCDN)
    }

    return html
  }
}
