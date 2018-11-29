const parseContent = require('./parse-content')
const parseJson = require('./parse-json')

module.exports = (bridge) => {
  bridge.apiContents = {}
  bridge.apiJson = {}

  Object.keys(bridge.dirs).forEach((dir) => {
    bridge.apiContents[dir] = parseContent(dir, bridge)
    bridge.apiJson[dir] = parseJson(dir, bridge)
  })
  
  bridge.isParsed = true

  return bridge
}

