<h1 align="center">论文工具</h1>

<p align="center">
  <a href="https://laorange.github.io/paper-assistant/">在线使用(GitHub)</a>
  |
  <a href="https://laorange.gitee.io/paper-assistant">在线使用(Gitee)</a>
  |
  <a href="https://www.bilibili.com/video/BV1ZG4y1N7oM/">视频介绍</a>
  |
  <a href="/src/assets/UpdatedLogs.md">更新日志</a>
</p>

## 功能

### (1) 文本复制工具

在复制PDF中的文字时，有时会出现莫名其妙的空格、换行、全角字符。

如果手动删改，工作量巨大；如果直接全文替换，可能会误删英文单词间的空格。

因此，可以使用本程序去除空行空格。详细文档请在[网页](https://laorange.gitee.io/paper-assistant)中点击"使用说明"。

### (2) 英文语法检查

如果您在电脑上在线使用，在输入英文时，将为您检查语法✍ (基于[Grammarly](https://developer.grammarly.com/))。

## 致开发者

😉为方便看代码的朋友，我把文本处理的方法都单独整理成了[一个文件](https://github.com/laorange/paper-assistant/blob/master/src/assets/ts/article-copy-tool/handlers.ts)，并写了注释、规范了接口：

```typescript
// handlers.ts
export interface TextHandler {
    activate: boolean,  // 默认是否启用
    description: string,  // 对该功能的描述
    executor: (text: string) => string  // 功能函数
}
```

如您有好的想法，可以在以上内容的基础上修改，欢迎在GitHub仓库上发起 [`pull request`](https://github.com/laorange/paper-assistant/pulls)😊
