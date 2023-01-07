# 论文助手

▶️视频介绍：[[论文工具] PDF复制-智能删除空格空行](https://www.bilibili.com/video/BV1T24y1X78w/)

## 在线使用

[GitHub Page](https://laorange.github.io/paper-assistant/)	或	[国内镜像站(Gitee Page)](https://laorange.gitee.io/paper-assistant)

## 功能

### (1) 文本复制工具

在复制PDF中的文字时，有时会出现莫名其妙的空格、换行。

如果手动删改，工作量巨大；如果直接全文替换，可能会误删英文单词间的空格。

因此，可以使用本程序，目前有以下可选功能：

1. 将英文标点转换为中文标点
2. 将中文标点转换为英文标点
3. 全角字符转半角字符
4. 删除重复的换行符
5. 将换行符替换为空格
6. 删除重复的空格
7. 删除非英文字母间的空格
8. 在字母与数字之间添加空格
9. 在标点符号后添加空格
10. 删除小数点和数字之间的空格
11. 删除冒号和数字之间的空格

### (2) 英文语法检查

如果①输入的是英文 ②使用电脑访问，将自动检测输入文字的语法错误（基于[Grammarly](https://developer.grammarly.com/)）

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

如您有好的想法，可以在以上内容的基础上修改，欢迎在GitHub仓库上发起 `pull request`😊

