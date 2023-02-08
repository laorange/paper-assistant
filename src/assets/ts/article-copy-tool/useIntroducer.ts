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
    function introduceBySteps(steps: IntroStep[], options?: Object) {
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
            ...(options ?? {}),
        }).start();
    }

    function introduce(pioneerSteps: IntroStep[] = [], tailSteps: IntroStep[] = []) {
        let steps: IntroStep[] = [];

        if (document.body.clientWidth > 500) {
            steps.push({
                title: "提示",
                intro: `如果您正在使用电脑💻<br/>可以使用方向键 → 跳转到下一步`,
            });
        }

        steps = steps.concat([
            {
                element: document.querySelector(".text-handler-config"),
                title: "功能设置",
                intro: `按需启用功能。目前您可以选择:<p>${Object.values(textHandlers).map((h, i) => `${i + 1}. ` + h.description).join("<br/>")}</p>`,
            },
            {
                element: document.querySelector(".theme-config-button"),
                title: "变更主题",
                intro: "切换网页主题为深色或浅色",
            },
            {
                element: document.querySelector(".show-update-log-button"),
                title: "更新日志",
                intro: "查看本网站的版本迭代过程",
            },
            {
                element: document.querySelector(".clear-input-when-leave-switch"),
                title: `自动清空输入`,
                intro: `（若启用该项）当离开本网页时，输入框中的内容将会被自动清空，以便返回时重新输入新内容`,
            },
            {
                element: document.querySelector(".copy-output-when-leave-switch"),
                title: `自动复制输出`,
                intro: `（若启用该项）当离开本网页时，输出框中的内容将会被自动复制，以便在别处使用`,
            },
            {
                element: document.querySelector(".auto-output-switch"),
                title: `实时输出`,
                intro: `若启用该项，每当修改输入框中的内容时，均会实时输出；若关闭该项，仅会在手动点击输出按钮时输出文本`,
            },
            {
                element: document.querySelector(".horizontal-layout-switch"),
                title: `布局方式`,
                intro: `调整"输入框"与"输出框"之间的位置关系为水平/竖直`,
            },
            {
                element: document.querySelector(".input-area"),
                title: "输入框",
                intro: `请在这里输入内容，程序将根据<strong>功能设置</strong>进行文本处理。<hr/>如果您使用电脑访问，在输入英文时，将为您检查语法✍`,
            },
        ]);

        let outputArea = document.querySelector(".output-area");
        let outputIntro = {
            element: outputArea,
            title: "输出框",
            intro: outputArea ? "在这里输出处理结果" : "待您输入文本后，将会出现输出框",
        };
        steps.push(outputIntro);

        steps = pioneerSteps.concat(steps);
        steps = steps.concat(tailSteps);

        introduceBySteps(steps);
    }

    function introduceTextHandler() {
        let textHandlerDrawer = document.querySelector(".text-handler-drawer-content") as HTMLElement | undefined;

        let steps: IntroStep[] = [
            {
                element: textHandlerDrawer?.querySelector(".text-handler-card"),
                title: "功能卡片",
                intro: `点击卡片可开启/关闭该功能<br/>拖拽卡片可控制功能的执行顺序（从上至下依次执行）`,
            },
            {
                element: textHandlerDrawer?.querySelector(".to-default-button"),
                title: "恢复为默认值",
                intro: `点击该按钮可将所有功能的状态、执行顺序重置为默认值`,
            },
            {
                element: textHandlerDrawer?.querySelector(".turn-off-button"),
                title: "全部关闭",
                intro: `点击该按钮可一键禁用所有功能`,
            },
            {
                element: textHandlerDrawer?.querySelector(".finish-config-button"),
                title: "完成设置",
                intro: `当完成设置后，可点击该按钮快速退出当前的功能设置窗口`,
            },
        ];

        introduceBySteps(steps);
    }

    function introduceSelectionReplace() {
        let steps: IntroStep[] = [
            {
                element: document.querySelector(".add-selection-replace-button"),
                title: "文本替换",
                intro: `在文本框中划词时，可触发文本替换功能。您可以指定替换目标文本。在点击"启用"后，输入框中所有相同的本文均会被替换。<hr/>该功能设计初衷是为了快速删除PDF复制文本时出现的乱码。`,
            },
        ];

        introduceBySteps(steps, {showBullets: false});
    }

    return {introduce, introduceTextHandler, introduceSelectionReplace};
};
