const express = require('express')
const highlight = require('highlight.js')
const markdownit = require('markdown-it')({
  html: true,     // Enable HTML tags in source
  linkify: true,  // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
  highlight
})

module.exports = (bridge) => {
  const router = express.Router()
  const apiJson = bridge.apiJson
  const dirs = bridge.dirs
  const locals = {
    self: true, // if ture, all locals variables are accessed by self.variable.
    debug: false,
    markdown: md => markdownit.render(md),
    highlight
  }

  router.use('/:page', (req, res, next) => {
    let page = req.params.page
    // [ ]fixme: unmatched route make api return undefined
    let api = apiJson['/' + page] || apiJson['/'] || apiJson[dirs[0]]

    res.render('page', { ...locals, api })
  })

  router.use('/', (req, res, next) => {
    res.redirect('/index')
  })

  return router
}

