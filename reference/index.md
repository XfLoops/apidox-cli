FORMAT: 1A

# 接口文档语法参考


# Group Blueprint语法

## 基本语法

常用的请求方法包括：

  - `GET`：查询、获取
  - `POST`：更新、保存、新增
  - `DELETE`：删除
  - `PUT`：更新

接口的基本语法：

```markdown

## 获取列表 [GET /cards/{cardId}.do{?periodId}]

+ Parameters  // 地址栏传参
    + cardId: `card001` (string, required) - 卡片id
    + periodId: `period001` (string, required) - 学期id

+ Response 200 (application/json;charset=utf-8)
    + Attributes  // Attributes用来指定request或response中body的属性。
        + data(array[object]) // 返回数据
            + object
                + title: 'card title'
                + content: 'card content'
            + object
                + title: 'card title'
                + content: 'card content'

```

:::warning
注意：缩进要一致，例如 2个tab 或 4个空格，否则最后生成的数据格式会有问题。
:::


## 字段类型

常用的字段类型包括：

- **string**
```markdown
+ Parameters
    + id: id001 (string, required) - id
```

- **number**
```markdown
+ Parameters
    + count: 100 (number, optional) - 总数
```

- **boolean**
```markdown
+ Parameters
    + valid: false (boolean, optional) - 是否合法
```

- **array**
```markdown
+ Response 200 (application/json;charset=utf-8)
    + Attribute
        + strData: 1, 2, 3, 4 (array[string], optional) - 字符串数组
        + numData: 1, 2, 3, 4 (array[number], optional) - 数字数组
        + mixData: `1`, `2`, 3, 4 (array, optional) - 默认都是字符串
   
```

- **array[object]**
```markdown
+ Response 200 (application/json;charset=utf-8)
    + Attribute
        + data (array[object])
            + object
                + id: id001 (string, required) - id
                + name: 张三 (string, required) - 姓名
    

```

- **enum**

```markdown
+ Parameters
    + sex: `男` (enum, optional) - 性别
        + Default: `女`  // 默认值
        + Members        // 可枚举的值
            + `男`
            + `女`
            + `中性`

```


## 请求传参

:::note 
  **地址栏传参**
 
  地址栏传参需要同时在 `url` 和 `Parameters` 中声明
  
  ```markdown
  
  ## 获取列表 [GET /cards/{cardId}.do{?periodId}]
  
  + Parameters
      + cardId: `card001` (string, required) - 卡片id
      + periodId: `period001` (string, required) - 学期id
  
  ```
:::

:::note 

**body传参**

body传参不需要在地址栏中声明，所有参数都放在`body`中。

注意：`GET`请求不能使用该方式。只有`POST`, `PUT`可以使用body传参

```markdown

## 更新卡片 [POST /card/update.do]

+ Request (application/json;charset=utf-8)
   + Attributes
      + periodId: `period001` (string, required) - 学期id
      + gradeId: `grade001` (string, required) - 年级id
      + campus: `东校区` (string, required) - 校区

```
:::

:::note

**上传文件**

上传文件只需要定义 `Parameters` 和 `Response`

```markdown

## 上传文件 [POST /upload.do{?periodId}]

+ Parameters
    + periodId: `period001` (string, required) - 学期id

+ Response 200 (application/json;charset=utf-8)

```

其中上传文件的js写法如下：

```javascript

let uploadFile = document.querySelector('input[type="file"]').files[0]
let formData = new formData()

formData.append('upload_filename', uploadFile)

axio.post('/upload.do', formData, {headers: {'Content-Type': 'multiple/form-data'}}).then(({data}) => {
  console.log(data)
})
```

:::

以上多种传参方式可以同时放在一起使用。


## 数据结构复用

对于在多个接口中重复出现的数据，可以定义一个复用的数据结构。所有复用的数据结构都在 `# Data Structures` 下定义。

```markdown

# Data Structures

## NoteData
  + id: 1 (required, number) - Unique identifier
  + title: Grocery list (required) - Single line description
  + body: Buy milk - Full description of the note which supports Markdown.
  
```

在接口中使用：
 
 ```markdown

### 获取笔记 [GET /notes]

+ Response 200 (application/json)
    + Attributes
        + data (array[NoteData])
```
 

## 引用外部文件

可以通过`include`语法引入外部文件，例如：引入数据文件作为接口的响应数据。

::: warning
注意：使用时将下列的`@` 改为 `!`
:::

