// @ts-ignore
import pangu from "pangu";
import {Converter} from "opencc-js";

export interface TextHandler {
  activate: boolean,  // 默认是否启用
  description: string,  // 对该功能的描述
  executor: (text: string) => string  // 功能函数
}

export interface TextHandlers {
  [handlerName: string]: TextHandler;
}

export interface TextHandlerWithName extends TextHandler {
  handlerName: string;
}

export type ReplaceTuple = [RegExp | string, string]

export const textHandlers: TextHandlers = {
  transferEnglishPunctuationToChinese: {
    activate: false,
    description: "将英文标点转换为中文标点",
    executor: text => {
      const punctuationTuples: ReplaceTuple[] = [
        [/'([\s\S]+?)'/g, "‘$1’"],
        [/"([\s\S]+?)"/g, "“$1”"],
        [",", "，"],
        [/\.(\D)/g, "。$1"],  /** `\D`:避免是小数点 */
        [":", "："],
        [";", "；"],
        ["[", "【"],
        ["]", "】"],
        ["?", "？"],
        ["(", "（"],
        [")", "）"],
        ["!", "！"],
      ];
      return punctuationTuples.reduce((t, tuple) => t.replaceAll(tuple[0], tuple[1]), text);
    },
  },

  transferChinesePunctuationToEnglish: {
    activate: false,
    description: "将中文标点转换为英文标点",
    executor: text => {
      const punctuationTuples: ReplaceTuple[] = [
        [/[‘’]/g, "'"],
        [/[“”]/g, "\""],
        ["，", ","],
        ["。", "."],
        ["：", ":"],
        ["；", ";"],
        ["【", "["],
        ["】", "]"],
        ["？", "?"],
        ["（", "("],
        ["）", ")"],
        ["！", "!"],
      ];
      return punctuationTuples.reduce((t, tuple) => t.replaceAll(tuple[0], tuple[1]), text);
    },
  },

  deleteReferenceCurveBadge: {
    description: "删除引用角标，如: (1), (2, 3), (4-7)",
    activate: false,
    executor: text => text.replaceAll(/\([\d,\-\s]+\)/g, ""),
  },

  deleteReferenceBadge: {
    description: "删除引用角标，如: [1], [2, 3], [4-7]",
    activate: true,
    executor: text => {
      text = text.replaceAll(/\[[\d,\-\s]+]/g, "");
      text = text.replaceAll(/【[\d,\-\s]+】/g, "");
      return text;
    },
  },

  /** 全角转半角, 参考：
   * 1. https://www.cnblogs.com/html55/p/10298569.html
   * 2. https://unicode-table.com/cn/search/?q=%E5%85%A8%E5%BD%A2%E6%95%B0%E5%AD%97 */
  convertFullWidthCharactersToHalfWidth: {
    activate: true,
    description: "全角字符转半角字符",
    executor: (text: string) => {
      let result = "";
      for (let i = 0; i < text.length; i++) {
        let char = text.charCodeAt(i);
        // 中文空格替换为英文空格
        if (char == 12288) {
          result += " ";
        } else if (char > 65280 && char < 65375
          // 对以下全角字符不做转换
          && [..."，：；·！#￥%…（）"].indexOf(text[i]) === -1) {
          result += String.fromCharCode(char - 65248);
        } else {
          result += String.fromCharCode(text.charCodeAt(i));
        }
      }
      return result;
    },
  },

  deleteMultipleNewlines: {
    activate: true,
    description: "删除重复的换行符",
    executor: (text: string) => text.replaceAll(/[\f\r\t\n]+/g, "\n"),
  },

  /** 替换换行符为空格 (参考：https://blog.csdn.net/lfod1997/article/details/121095287) */
  replaceNewlinesWithSpaces: {
    activate: true,
    description: "将换行符替换为空格",
    executor: (text: string) => text.replaceAll(/[\f\r\t\n]/g, " "),
  },

  replaceMultipleSpacesWithASingleSpace: {
    activate: true,
    description: "删除重复的空格",
    executor: (text: string) => text.replaceAll(/ +/g, " "),
  },

  removeSpacesBetweenNonEnglishLetters: {
    activate: true,
    description: "删除非英文字母间的空格",
    executor: (text: string) => text
      .replaceAll(/([^A-Za-z"':]) +/g, "$1")
      .replaceAll(/ +([^A-Za-z"':])/g, "$1"),
  },

  addSpaceAfterEnglishPunctuation: {
    activate: true,
    description: "在标点符号后添加空格",
    executor: (text: string) => text
      .replaceAll(/([,.?:;])([^,.?:;\s])/g, "$1 $2")
      .replaceAll(/(\))([a-zA-Z\d])/g, "$1 $2"),
  },

  deleteSpaceBetweenDotAndNumber: {
    activate: true,
    description: "删除小数点和数字之间的空格",
    executor: (text: string) => text.replaceAll(/(\.)\s+(\d)/g, "$1$2"),
  },

  addSpacesBetweenEnglishLettersAndNumbers: {
    activate: false,
    description: "在字母与数字之间添加空格",
    executor: (text: string) => text
      .replaceAll(/(\d)([A-Za-z])/g, "$1 $2")
      .replaceAll(/([A-Za-z])(\d)/g, "$1 $2"),
  },

  deleteSpaceBetweenColonAndNumber: {
    activate: false,
    description: "删除冒号和数字之间的空格",
    executor: (text: string) => text.replaceAll(/(:)\s+(\d)/g, "$1$2"),
  },

  addWhiteOfPanGu: {
    description: `规范中文排版 <a href='https://sspai.com/post/37815' target='_blank'>(参考文章)</a>`,
    activate: false,
    executor: (text: string) => pangu.spacing(text),
  },

  switchSimplifiedChineseToTraditionalChinese: {
    description: "将简体中文转换为繁体中文",
    activate: false,
    executor: (text: string) => {
      const converter = Converter({from: "cn", to: "hk"});
      return converter(text);
    },
  },

  switchTraditionalChineseToSimplifiedChinese: {
    description: "将繁体中文转换为简体中文",
    activate: false,
    executor: (text: string) => {
      const converter = Converter({from: "hk", to: "cn"});
      return converter(text);
    },
  },

  correctKangxiRadicals: {
    description: "将康熙部首替换为正常字符",
    activate: false,
    executor: (text: string) => {
      const kangxiMap = {"⼀":"一","⼁":"丨","⼂":"丶","⼃":"丿","⼄":"乙","⼅":"亅","⼆":"二","⼇":"亠","⼈":"人","⼉":"儿","⼊":"入","⼋":"八","⼌":"冂","⼍":"冖","⼎":"冫","⼏":"几","⼐":"凵","⼑":"刀","⼒":"力","⼓":"勹","⼔":"匕","⼕":"匚","⼖":"匸","⼗":"十","⼘":"卜","⼙":"卩","⼚":"厂","⼛":"厶","⼜":"又","⼝":"口","⼞":"囗","⼟":"土","⼠":"士","⼡":"夂","⼢":"夊","⼣":"夕","⼤":"大","⼥":"女","⼦":"子","⼧":"宀","⼨":"寸","⼩":"小","⼪":"尢","⼫":"尸","⼬":"屮","⼭":"山","⼮":"巛","⼯":"工","⼰":"己","⼱":"巾","⼲":"干","⼳":"幺","⼴":"广","⼵":"廴","⼶":"廾","⼷":"弋","⼸":"弓","⼹":"彐","⼺":"彡","⼻":"彳","⼼":"心","⼽":"戈","⼾":"戸","⼿":"手","⽀":"支","⽁":"攴","⽂":"文","⽃":"斗","⽄":"斤","⽅":"方","⽆":"无","⽇":"日","⽈":"曰","⽉":"月","⽊":"木","⽋":"欠","⽌":"止","⽍":"歹","⽎":"殳","⽏":"毋","⽐":"比","⽑":"毛","⽒":"氏","⽓":"气","⽔":"水","⽕":"火","⽖":"爪","⽗":"父","⽘":"爻","⽙":"爿","⽚":"片","⽛":"牙","⽜":"牛","⽝":"犬","⽞":"玄","⽟":"玉","⽠":"瓜","⽡":"瓦","⽢":"甘","⽣":"生","⽤":"用","⽥":"田","⽦":"疋","⽧":"疒","⽨":"癶","⽩":"白","⽪":"皮","⽫":"皿","⽬":"目","⽭":"矛","⽮":"矢","⽯":"石","⽰":"示","⽱":"禸","⽲":"禾","⽳":"穴","⽴":"立","⽵":"竹","⽶":"米","⽷":"糸","⽸":"缶","⽹":"网","⽺":"羊","⽻":"羽","⽼":"老","⽽":"而","⽾":"耒","⽿":"耳","⾀":"聿","⾁":"肉","⾂":"臣","⾃":"自","⾄":"至","⾅":"臼","⾆":"舌","⾇":"舛","⾈":"舟","⾉":"艮","⾊":"色","⾋":"艸","⾌":"虍","⾍":"虫","⾎":"血","⾏":"行","⾐":"衣","⾑":"襾","⾒":"見","⾓":"角","⾔":"言","⾕":"谷","⾖":"豆","⾗":"豕","⾘":"豸","⾙":"貝","⾚":"赤","⾛":"走","⾜":"足","⾝":"身","⾞":"車","⾟":"辛","⾠":"辰","⾡":"辵","⾢":"邑","⾣":"酉","⾤":"釆","⾥":"里","⾦":"金","⾧":"長","⾨":"門","⾩":"阜","⾪":"隶","⾫":"隹","⾬":"雨","⾭":"靑","⾮":"非","⾯":"面","⾰":"革","⾱":"韋","⾲":"韭","⾳":"音","⾴":"頁","⾵":"風","⾶":"飛","⾷":"食","⾸":"首","⾹":"香","⾺":"馬","⾻":"骨","⾼":"高","⾽":"髟","⾾":"鬥","⾿":"鬯","⿀":"鬲","⿁":"鬼","⿂":"魚","⿃":"鳥","⿄":"鹵","⿅":"鹿","⿆":"麥","⿇":"麻","⿈":"黃","⿉":"黍","⿊":"黒","⿋":"黹","⿌":"黽","⿍":"鼎","⿎":"鼓","⿏":"鼠","⿐":"鼻","⿑":"齊","⿒":"齒","⿓":"龍","⿔":"龜","⿕":"龠"};
      type Radicals = keyof typeof kangxiMap;
      const regexp = /([\u2f00-\u2fd5])/g
      return text.replace(regexp, (m: string) => {
        return kangxiMap[m as Radicals] || m;
      });
    }
    
  }
};
