const fs = require('fs')
const fse = require('fs-extra')
const chalk = require('chalk')
const drafter = require('drafter')
const klawSync = require('klaw-sync')
const _ = require('./helper')

module.exports = (bridge) => {
  let files = klawSync(bridge.folder, {nodir: true})
  let apiContents = {}

  files.forEach(({path}) => {
    if (_.isApi(path)) {
      let filedir = _.fileDir(path, bridge.folder)
      let content = fs.readFileSync(path, {encoding: 'utf8'})
      
      // 替换includes文件
      content = _.replaceInclude(bridge.folder + filedir, content)
      // 按目录存储
      apiContents[filedir] = (apiContents[filedir] || '') + content
    }
  })


  let dirs = Object.keys(apiContents)
  let apiJson = {}
  
  // 无api文件
  if (!dirs.length) {
    console.log(chalk.red(`The folder has no api files.`))
    process.exit(1)
  }

  // 文件转为json
  dirs.forEach((filedir) => {
    apiJson[filedir] = drafter.parseSync(apiContents[filedir])
  })

  // 检查首页
  if (!apiJson['/']) {
    
  }


  // 存储结果
  bridge.apiContents = apiContents
  bridge.apiJson = apiJson
  bridge.isParsed = true

  fse.writeJsonSync(bridge.folder + '/bridge.json', bridge)

  return bridge
}









