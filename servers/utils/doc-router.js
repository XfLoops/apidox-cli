const express = require('express')


module.exports = (app, bridge) => {
  let router = express.Router()

  router.use('/', (req, res, next) => {
    res.send('<p>hello world</p>')
  })

  app.use(router)
}

