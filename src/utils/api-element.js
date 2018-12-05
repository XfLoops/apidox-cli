const apiElement = {}

// 找到元素的第一个为type的element
apiElement.find = (element, type) => {
  return (element.content || []).find(item => item.element === type)
}
// 找到元素的第一个为type的element, 并从数组中剔除
apiElement.findOut = (element, type) => {
  let content = element.content || []
  let idx = content.findIndex(item => item.element === type)
  let [elem] = content.splice(idx, 1)
  return elem
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
  let schema = null

  try {
    let response = apiElement.find(element, 'httpResponse')
    
    // status
    res.status = response.attributes.statusCode.content

    // data
    let dataStructure = apiElement.find(response, 'dataStructure')
    res.data = dataStructure ? apiElement.data(dataStructure.content) : null

    // body
    let bodyAsset = apiElement.findOut(response, 'asset')
    res.body = bodyAsset ? bodyAsset.content : res.data ? JSON.stringify(res.data) : null
    
    // schema
    // let schemaAsset = apiElement.findOut(response, 'asset')
    // schema = schemaAsset ? schemaAsset.content : null

    if (res.body) {
      res.body = res.body.trim()
      res.hasContent = true
    }
    return { response: res, schema }
  } catch (e) {
    return { response: res,  schema }
  }
}

apiElement.simplify = (uriTemplate) => {
  let idx = uriTemplate.indexOf('{')
  return idx === -1 ? uriTemplate : uriTemplate.substr(0, idx)
}

module.exports = apiElement

