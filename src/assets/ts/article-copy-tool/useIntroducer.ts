// @ts-ignore
import introJs from "intro.js";
import {textHandlers} from "./handlers";

interface IntroStep {
    element?: Element | null,
    title?: string,
    intro?: string,
    position?: string
}

export default function useIntroducer() {
    function introduce(pioneerSteps: IntroStep[] = [], tailSteps: IntroStep[] = []) {
        let steps: IntroStep[] = [
            {
                element: document.querySelector(".input-area"),
                title: "输入框",
                intro: `请在这里输入内容，程序将根据<strong>功能设置</strong>进行文本处理。<hr/>此外，如果您:<br/>①输入的是英文<br/>②使用电脑访问<br/>将为您检测语法(基于Grammarly)`,
            },
            {
                element: document.querySelector(".text-handler-config"),
                title: "功能设置",
                intro: `按需启用功能。目前您可以选择:<p>${Object.values(textHandlers).map((h, i) => `${i + 1}. ` + h.description).join("<br/>")}</p>`,
            },
            {
                element: document.querySelector(".show-update-log-button"),
                title: "更新日志",
                intro: "查看本网站的版本迭代过程",
            },
        ];

        let outputArea = document.querySelector(".output-area");
        let outputIntro = {
            element: outputArea,
            title: "输出框",
            intro: outputArea ? "在这里输出处理结果" : "待您输入文本后，将会出现输出框",
        };
        steps.push(outputIntro);

        steps = pioneerSteps.concat(steps);
        steps = steps.concat(tailSteps);

        introJs().setOptions({
            showBullets: true,
            keyboardNavigation: true,
            disableInteraction: true,
            exitOnOverlayClick: true,
            prevLabel: "上一步",
            nextLabel: "下一步",
            doneLabel: "完成",
            autoPosition: true,
            steps,
        }).start();
    }

    return {introduce};
};
