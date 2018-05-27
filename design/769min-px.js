window.dynamicStyleSpace[3] = `
@media (min-width: 769px) and (max-width: 1200px) {
    html {
        --test-color-a: yellow;
        --icon-button-size: calc(var(--icon-size) + var(--gutter-default));
        --header-height: calc(var(--gutter-default) * 6);
        --content-max-width: var(--viewport-medium);
        --notification-min-width: 400px;
        --notification-width: 100%;
        --notification-max-width: 400px;
        --small-card-size: 160px;
        --medium-card-size: calc(320px + var(--gutter-double));
        --large-card-size: calc(640px + var(--gutter-double) + var(--gutter-double));
    }
}
`;
window.dynamicStyleTag.innerHTML = window.renderCss();