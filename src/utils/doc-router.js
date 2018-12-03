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
  const locals = {
    self: true, // if ture, all locals variables are accessed by self.variable.
    debug: false,
    markdown: md => markdownit.render(md),
    highlight
  }

  router.use('/example', (req, res, next) => {
    res.render('index', locals)
  })

  return router
}

