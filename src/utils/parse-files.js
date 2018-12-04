const parseDirs = require('./parse-dirs')
const parseContent = require('./parse-content')
const parseJson = require('./parse-json')

module.exports = (bridge) => {
  bridge = parseDirs(bridge)

  bridge.apiContents = {}
  bridge.apiJson = {}
  bridge.menu = []

  Object.keys(bridge.dirs).forEach((dir) => {
    bridge.apiContents[dir] = parseContent(dir, bridge)
    bridge.apiJson[dir] = parseJson(dir, bridge)
    bridge.menu.push({
      name: bridge.apiJson[dir].name,
      path: dir
    })
  })
  
  bridge.isParsed = true

  return bridge
}

