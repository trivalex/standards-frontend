export const ShellAppLayout = `
    --viewport-xsmall: 320px;
    --viewport-small: 512px;
    --viewport-medium: 768px;
    --viewport-large: 1200px;
    --viewport-xlarge: 1800px;
    --content-margin: var(--gutter-default);
    --content-padding: var(--gutter-default);
    --notification-min-height: 48px;
    --notification-height: 48px;
    --notification-max-height: 48px;
    --icon-size: 40px;
    --gutter-half: 8px;
    --gutter-default: 16px;
    --gutter-double: 32px;
    --indent-one: 16px;
    --indent-two: 42px;
    --indent-three: 56px;
    --bit-size: calc(var(--small-card-size) / 4);
    @-moz-keyframes presentpage { 100% {  transition: top 0.5s ease-out; left: calc(50% - (var(--content-max-width) / 2)); transition: top left 1s ease-out; } }
    @-webkit-keyframes presentpage { 100% {  transition: top 0.5s ease-out; left: calc(50% - (var(--content-max-width) / 2)); transition: top left 1s ease-out; } }
    @keyframes presentpage { 100% {  transition: top 0.5s ease-out; left: calc(50% - (var(--content-max-width) / 2)); transition: top left 1s ease-out; } }

    /* cyrillic-ext */
    @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
    }
    /* cyrillic */
    @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
    }
    /* vietnamese */
    @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
    }
    /* latin-ext */
    @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    /* latin */
    @font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: local('Montserrat Regular'), local('Montserrat-Regular'), url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

`;