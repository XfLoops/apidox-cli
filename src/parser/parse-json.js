const drafter = require('drafter')
const apiE = require('./api-element')

module.exports = (filedir, bridge) => {
  let apiContent = bridge.apiContents[filedir]
  let apiJson

  apiJson = drafter.parseSync(apiContent, {requireBlueprintName: true})

  filedir === '/fcbpk' && require('fs-extra').outputJSONSync(bridge.folder + '/apiJson-before.json', apiJson)

  apiJson = jsonAdaptor(apiJson)

  filedir === '/fcbpk' && require('fs-extra').outputJSONSync(bridge.folder + '/apiJson-after.json', apiJson)
  
  return apiJson
}

// 将drafter的解析结果做一些转化
function jsonAdaptor (parseResult = {}) {
  let apiJson = {}
  let rootContent = parseResult.content || []

  if (parseResult.element === 'parseResult' && rootContent.length) {
    let rootElement = rootContent.find(item => item.element === 'category')

    apiJson.name = apiE.title(rootElement)
    apiJson.description = apiE.desc(rootElement)
    apiJson.metadata = apiE.metadata(rootElement)
    apiJson.resourceGroups = apiE.filter(rootElement, 'category').map((resourceGroup) => {
      let group = {}
      
      group.element = 'category'
      group.name = apiE.title(resourceGroup)
      group.description = apiE.desc(resourceGroup)
      group.resources = apiE.filter(resourceGroup, 'resource').map((resource) => {
        let transition = apiE.find(resource, 'transition')
        if (transition) {
          let source = {}

          group.element = 'resource'
          source.name = apiE.title(transition)
          source.description = apiE.desc(transition)
          source.parameters = apiE.parameters(transition)
          source.uriTemplate = apiE.uriTemplate(transition)
          source.simpleUri = apiE.simplify(source.uriTemplate)

          let httpTransaction = apiE.find(transition, 'httpTransaction')
          // request
          let {method, request} = apiE.request(httpTransaction)
          source.request = request
          source.method = method
          source.methodLower = method.toLowerCase()
          // response
          let {response, schema} = apiE.response(httpTransaction)
          source.response = response
          source.schema = schema

          return source
        }
        return false
      }).filter((resource) => resource)

      return group
    })
  }

  return apiJson
}


