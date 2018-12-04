const drafter = require('drafter')
const jsonAdaptor = require('./json-adaptor')

module.exports = (filedir, bridge) => {
  let apiContent = bridge.apiContents[filedir]
  let apiJson

  apiJson = drafter.parseSync(apiContent, {requireBlueprintName: true})
  
  // require('fs-extra').outputJsonSync(bridge.folder + '/apiJson-before.json', apiJson)

  apiJson = jsonAdaptor(apiJson)

  // require('fs-extra').outputJsonSync(bridge.folder + '/apiJson-after.json', apiJson)

  return apiJson
}

