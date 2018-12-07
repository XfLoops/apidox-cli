let assert = require('assert')
let apiE = require('../src/parser/api-element')

describe('api element methods', () => {

  it('should remove queries.', () => {
    let path = '/aaa/vvv{?param1,param2}'
    assert.equal(apiE.simplify(path), '/aaa/vvv')
  })

  it('should convert brace to colon', () => {
    let path = '/aaa/{bbb}/vvv'
    assert.equal(apiE.simplify(path), '/aaa/:bbb/vvv')
  })

})


