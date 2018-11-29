const api = require('./api-element')

module.exports = (parseResult = {}) => {
  let apiJson = {}
  let rootContent = parseResult.content || []

  if (parseResult.element === 'parseResult' && rootContent.length) {
    let rootElement = rootContent.find(item => item.element === 'category')

    apiJson.name = api.title(rootElement)
    apiJson.description = api.desc(rootElement)
    apiJson.metadata = api.metadata(rootElement)
    apiJson.resourceGroups = api.resourceGroups(rootElement).map((resourceGroup) => {
      let group = {}
      
      group.element = 'category'
      group.name = api.title(resourceGroup)
      group.description = api.desc(resourceGroup)
      group.resources = api.resources(resourceGroup).map((resource) => {
        let transition = api.transition(resource)
        if (transition) {
          let source = {}

          group.element = 'resource'
          source.name = api.title(transition)
          source.description = api.desc(transition)
          source.parameters = api.parameters(transition)
          source.uriTemplate = api.uriTemplate(transition)

          let httpTransaction = api.httpTransaction(transition)
          let {method, request} = api.request(httpTransaction)
          
          source.method = method
          source.request = request
          source.responses = api.responses(httpTransaction)

          return source
        }
        return false
      }).filter((resource) => resource)

      return group
    })
  }

  return apiJson
}















