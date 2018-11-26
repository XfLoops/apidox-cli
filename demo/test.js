const fse = require('fs-extra')
const drafter = require('drafter')
let content = `
---
FORMAT: 1.0
TEST2: 1.0
---


# EXAMPLE API 文档

# Group 修改历史

## 2018-04-26

`
drafter.parse(content, function(error, result) {
  if (error) {
      console.log(error);
      return;
  }
  console.log(fse.writeFile('./ddd.json', JSON.stringify(result)));
})




