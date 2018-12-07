const apiElement = {}

// 找到元素的第一个为type的element
apiElement.find = (element, type) => {
  return (element.content || []).find(item => item.element === type)
}
// 找到元素的第一个为type的element, 并从数组中剔除该element
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
// 是否是 string, number, boolean
apiElement.isPrimary = (element) => {
  return ['string', 'number', 'boolean'].indexOf(element.element) > -1
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
    if (apiElement.isPrimary(element)) {
      return element.content
    }

    if (!element.content) {
      return null
    }

    let isArray = element.element === 'array'

    return element.content.reduce((ret, item) => {
      let val = null, key = null

      if (apiElement.isPrimary(item)) {
        val = item.content
      }

      else if (item.element === 'object' || item.element === 'array') {
        val = apiElement.data(item)
      }

      else if (item.element === 'member') {
        key = item.content.key.content
        val = apiElement.data(item.content.value)
      } 

      // 将val加入ret中
      if (val != null) {
        if (isArray) {
          ret.push(val)
        }
        else {
          ret[key] = val
        }
      }

      return ret
    }, isArray ? [] : {})
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
      req.request.body = req.request.data ? JSON.stringify(req.request.data, null, 2) : null
      
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
    if (res.data) {
      res.body = JSON.stringify(res.data, null, 2)
    }
    else {
      let bodyAsset = apiElement.findOut(response, 'asset')
      res.body = bodyAsset ? bodyAsset.content : null
    }

    
    // schema
    // let schemaAsset = apiElement.findOut(response, 'asset')
    // schema = schemaAsset ? schemaAsset.content : null

    if (res.body) {
      res.hasContent = true
    }
    return { response: res, schema }
  } catch (e) {
    return { response: res,  schema }
  }
}

// 将地址的参数去掉，如: /foo/bar{?p1,p2} => /foo/bar
apiElement.simplify = (uriTemplate) => {
  let idx = uriTemplate.lastIndexOf('{?')
  return idx === -1 ? uriTemplate : uriTemplate.substr(0, idx)
}

module.exports = apiElement

