import {
    ShellAppLayout
} from './layout.js';
import {
    ShellAppColors
} from './color.js';

export const MAX_VH_512PX = 512;
export const MAX_VH_768PX = 768;
export const MAX_VH_1200PX = 1200;
export const MAX_VH_1800PX = 1800;
export const MAX_VH_MAXPX = 1801;

export const ShellAppTheme = `
${ShellAppLayout}

${ShellAppColors}
`;



export const loadViewportStyles = (event) => {
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let lw = MAX_VH_512PX + "px";
    if (w > MAX_VH_512PX && w <= MAX_VH_768PX) lw = MAX_VH_768PX + "px";
    if (w > MAX_VH_768PX && w <= MAX_VH_1200PX) lw = MAX_VH_1200PX + "px";
    if (w > MAX_VH_1200PX && w <= MAX_VH_1800PX) lw = MAX_VH_1800PX + "px";
    if (w > MAX_VH_1800PX) lw = "maxPx";

    if (null === document.getElementById(lw)) {
        let link = document.createElement('link');
        link.id = lw;
        link.rel = 'stylesheet';
        link.href = '/design/' + lw + '.css';
        document.head.appendChild(link);
    }
};
window.onresize = loadViewportStyles;
let customstyle = document.createElement("custom-style");
let style = document.createElement("style");
style.is = "custom-style";
style.styleSheet = { cssText: `html { ${ShellAppTheme} }`};
customstyle.appendChild(style);
document.head.appendChild(customstyle);
