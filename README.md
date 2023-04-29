<h1 align="center">📝论文工具</h1>

<p align="center">
  <a href="https://laorange.github.io/paper-assistant/" target="_blank">在线使用(GitHub)</a>
  |
  <a href="https://laorange.gitee.io/paper-assistant" target="_blank">在线使用(Gitee)</a>
  |
  <a href="https://www.bilibili.com/video/BV1ZG4y1N7oM/" target="_blank">视频介绍</a>
  |
  <a href="/src/assets/UpdatedLogs.md" target="_blank">更新日志</a>
  |
  <a href="http://qny.quoi.top/img/sponsor-qr.jpg" target="_blank">鼓励作者</a>
</p>

## 功能

#### (1) 文本复制工具

😣在复制PDF中的文字时，有时会出现莫名其妙的空格、换行、全角字符或乱码。

😫如果手动删改，工作量巨大；如果直接全文替换，可能会误删英文单词间的空格。

💡开发这个项目正是为了解决这些问题。

🚩如何使用？可直接[在线使用](https://laorange.gitee.io/paper-assistant)后点击"使用说明"，或前往B站查看[视频介绍](https://www.bilibili.com/video/BV1ZG4y1N7oM/)。

#### (2) 英文语法检查

✍如果您在电脑上在线使用，在输入英文时，将为您检查语法 (基于[Grammarly](https://developer.grammarly.com/))。

## Q&A

#### 为什么不直接查找替换？

出现的若是空格的话，直接替换会误删英文单词中的空格；因此需要用到正则表达式来替换，有较高门槛。

#### 仅粘贴文本，复制到文本文档/记事本？

仅粘贴文本、复制到记事本是**去除格式**，但并不能去除空行空格乱码这样的干扰内容，因为这些是"内容"而不是"格式"。

#### 复制到浏览器地址栏？

浏览器地址栏本质上是一个**单行无格式输入框**，确实可以去除换行符，但并不能处理空格、乱码和全角字符。

#### 为什么不推荐使用OCR？

有条件复制粘贴的话还是不太建议用OCR，识别不准确的话会产生新的麻烦。

#### 未来考虑加入翻译功能吗？

不考虑。若需PDF翻译功能，建议使用[知云文献](http://www.zhiyunwenxian.cn/)。

#### 空行空格乱码等痛点是在哪些软件出现的？

空行素材来自**Acrobat**，空格素材来自**Zotero**，乱码素材来源于**CAJViewer**，全角字符素材来自**知云文献**，重复换行素材来源于**Typora**。

#### 还有哪些具有相似功能的程序？

1. 若使用quicker，可搜索安装**英文规范粘贴**和**中文规范粘贴**插件。
2. **copy++**：[项目地址](https://github.com/CopyPlusPlus/CopyPlusPlus) | [官方网站](https://copyplusplus.tk/)

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

😄若您有好的想法，可以在以上内容的基础上修改。欢迎在GitHub仓库上发起 [`pull request`](https://github.com/laorange/paper-assistant/pulls)😊

🥳若您觉得本项目还不错，可以在页面右上角为本项目点上一颗⭐~

<div align="center"><img src="https://api.star-history.com/svg?repos=laorange/paper-assistant&type=Date" alt="Star History Chart" /></div>
