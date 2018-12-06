#!/usr/bin/env node

const chalk = require('chalk')
const semver = require('semver')
const requiredVersion = require('../package.json').engines.node

const checkNodeVersion = (wanted, id) => {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ))
    process.exit(1)
  }
}

checkNodeVersion(requiredVersion, 'apidox-cli')

const bridge = {
  host: '127.0.0.1'
}
const program = require('commander')

program
  .version(require('../package').version, '-v, --version')
  .usage('<folder> [options]')
  .description('render and mock api files in one command')
  .option('-p, --docPort [docPort]', 'specify api document server port')
  .option('-t, --theme [theme]', 'specify api document theme')
  .option('-P, --mockPort [mockPort]', 'specify api mock server port')
  .parse(process.argv)

// run `apidox` command only will display help content
if (!process.argv.slice(2).length) {
  program.outputHelp()
  process.exit(1)
}

try {
  bridge.folder = require('path').join(process.cwd(), process.argv[2])
  // check accessible
  require('fs').accessSync(bridge.folder)
}
catch (e) {
  console.log(chalk.red('Folder is invalid or not exist. Try: apidox <folder> [options]'))
  process.exit(1)
}

// validate theme
const defaultTheme = 'streak'
const themes = ['default', 'cyborg', 'flatly', 'slate', 'streak']
let theme

if (program.theme != undefined) {
  if (isNaN(program.theme)) {
    theme = themes.indexOf(program.theme) > -1 ? program.theme : defaultTheme
  }
  else {
    theme = themes[parseInt(program.theme) % themes.length]
  }
}
else {
  theme = defaultTheme
}

bridge.theme = theme


// run doc server
if (program.docPort || !program.docPort && !program.mockPort) {
  bridge.docPort = program.docPort || 4002
  
  require('../src/doc-server')(bridge)
}

// run mock server
if (program.mockPort) {
  bridge.mockPort = program.mockPort
  
  require('../src/mock-server')(bridge)
}



