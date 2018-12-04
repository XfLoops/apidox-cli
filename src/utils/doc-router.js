const express = require('express')
const highlight = require('highlight.js')
const markdownit = require('markdown-it')({
  html: true,     // Enable HTML tags in source
  linkify: true,  // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
  highlight
})
const router = express.Router()

module.exports = (bridge) => {
  const apiJson = bridge.apiJson
  const dirs = Object.keys(bridge.dirs)
  const locals = {
    self: true, // if ture, all locals variables are accessed by self.variable.
    debug: false,
    markdown: md => markdownit.render(md),
    highlight
  }

  // logger
  router.use((req, res, next) => {
    console.log('%s %s %s', req.method, req.url, req.path);
    next()
  })

  router.use('/:page', (req, res, next) => {
    let page = req.params.page
    let api = apiJson['/' + page] || apiJson['/'] || apiJson[dirs[0]]
    
    res.render('page', { ...locals, api })
  })

  router.use('/', (req, res, next) => {
    res.redirect('/index')
  })

  return router
}

