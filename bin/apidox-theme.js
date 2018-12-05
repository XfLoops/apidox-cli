#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const less = require('less')
const chalk = require('chalk')

const src = f => path.join(__dirname, '../public/theme', f)
const dist = f => path.join(__dirname, '../public/style', f)
const readFile = f => fs.readFileSync(src(f), {encoding: 'utf8'})
const writeFile = (f, c) => fs.writeFileSync(dist(f), c, {encoding: 'utf8'})

const defaultVariables = readFile('variables-default.less')
const defaultLayout = readFile('layout-default.less')

const themeLess= theme => defaultVariables + (theme === 'default' ? '' : readFile('variables-' + theme + '.less')) + defaultLayout
const themes = ['default', 'cyborg', 'flatly', 'slate', 'streak']

themes.forEach((theme) => {
  let lessText = themeLess(theme)

  less.render(lessText, {compress: true}, (err, result) => {
    if (err) {
      console.log(err)
    }

    let input = result.css
    let output = theme + '.css'

    writeFile(output, input)

    console.log(chalk.green(`[ ${output} ] is created.`))
  })
})

