const fs = require('fs')
const _ = require('./helper')

module.exports = (filedir, bridge) => {
  let filepaths = bridge.dirs[filedir]
  let content = ''

  // 合并文件
  filepaths.forEach((path) => {
    content += fs.readFileSync(path, {encoding: 'utf8'})
  })
  
  // 替换include
  content = _.includeReplace(bridge.folder + filedir, content)

  return content
}







