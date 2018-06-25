window.dynamicStyleSpace[1] = `
@media (max-width: 512px) {
    html {
        --icon-button-size: calc(var(--icon-size) + var(--gutter-default));
        --content-max-width: var(--viewport-xsmall);
        --content-margin: 0px;
        --notification-min-width: 100%;
        --notification-width: 100%;
        --notification-max-width: 100%;
        --icon-size: 24px;
        --small-card-size: 100px;
        --medium-card-size: calc(200px + var(--gutter-double));
        --large-card-size: calc(300px + var(--gutter-double) + var(--gutter-double));
        --content-left: 0px;
        --standard-drawer-content-width: calc(var(--standard-drawer-width) - var(--gutter-default));
    }
}
@media (min-width: 1px) and (max-width: 512px) {
    html {
        --viewport-xsmall: 100vw;
    }
}
@media (min-width: 1px) and (max-width: 216px) {
    html {
        --standard-drawer-width: var(--viewport-xsmall);
        --standard-drawer-content-width: calc(var(--standard-drawer-width) - var(--gutter-default));
    }
}
`;
window.dynamicStyleTag.innerHTML = window.renderCss();