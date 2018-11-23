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

const program = require('commander')

program
  .version(require('../package').version, '-v, --version')
  .usage('<dir> [-p <docPort>] [-P <mockPort>]')
  .description('render and mock api files in one command')
  .option('-p, --docPort', 'specify rendered html access port')
  .option('-P, --mockPort', 'specify api mock server port')
  .action((arg1, arg2, arg3, arg4) => {
    console.log(arg1, arg2, arg3, arg4)
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}




