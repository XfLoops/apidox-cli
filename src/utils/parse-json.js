const drafter = require('drafter')
const jsonAdaptor = require('./json-adaptor')

module.exports = (filedir, bridge) => {
  let apiContent = bridge.apiContents[filedir]
  let apiJson

  apiJson = drafter.parseSync(apiContent, {requireBlueprintName: true})
  apiJson = jsonAdaptor(apiJson)
  
  return apiJson
}

