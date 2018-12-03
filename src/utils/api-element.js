const apiElement = {}

apiElement.title = (element) => {
  try {
    return element.meta.title.content
  } catch (e) {
    return ''
  }
}

apiElement.metadata = (element) => {
  try {
    let metaContent = element.attributes.metadata.content
    return metaContent.reduce((ret, item) => {
      let key = item.content.key.content
      let value = item.content.value.content
      ret[key] = value
      return ret
    }, {})
  } catch (e) {
    return {}
  }
}

apiElement.desc = (element) => {
  try {
    let content = element.content || []
    let copyElement = content.find(item => item.element === 'copy')
    return copyElement ? copyElement.content : ''
  } catch (e) {
    return ''
  }
}

apiElement.resourceGroups = (element) => {
  return (element.content || []).filter(item => item.element === 'category')
}

apiElement.resources = (element) => {
  return (element.content || []).filter(item => item.element === 'resource')
}

apiElement.transition = (element) => {
  return (element.content || []).find(item => item.element === 'transition')
}

apiElement.enums = (element) => {
  try {
    return element.attributes.enumerations.content.map(item => item.content)
  } catch (e) {
    return false
  }
}

apiElement.parameters = (element) => {
  try {
    let hrefVariables = element.attributes.hrefVariables.content
    return hrefVariables.map((herf) => {
      let param = {}

      param.name = herf.content.key.content
      param.description = herf.meta.description.content
      param.type = herf.meta.title.content
      param.required = herf.attributes.typeAttributes.content[0].content

      if (param.type === 'enum') {
        param.enums = apiElement.enums(herf.content.value)
        param.example = herf.content.value.content.content
      }
      else {
        param.enums = false
        param.example = herf.content.value.content
      }

      return param
    })
  } catch (e) {
    return []
  }
}

apiElement.uriTemplate = (element) => {
  try {
    return element.attributes.href.content
  } catch (e) {
    return ''
  }
}

apiElement.dataStructure = (element) => {
  return (element.content || []).find(item => item.element === 'dataStructure')
}

apiElement.body = (element) => {
  try {
    return element.content.content.reduce((ret, item) => {
      let key = item.content.key.content
      let value = item.content.value.content
      ret[key] = value

      return ret
    }, {})
  } catch (e) {
    return {}
  }
}

apiElement.bodyContent = (element, body) => {
  let content = JSON.stringify(body)
  try {
    let assetElement = (element.content || []).find(item => item.element === 'asset' && meta.classes.content[0].content === 'messageBody')
    return assetElement ? assetElement.content : content
  } catch (e) {
    return content
  } 
}

apiElement.httpTransaction = (element) => {
  return (element.content || []).find(item => item.element === 'httpTransaction')
}

apiElement.request = (element) => {
  let req = {method: 'GET', request: {}}
  try {
    let httpRequest = (element.content || []).find(item => item.element === 'httpRequest')
    
    if (httpRequest) {
      req.method = httpRequest.attributes.method.content
      let dataStructure = apiElement.dataStructure(httpRequest)
      
      req.request.body = dataStructure ? apiElement.body(dataStructure) : {}
      req.request.bodyContent = apiElement.bodyContent(httpRequest, req.request.body)
    }
    return req
  } catch (e) {
    return req
  }
}

apiElement.responses = (element) => {
  let res = []
  try {
    let httpResponses = (element.content || []).filter(item => item.element === 'httpResponse')
    return httpResponses.map((response) => {
      let responseObj = {}
      let dataStructure = apiElement.dataStructure(response)

      responseObj.status = response.attributes.statusCode.content
      responseObj.body = dataStructure ? apiElement.body(dataStructure) : {}
      responseObj.bodyContent = apiElement.bodyContent(response, responseObj.body)
      
      return responseObj
    })
  } catch (e) {
    return res
  }
}

module.exports = apiElement

