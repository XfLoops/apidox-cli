# apidox-cli

Command line interface for api documentation and mock.

## todos

- [x] 命令行参数解析
- [x] 解析apib文档输出json
- apidox init ?
- mock.js

## docs

- [pug](https://pugjs.org/api/getting-started.html)
- [commander](https://www.npmjs.com/package/commander)
- [drafter](https://github.com/apiaryio/protagonist)
- [expressjs](https://expressjs.com/en/4x/api.html#app.use)
- [fs-extra](https://github.com/jprichardson/node-fs-extra)
- [apiblueprint](https://apiblueprint.org/documentation/)
- [klaw-sync](https://github.com/manidlou/node-klaw-sync)
- [nodejs](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options)
- [Chokidar](https://github.com/paulmillr/chokidar)
- [aglio](https://github.com/danielgtaylor/aglio)
- [aglio-olio-theme](https://github.com/danielgtaylor/aglio/tree/olio-theme)
- [markdown-it](https://github.com/markdown-it/markdown-it#readme)
- [highlightjs](https://highlightjs.org/)
- [Parse Result Namespace](https://api-elements.readthedocs.io/en/latest/element-definitions.html#parse-result-elements)
- [serve-favicon](https://github.com/expressjs/serve-favicon)


# usage

`apidox -f public/example -p 4002 -P 4000`


## bridge

```js

bridge = {
  host: '10.4.88.194',
  folder: __dirname + 'public/example',
  docPort: 4002,
  mockPort: 4000,

  isParsed: false,
  dirs: {
    '/public': ['/public/example.apib', '/public/example2.apib']
  },
  apiContents: {
    '/': 'ddd',
    '/public': 'm1.apib + m2.apib',
    '/substance': 'm3.apib + m4.apib'
  },
  apiJson: {
    '/': {}
  },


  docRouter: express.Router()




}

```






