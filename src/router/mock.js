const express = require('express')

module.exports = (bridge) => {
  const router = express.Router()
  const resources = collectSources(bridge)

  resources.forEach(({path, data, status}) => {
    router.use(path, (req, res, next) => {
      res.status(status).json(data)
    })
  })

  return router
}

function collectSources (bridge) {
  let resources = []
  let apiJson = bridge.apiJson

  for (let fileDir in apiJson) {
    let json = apiJson[fileDir]
    let baseUri = json.metadata.BASE_URI || ''
    baseUri = baseUri === '/' ? '' : baseUri

    let resourceGroups = json.resourceGroups || []

    let _resources = resourceGroups.reduce((ret, group) => {
      let arr = group.resources || []
      
      let _arr = arr.map((item) => {
        let res = {
          path: baseUri + item.simpleUri, 
          status: item.response.status || 200,
          data: {}
        }

        if (item.response.hasContent) {
          res.data = item.response.data || item.response.body
        }

        return res
      })

      return ret.concat(_arr)
    }, [])

    resources = resources.concat(_resources)
  }

  return resources
}








