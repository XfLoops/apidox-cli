const express = require('express')
const router = express.Router()
const highlight = require('highlight.js')
const markdownit = require('markdown-it')({
  html: true,     // Enable HTML tags in source
  linkify: true,  // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
  highlight
})

const config = {
  // doctype: 'html',
  self: true,  // if ture, all locals variables are accessed by self.variable.
  debug: false
}

const options = {
  ...config,
  markdown: md => markdownit.render(md),
  highlight
}

module.exports = (bridge) => {
  router.use('/example', (req, res, next) => {
    res.render('example', options)
  })

  return router
}

