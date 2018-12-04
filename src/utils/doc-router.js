const express = require('express')
const localVars = require('./locals')

module.exports = (bridge) => {
  const router = express.Router()
  // logger
  router.use((req, res, next) => {
    console.log('%s %s %s', req.method, req.url, req.path);
    next()
  })

  router.use('/:page', (req, res, next) => {
    res.render('page', localVars(req.params.page, bridge))
  })

  router.use('/', (req, res, next) => {
    res.redirect('/index')
  })

  return router
}

