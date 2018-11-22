
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

// const program = require('commander')

// program
//   .version(require('../package').version)
//   .usage('<dir> [options]')
//   .option('-p, --port', 'specify api document access port', parseInt, 4002)
//   .option('-P, --mockPort', 'specify api mock server port', parseInt, 4000)
//   .parse(process.argv)

// program
//   .command('serve <dir> [options]')
//   .option('-p, --port', 'specify api document access port', parseInt, 4002)
//   .parse(process.argv)

// let cmd, option 
// program
//   .command('mock <dir> [options]')
//   .option('-P, --mockPort', 'specify api mock server port', parseInt, 4000)
//   .action((cmd, option) => {
//     cmd = cmd
//     option = option
//   })

//   console.log('cmd:', cmd)
//   console.log('option:', option)


  var program = require('commander');
 
  program
    .version('0.1.0')
    .command('install [name]', 'install one or more packages')
    .command('search [query]', 'search with optional query')
    .command('list', 'list packages installed', {isDefault: true})
    .parse(process.argv);