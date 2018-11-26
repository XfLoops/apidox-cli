const express = require('express')
const chalk = require('chalk')
const utils = require('./utils')

module.exports = (bridge) => {
  
  // pre-render
  // 根据提供的dir分析文件夹的内容，确定有几个页面。将分析结果存在bridge中。支持两种目录：
  // 1. dir/*.apib ---> 一个页面
  // 2. dir/subdir/*.apib ---> 一个首页，每个子文件夹是一个页面, 访问路径是文件夹名字
  if (!bridge.isParsed) {
    utils.parseFilesToJson(bridge)
  }

  // utils.setupPageForEachRoute(bridge)
  
  bridge.docRouter = express.Router()
  bridge.docRouter.use('/', (req, res, next) => {
    res.send('<p>hello world</p>')
  })


  // setup server
  // 提供文件访问服务
  const app = express()
  app.use(bridge.docRouter)
  app.listen(bridge.docPort, (err) => {
    if (err) {
      console.log(chalk.red('Document server is failed to startup. ') + err)
      process.exit(1)
    }
    console.log(chalk.magenta(`API Document is available at [ ${`http://${bridge.host + ':' + bridge.docPort}`} ]`))
  })

  // watch changes
  // 监听文件内容变化，动态更新bridge
  // const watcher = require('chokidar').watch('bridge.watchFiles')



}




