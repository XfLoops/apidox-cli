/**
 * 合并apib或md文件
 * */
const fs = require('fs')

const getMergeContents = (dir) => {
  dir = (dir + '/').replace(/\{2,}/, '/')
  let list = []
  let tmp = fs.readdirSync(dir)
  let txt = ''

  tmp.forEach(file => {
    let stat = fs.statSync(dir + file)

    if (stat.isFile() && /\.(md|apib)$/.test(file)) {
      return list.push(dir + file)
    }
    if (stat.isDirectory()) {
      list = list.concat(merge(dir + file))
    }
  })

  list.forEach(function (file) {
    txt += fs.readFileSync(file)
  })

  return txt
}

const merge = (inputDir, outputFile) => {
  let contents = getMergeContents(inputDir)
  fs.writeFileSync(outputFile, contents)
}

const replace = (outputFile, props) => {
  let content = fs.readFileSync(outputFile, 'utf8')
  for (let key in props) {
    content = content.replace(new RegExp(key, 'g'), props[key])
  }

  fs.writeFileSync(outputFile, content)
}

const fmt = (num) => num < 10 ? '0' + num : num

const timestamp = () => {
  let date = new Date()
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()

  return `${fmt(h)}:${fmt(m)}:${fmt(s)}`
}

module.exports = {
  merge,
  replace,
  timestamp
}
