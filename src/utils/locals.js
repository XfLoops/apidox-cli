const hljs = require('highlight.js')
const markdownit = require('markdown-it')

module.exports = (page, bridge) => {
  let apiJson = bridge.apiJson
  let dirs = Object.keys(bridge.dirs)
  let api = apiJson['/' + page] || apiJson['/'] || apiJson[dirs[0]]

  return {
    self: true, // if ture, all locals variables are accessed by self.variable.
    debug: false,
    theme: bridge.theme, // theme
    markdown,
    highlight,
    api
  }
}

/** highlight wrapper **/
function highlight (code, lang, subset) {
  let result = ''
  switch (lang) {
    case 'no-highlight':
      result = code
      break
    case 'undefined':
    case null:
    case '':
      result = hljs.highlightAuto(code, subset).value
      break
    default:
      result = hljs.highlight(lang, code).value
  }
  return result.trim()
}

/** markdown wrapper **/
const mdIt = markdownit({
  html: true,     // Enable HTML tags in source
  linkify: true,  // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
  highlight
})
.use(require('markdown-it-checkbox'))
.use(require('markdown-it-container'), 'note')
.use(require('markdown-it-container'), 'warning')

function markdown (md) {
  return mdIt.render(md)
}
