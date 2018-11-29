const chalk = require('chalk')
const klawSync = require('klaw-sync')
const _ = require('./helper')

module.exports = (bridge) => {
  let files = klawSync(bridge.folder, {nodir: true})
  let apifiles = files.map(({path}) => path).filter(path => _.isApi(path))
  
  // 获取文档目录结构
  let dirs = apifiles.reduce((ret, path) => {
    let fileDir = _.fileDir(path, bridge.folder)
    if (!ret[fileDir]) {
      ret[fileDir] = []
    }
    ret[fileDir].push(path)
    
    return ret
  }, {})

   // 无api情况
   if (!Object.keys(dirs).length) {
    console.log(chalk.red(`The folder has no valid *.apib files.`))
    process.exit(1)
  }

  bridge.dirs = dirs

  return bridge
}


