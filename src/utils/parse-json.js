const drafter = require('drafter')
const jsonAdaptor = require('./json-adaptor')

module.exports = (filedir, bridge) => {
  let apiContent = bridge.apiContents[filedir]
  let apiJson

  apiJson = drafter.parseSync(apiContent, {requireBlueprintName: true})
  apiJson = jsonAdaptor(apiJson)

  require('fs-extra').outputJsonSync(bridge.folder + '/apiJson.json', apiJson)

  return apiJson
}

