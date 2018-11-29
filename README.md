# apidox-cli

Command line interface for api documentation and mock.

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






