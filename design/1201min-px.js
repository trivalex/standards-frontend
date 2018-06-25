window.dynamicStyleSpace[4] = `
@media (min-width: 1201px) {
    html {
        --icon-button-size: calc(var(--icon-size) + var(--gutter-default));
        --content-max-width: var(--viewport-medium);
        --notification-min-width: 400px;
        --notification-width: 100%;
        --notification-max-width: 400px;
        --small-card-size: 160px;
        --medium-card-size: calc(320px + var(--gutter-double));
        --large-card-size: calc(640px + var(--gutter-double) + var(--gutter-double));
        --content-left: calc(50% - ((var(--content-max-width) / 2) + (var(--content-margin) * 2)));
    }
}
@media (min-width: 1521px) and (max-width: 1800px) {
    html {
        --content-max-width: var(--viewport-large);
    }
}
`;
window.dynamicStyleTag.innerHTML = window.renderCss();