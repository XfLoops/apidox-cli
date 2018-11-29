const slash = require('slash')
const fs = require('fs')
const chalk = require('chalk')

// 判断是否是api文件: 
// *.apib
const isApi = filepath => {
  return /.*\.apib$/ig.test(filepath)
}

// 获取文件所在目录:
// /example; /; /sub/example; 
const fileDir = (filepath, basepath) => {
  let str = slash(filepath.replace(basepath, ''))
  let segs = str.split('/')
  return '/' + segs.slice(1, segs.length - 1).join('/')
}

// 替换 <!-- include(data.json5) -->
const includeReplace = (dir, content) => {
  // handle include directive
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
      
      // issue: include file should has indent format of either 8 spaces or 2 tabs. 
      // resolve: https://github.com/danielgtaylor/aglio/blob/0cef09ab83d680689bcadf53aa45fc7bca3b5af3/src/main.coffee#L25
      let filecontent = fs.readFileSync(filepath, {encoding: 'utf8'})
      let lines = filecontent.replace(/\r\n?/g, '\n').split('\n')
      let spaces = '        '
      return spaces + lines.join('\n' + spaces)
    })
  }

  // issue: Drafter does not support \r ot \t in the input.
  // resolve: https://github.com/danielgtaylor/aglio/blob/0cef09ab83d680689bcadf53aa45fc7bca3b5af3/src/main.coffee#L88
  content = content.replace(/\r\n?/g, '\n').replace(/\t/g, '    ')

  return content
}

module.exports = {
  isApi,
  fileDir,
  includeReplace
}