```markdown

+ Response 200 (application/json;charset=utf-8)
  <@-- include(data.json5) -->

```



## 文档编写建议

:::note

- 传参使用`camelCase`, 跟js中的变量书写保持一致，方便直接赋值、传参。

- 一个接口可以定义多个 `Response`，因请求传参不同而要返回不同格式数据时，可以定义多个 `Response`。

- 常用接口命名方式：
    - 单数和复数: 如 `/cards/{cardId}`
    - 增删改查：由于后端不能根据请求方法来区分同一地址的请求，所以要使用额外字段来区分。
        - 增：如`[POST] /cards/{cardId}/add`
        - 删：如`[DELETE] /cards/{cardId}/delete`
        - 改：如`[PUT] /cards/{cardId}/edit`
        - 查：如`[GET] /cards/{cardId}`

:::     


**阅读更多**
- [API Blueprint Examples](https://github.com/apiaryio/api-blueprint/tree/master/examples)
- [Advanced API Blueprint Tutorial](https://github.com/apiaryio/api-blueprint/blob/master/Advanced%20Tutorial.md)
- [apiblueprint.org](https://apiblueprint.org)


# Group Markdown语法

## 标题

```markdown
# 一级标题，对应 <H1/>
## 二级标题，对应 <H2/>
### 三级标题，对应 <H3/>
#### 四级标题，对应 <H4/>
##### 五级标题，对应 <H5/>
###### 六级标题，对应 <H6/>

```

## 加粗/斜体/删除线

```markdown
**加粗**, __加粗__, *斜体*, _斜体_, ~~删除线~~

```
**加粗**, __加粗__, *斜体*, _斜体_, ~~删除线~~


## 列表

```markdown
1. 有序列表前面是数字
* 无序列表可以用星号
- 无序列表可以用减号
+ 无序列表可以用加号
  + 二级列表，语法同上
    + 三级列表，语法同上
```

1. 有序列表前面是数字
* 无序列表可以用星号
- 无序列表可以用减号
+ 无序列表可以用加号
  + 二级列表，语法同上
    + 三级列表，语法同上

## 链接

```markdown
[谷歌](https://www.google.com)

```
[谷歌](https://www.google.com)


## 图片

```markdown
![示例图片](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)
```
![示例图片](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)


## 代码高亮

支持的代码有：`javascript`, `http`, `markdown`, `css`, `html`, `python` 等等很多种。

代码块高亮：

````markdown
  ```javascript
  var s = "JavaScript syntax highlighting";
  alert(s);
  ```
````

```javascript
  var s = "JavaScript syntax highlighting";
  alert(s);
```

行内高亮：`行内高亮`

```markdown
行内高亮：`行内高亮`

```


## 表格

```markdown

| 标题一      | 标题二 | 标题二  |
| ---------- |:-----:| -----:|
| 内容一      | 内容二 | 内容三 |
| 内容一      | 内容二 | 内容三 |
| 内容一      | 内容二 | 内容三 |
```

| 标题一      | 标题二 | 标题二  |
| ---------- |:-----:| -----:|
| 内容一      | 内容二 | 内容三 |
| 内容一      | 内容二 | 内容三 |
| 内容一      | 内容二 | 内容三 |


## 引用

```markdown
> 这是引用的文字

```

> 这是引用的文字


## html

可以使用html标签

```markdown
<dl>
  <dt>标签一</dt>
  <dd>内容一</dd>

  <dt>标签二</dt>
  <dd>内容二</dd>
</dl>
```
<dl>
  <dt>标签一</dt>
  <dd>内容一</dd>

  <dt>标签二</dt>
  <dd>内容二</dd>
</dl>


## 分割线

使用`---` 或者 `***`

---


## 提示

```markdown
::: note

提示文本提示文本提示文本提示文本提示文本提示文本

:::

```

::: note

提示文本提示文本提示文本提示文本提示文本提示文本

:::


## 警告

```markdown
::: warning

警告文本警告文本警告文本警告文本警告文本警告文本

:::


```

::: warning

警告文本警告文本警告文本警告文本警告文本警告文本

:::


## 多选框

```markdown

[x] 选中的多选框
[ ] 未选中的多选框

```

[x] 选中的多选框

[ ] 未选中的多选框


## 引入外部文件

::: warning
注意：使用将下列的`@` 改为 `!`
:::

```markdown

<@-- include(example-include.md) -->

```

## Emoji

```markdown
:smile: :ship: :cake:

```

:smile: :ship: :cake:


[Emoji cheat sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
