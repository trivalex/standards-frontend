import '@webcomponents/shadycss/entrypoints/apply-shim.js';
import { ShellAppColors } from "./color";
import { ShellAppLayout } from "./layout";
export const centerHorizontal = (width) => {
    return ((Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2) - width / 2);
};
export const centerVertical = (height) => {
    return ((Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2) - height / 2);
};
export const ShellAppTheme = `${ShellAppColors}
${ShellAppLayout}`;
window.renderCss = () => {
    return window.dynamicStyleSpace.join('\n');
};
window.dynamicStyleSpace[0] = `html { 
    ${ShellAppTheme}
}`;
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
        import(`../../design/${lw}.js`).then(() => {});
        /* jshint ignore:end */
    }, 10);
};
window.onresize = loadViewportStyles;
window.onresize();