export interface TextHandlers {
    [handlerName: string]: {
        activate: boolean,  // 默认是否启用
        description: string,  // 对该功能的描述
        executor: (text: string) => string  // 功能函数
    };
}

export const textHandlers: TextHandlers = {
    /** 全角转半角, 参考：
     * 1. https://www.cnblogs.com/html55/p/10298569.html
     * 2. https://unicode-table.com/cn/search/?q=%E5%85%A8%E5%BD%A2%E6%95%B0%E5%AD%97 */
    convertFullWidthCharactersToHalfWidth: {
        activate: true,
        description: "全角转半角",
        executor: (text: string) => {
            let result = "";
            for (let i = 0; i < text.length; i++) {
                let char = text.charCodeAt(i);
                // 中文空格替换为英文空格
                if (char == 12288) {
                    result += String.fromCharCode(char - 12256);
                    continue;
                }
                if (char > 65280 && char < 65375
                    // 对，：；·！#￥%…这样的全角字符不做转换
                    && [..."，：；·！#￥%…"].indexOf(text[i]) === -1) {
                    console.log([..."，：；·！#￥%…"].indexOf(text[i]));
                    result += String.fromCharCode(char - 65248);
                } else result += String.fromCharCode(text.charCodeAt(i));
            }
            return result;
        },
    },
    /** 替换换行符为空格 (参考：https://blog.csdn.net/lfod1997/article/details/121095287) */
    replaceNewlinesWithSpaces: {
        activate: true,
        description: "将换行符替换为空格",
        executor: (text: string) => text.replace(/\r?\n|(?<!\n)\r/, " "),
    },
    replaceMultipleSpacesWithASingleSpace: {
        activate: true,
        description: "多个空格或换行符替换为空格",
        executor: (text: string) => text.replace(/\s+/g, " "),
    },
    removeSpacesBetweenNonEnglishLetters: {
        activate: true,
        description: "删除非英文字母间的空格",
        executor: (text: string) => text
            .replace(/([^A-Za-z"':])\s/g, "$1")
            .replace(/\s([^A-Za-z"':])/g, "$1"),
    },
};
