import {
    ShellAppLayout
} from './layout.js';
import {
    ShellAppColors
} from './color.js';

export const ShellAppTheme = `
${ShellAppLayout}

${ShellAppColors}
`;
window.dynamicstyle.innerHTML = window.dynamicstyle.innerHTML+ `html {${ShellAppColors}}`;

export const loadViewportStyles = (event) => {
    clearTimeout(window.loadViewportStylesHandle);
    window.loadViewportStylesHandle = setTimeout(() => {
        let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        let lw = 512 + "px";
        if (w > 512 && w <= 768) lw = 768 + "px";
        if (w > 768 && w <= 1200) lw = 1200 + "px";
        if (w > 1200 && w <= 1800) lw = 1800 + "px";
        if (w > 1800) lw = "maxPx";

        if (null === document.getElementById(lw)) {
            import(`${lw}.js`).then(() => {});
        }
    }, 50);
};
window.onresize = loadViewportStyles;
window.onresize();
