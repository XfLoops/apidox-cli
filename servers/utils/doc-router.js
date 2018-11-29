const express = require('express')
const pug = require('pug')
const path = require('path')
const markdownit = require('markdown-it')()
const router = express.Router()

module.exports = (bridge) => {
  router.use('/test', (req, res, next) => {
    let options = {
      debug: true,
      self: true,
      compileDebug: true
    }
    let p = path.join(__dirname, '../views/example.pug')
    let fn = pug.compileFile(p, options)
    
    let html = fn({
      add: (a, b) => a + b,
      title: 'title tst',
      markdown: function (md) {
        return markdownit.render(md)
      }
    })

    res.send(html)
  })

  return router
}

