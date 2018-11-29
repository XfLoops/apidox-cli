
1. Q: Drafter does not support \r ot \t in the input, the following hack is needed

A:

```js
input.replace(/\r\n?/g, '\n').replace(/\t/g, '    ')
```


2. Q: message-body asset is expected to be a pre-formatted code block, separate it by a newline and indent every of its line by 8 spaces or 2 tabs

A:
被引入的文件要进行有缩进：8个空格，或2个tab








