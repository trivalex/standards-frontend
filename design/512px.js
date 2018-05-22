window.dynamicCSS = window.dynamicCSS + `
@media (max-width: 512px) {
    html {
        --icon-button-size: calc(var(--icon-size) + var(--gutter-default));
        --header-height: calc(var(--gutter-default) * 4);
        --content-max-width: var(--viewport-xsmall);
        --notification-min-width: 100%;
        --notification-width: 100%;
        --notification-max-width: 100%;
        --small-card-size: 100px;
        --medium-card-size: calc(200px + var(--gutter-double));
        --large-card-size: calc(300px + var(--gutter-double) + var(--gutter-double));
        --content-margin: 0px;
        --content-padding: 0px;
        --viewport-xsmall: 100vw;
    }
}
`;