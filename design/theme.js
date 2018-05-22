// import {
//     ShellAppLayout
// } from './layout.js';
// import {
//     ShellAppColors
// } from './color.js';

export const centerHorizontal = (width) => {
    return ((Math.max(document.documentElement.clientWidth, window.innerWidth || 0) / 2) - width / 2);
};

export const centerVertical = (height) => {
    return ((Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2) - height / 2);
};

export const ShellAppTheme = ``;
// export const ShellAppTheme = `
// ${ShellAppLayout}

// ${ShellAppColors}
// `;
export const loadViewportStyles = (event) => {
    clearTimeout(window.loadViewportStylesQueue);

    window.loadViewportStylesQueue = setTimeout(() => {
        let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        let lw = 512 + "px";
        if (w > 512 && w <= 768) lw = 768 + "px";
        if (w > 768 && w <= 1200) lw = 1200 + "px";
        if (w > 1200 && w <= 1800) lw = 1800 + "px";
        if (w > 1800) lw = "maxPx";
        import(`/design/${lw}.js`).then(() => {});
        
        window.dynamicStyleTag.innerHTML = window.dynamicCSS;
    }, 50);
};
loadViewportStyles();

window.onresize = loadViewportStyles;