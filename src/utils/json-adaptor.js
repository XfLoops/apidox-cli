const api = require('./api-element')

module.exports = (parseResult = {}) => {
  let apiJson = {}
  let rootContent = parseResult.content || []

  if (parseResult.element === 'parseResult' && rootContent.length) {
    let rootElement = rootContent.find(item => item.element === 'category')

    apiJson.name = api.title(rootElement)
    apiJson.description = api.desc(rootElement)
    apiJson.metadata = api.metadata(rootElement)
    apiJson.resourceGroups = api.filter(rootElement, 'category').map((resourceGroup) => {
      let group = {}
      
      group.element = 'category'
      group.name = api.title(resourceGroup)
      group.description = api.desc(resourceGroup)
      group.resources = api.filter(resourceGroup, 'resource').map((resource) => {
        let transition = api.find(resource, 'transition')
        if (transition) {
          let source = {}

          group.element = 'resource'
          source.name = api.title(transition)
          source.description = api.desc(transition)
          source.parameters = api.parameters(transition)
          source.uriTemplate = api.uriTemplate(transition)
          source.simpleUri = api.simplify(source.uriTemplate)

          let httpTransaction = api.find(transition, 'httpTransaction')
          // request
          let {method, request} = api.request(httpTransaction)
          source.request = request
          source.method = method
          source.methodLower = method.toLowerCase()
          // response
          let {response, schema} = api.response(httpTransaction)
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

