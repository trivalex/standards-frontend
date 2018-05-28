window.dynamicStyleSpace[1] = `
@media (max-width: 512px) {
    html {
        --test-color-a: red;
        --icon-button-size: calc(var(--icon-size) + var(--gutter-default));
        --header-height: calc(var(--gutter-default) * 4);
        --content-max-width: var(--viewport-xsmall);
        --content-margin: 0px;
        --content-padding: 8px;
        --notification-min-width: 100%;
        --notification-width: 100%;
        --notification-max-width: 100%;
        --small-card-size: 100px;
        --medium-card-size: calc(200px + var(--gutter-double));
        --large-card-size: calc(300px + var(--gutter-double) + var(--gutter-double));
        --viewport-xsmall: calc(100vw - var(--content-padding) * 2);
        --content-left: 0px;
    }
}
`;
window.dynamicStyleTag.innerHTML = window.renderCss();