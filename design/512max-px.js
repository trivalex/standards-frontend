window.dynamicStyleSpace[1] = `
@media (max-width: 512px) {
    html {
        --icon-button-size: calc(var(--icon-size) + var(--gutter-default));
        --content-max-width: var(--viewport-xsmall);
        --content-margin: 0px;
        --content-padding: 8px;
        --notification-min-width: 100%;
        --notification-width: 100%;
        --notification-max-width: 100%;
        --icon-size: 24px;
        --small-card-size: 100px;
        --medium-card-size: calc(200px + var(--gutter-double));
        --large-card-size: calc(300px + var(--gutter-double) + var(--gutter-double));
        --content-left: 0px;
        --app-drawer-content-width: calc(var(--app-drawer-width) - var(--gutter-default));
    }
}
@media (min-width: 1px) and (max-width: 512px) {
    html {
        --viewport-xsmall: 100vw;
    }
}
@media (min-width: 1px) and (max-width: 216px) {
    html {
        --app-drawer-width: var(--viewport-xsmall);
        --app-drawer-content-width: calc(var(--app-drawer-width) - var(--gutter-default));
    }
}
`;
window.dynamicStyleTag.innerHTML = window.renderCss();