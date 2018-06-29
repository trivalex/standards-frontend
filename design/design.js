import '@webcomponents/shadycss/entrypoints/apply-shim.js';

import {
    KeyframesCSS
} from './keyframes';
import {
    ColorsCSS
} from "./color";
import {
    LayoutCSS
} from "./layout";
import {
    FontsCSS
} from './fonts';
import {
    GridCSS
} from './grid';
import {
    ZIndexCSS
} from './z-Index';
export const ThemeCSS = `
${ColorsCSS}
${LayoutCSS}
${GridCSS}
${FontsCSS}
${ZIndexCSS}
${KeyframesCSS}
`;
window.dynamicStyleSpace[0] = `html { 
    ${ThemeCSS}
}`;
window.renderCss = () => {
    return window.dynamicStyleSpace.join('\n');
};
window.dynamicStyleTag.innerHTML = window.dynamicStyleSpace.join();
export const loadViewportStyles = (event) => {
    clearTimeout(window.loadViewportStylesQueue);
    window.loadViewportStylesQueue = setTimeout(() => {
        let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        let lw = "512max-px";
        if (w > 512 && w <= 768) lw = "513min-px";
        if (w > 768 && w <= 1200) lw = "769min-px";
        if (w > 1200 && w <= 1800) lw = "1201min-px";
        if (w > 1800) lw = "1801min-px";
        /* jshint ignore:start */
        import(`../../design/responsive/${lw}.js`).then(() => {});
        /* jshint ignore:end */
    }, 10);
};
window.onresize = loadViewportStyles;
window.onresize();
