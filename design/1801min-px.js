window.dynamicStyleSpace[5] = `
@media (min-width: 1801px) {
    html {
        --icon-button-size: calc(var(--icon-size) + var(--gutter-default));
        --header-height: calc(var(--gutter-default) * 8);
        --content-max-width: var(--viewport-large);
        --notification-min-width: 400px;
        --notification-width: 100%;
        --notification-max-width: 400px;
        --small-card-size: 160px;
        --medium-card-size: calc(320px + var(--gutter-double));
        --large-card-size: calc(640px + var(--gutter-double) + var(--gutter-double));
        --content-left: calc(50% - ((var(--content-max-width) / 2) + (var(--content-margin) * 2)));
    }
}
`;
window.dynamicStyleTag.innerHTML = window.renderCss();