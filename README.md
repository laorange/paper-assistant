# 论文助手

> paper-assistant

## 在线使用

[GitHub平台](https://laorange.github.io/paper-assistant/) | [国内镜像站(Gitee)](https://laorange.gitee.io/paper-assistant)

## 功能

### (1) 文本复制工具

在复制PDF中的文字时，有时会出现莫名其妙的空格、换行。例如：

```
碳纤维复合材料在拉伸损 伤 试 验 中，会产生大量的声发射
信号。 对 声 发 射 信 号 的 数据 进 行 了 分 析 ，找
出了碳纤维复合材料的损伤演变规律。 对 数 据 进 行 聚类
分 析 ，将 数 据 分 成 由 类 似 对 象 组 成 的 多 个
簇 ，找出簇与损伤之间的对应关系。 通过对聚类后数据 进行
建模，得 到 碳 纤 维 复 合 材 料 拉 伸 损伤识别模 型。 
I want to modify           these      :
全角字符:ａｂｃ ｄｅｆｇ ０１２３４５６７８９；
半角字符：abc defg 012345     67   89            。
```

如果手动删改，工作量巨大；如果直接全文替换，可能会误删英文单词间的空格。

因此，可以使用本程序，文本将自动转换为：

```
碳纤维复合材料在拉伸损伤试验中，会产生大量的声发射信号。对声发射信号的数据进行了分析，找出了碳纤维复合材料的损伤演变规律。对数据进行聚类分析，将数据分成由类似对象组成的多个簇，找出簇与损伤之间的对应关系。通过对聚类后数据进行建模，得到碳纤维复合材料拉伸损伤识别模型。I want to modify these :全角字符:abc defg 0123456789；半角字符：abc defg 0123456789。
```

目前有以下可选功能：

1. 全角字符转半角字符
2. 删除重复的换行符
3. 将换行符替换为空格 
4. 删除重复的空格 
5. 删除非英文字母间的空格 
6. 保留英文句末符号后的空格 

### (2) 英文语法检查

如果您:

1. 输入的是英文
2. 使用电脑访问

将检测输入文字的语法错误(基于[Grammarly](https://developer.grammarly.com/))

## 致开发者

😉为方便看代码的朋友，我把文本处理的方法都单独整理成了一个[文件](https://github.com/laorange/paper-assistant/blob/master/src/assets/ts/article-copy-tool/handlers.ts)，并写了注释、规范了接口：

```typescript
// handlers.ts
interface TextHandlers {
    [handlerName: string]: {
        activate: boolean,  // 默认是否启用
        description: string,  // 对该功能的描述
        executor: (text: string) => string  // 功能函数
    };
}
```

如您有好的想法，可以在以上内容的基础上修改，欢迎在GitHub仓库上发起 `pull request`😊

