const path = require('path')
const resolvePath = p => path.resolve(__dirname, p)

const host = require('dev-ip')()[0]
const port = 4002
const apiDir = './docs'

const config = {
  // basic config
  entry: resolvePath(apiDir),
  output: resolvePath('./dist'),
  vendor: resolvePath('./lib'),

  // files to watch
  watch: [
    resolvePath(`${apiDir}/*.apib`)
  ],

  // public url
  host, port,

  // template render option
  renderOption: {
    includePath: resolvePath('../../'),
    themeTemplate: resolvePath('./templates/index.jade'),
    themeVariables: 'default',
    themeFullWidth: true,
    locals: {
      apiServer: `http://${host}:${port}`,
      reference: {
        entry: resolvePath('./reference/index.md'),
        output: resolvePath('./reference/index.html'),
        url: '/reference',
        text: '接口文档语法参考'
      }
    }
  },

  // client refresh seconds
  waitUtilRefresh: 2,

  // socket
  socketOption: {
    // path: '/socket.io',
    serveClient: false,
    origins: '*',
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  },

  // fix fonts cdn: https://servers.ustclug.org/2014/06/blog-googlefonts-speedup/
  fonts: {
    oldCDN: 'fonts.googleapis.com',
    newCDN: 'fonts.lug.ustc.edu.cn'
  }
}

module.exports = config
