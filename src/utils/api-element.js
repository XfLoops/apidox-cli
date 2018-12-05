const apiElement = {}

// 找到元素的第一个为type的element
apiElement.find = (element, type) => {
  return (element.content || []).find(item => item.element === type)
}
// 找到元素的所有的为type的element
apiElement.filter = (element, type) => {
  return (element.content || []).filter(item => item.element === type)
}

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
    let copyElement = apiElement.find(element, 'copy')
    return copyElement ? copyElement.content : ''
  } catch (e) {
    return ''
  }
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

apiElement.data = (element) => {
  try {
    return element.content.reduce((ret, item) => {
      let key = item.content.key.content
      let valueType = item.content.value.element
      let valueContent = item.content.value.content

      if (valueType === 'object') {
        ret[key] = apiElement.data(valueContent)
      }
      else {
        ret[key] = valueContent
      }

      return ret
    }, {})
  } catch (e) {
    return null
  }
}

apiElement.request = (element) => {
  let req = {
    method: 'GET', 
    request: {
      hasContent: false
    }
  }

  try {
    let httpRequest = apiElement.find(element, 'httpRequest')
    
    if (httpRequest) {
      let dataStructure = apiElement.find(httpRequest, 'dataStructure')
      
      req.method = httpRequest.attributes.method.content
      // [ ] todo: to be improved
      req.request.data = dataStructure ? apiElement.data(dataStructure.content) : null
      req.request.body = req.request.data ? JSON.stringify(req.request.data) : null
      
      if (req.request.body) {
        req.request.body = req.request.body.trim()
        req.request.hasContent = true
      }
    }
    return req
  } catch (e) {
    return req
  }
}

apiElement.response = (element) => {
  let res = {
    hasContent: false
  }

  try {
    let response = apiElement.find(element, 'httpResponse')
    let dataStructure = apiElement.find(response, 'dataStructure')
    let asset = apiElement.find(response, 'asset')

    res.status = response.attributes.statusCode.content
    res.data = dataStructure ? apiElement.data(dataStructure.content) : null
    res.body = asset ? asset.content : res.data ? JSON.stringify(res.data) : null
    
    if (res.body) {
      res.body = res.body.trim()
      res.hasContent = true
    }
    return res
  } catch (e) {
    return res
  }
}

apiElement.simplify = (uriTemplate) => {
  let idx = uriTemplate.indexOf('{')
  return idx === -1 ? uriTemplate : uriTemplate.substr(0, idx)
}

module.exports = apiElement

