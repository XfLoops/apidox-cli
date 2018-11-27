const slash = require('slash')
const fs = require('fs')
const chalk = require('chalk')

// 判断是否是api文件
const isApi = filepath => {
  return /.*\.(md|apib)$/ig.test(filepath)
}

// 获取文件所在目录
const fileDir = (filepath, basepath) => {
  let str = slash(filepath.replace(basepath, ''))
  let segs = str.split('/')
  return '/' + segs.slice(1, segs.length - 1).join('/')
}

// 替换include内容
const replaceInclude = (dir, content) => {
  let includePattern = /<!--\s+include\((.*)\)\s+-->/igm
  
  if (includePattern.test(content)) {
    content = content.replace(includePattern, (match, filename) => {
      let seperator = dir.substr(-1) === '/' ? '' : '/'
      let filepath = dir + seperator + filename
      try {
        fs.accessSync(filepath)
      }
      catch (e) {
        console.log(chalk.red(filepath + ' is not exist.'))
        process.exit(1)
      }
      return fs.readFileSync(filepath, {encoding: 'utf8'})
    })
  }

  return content
}


module.exports = {
  isApi,
  fileDir,
  replaceInclude
}

