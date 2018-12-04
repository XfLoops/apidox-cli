#!/usr/bin/env node

const chalk = require('chalk')
const semver = require('semver')
const requiredVersion = require('../package.json').engines.node

function checkNodeVersion (wanted, id) {
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
  // host: require('dev-ip')()[0]
  host: '127.0.0.1'
}
const program = require('commander')

program
  .version(require('../package').version, '-v, --version')
  .usage('-f <folder> [-p <docPort> | -P <mockPort> | -t <theme>]')
  .description('render and mock api files in one command')
  .option('-f, --folder <folder>', 'specify api files folder')
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
  // run without -f option
  if (!program.folder) {
    console.log(chalk.red('Not provide api folder. Try: apidox -f <folder>'))
    process.exit(1)
  }
  bridge.folder = require('path').join(process.cwd(), program.folder)
  // check dir is accessible
  require('fs').accessSync(bridge.folder)
}
catch (e) {
  console.log(chalk.red(program.folder + ' is not exist.'))
  process.exit(1)
}

// validate theme
const themes = ['default', 'cyborg', 'flatly', 'slate', 'streak']
const theme = program.theme || 'default'
bridge.theme = themes.indexOf(theme) > -1 ? theme : 'default'

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



