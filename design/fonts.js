export const ShellAppFonts = `
    --fluid-fontsize-a: calc(2.827em + 8 * ((100vw - 320px) / 960));
    --fluid-fontsize-b: calc(1.999em + 8 * ((100vw - 320px) / 960));
    --fluid-fontsize-c: calc(1em + 8 * ((100vw - 320px) / 960));
    --fluid-fontsize-d: calc(0.707em + 8 * ((100vw - 320px) / 960));
    --fluid-fontsize-e: calc(0.5em + 8 * ((100vw - 320px) / 960));
    --fluid-fontsize-f: calc(0.354em + 8 * ((100vw - 320px) / 960));

    /* cyrillic-ext */
    @font-face {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 400;
        src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
    }
`;