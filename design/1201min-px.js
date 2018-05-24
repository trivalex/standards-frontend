window.dynamicStyleSpace[4] = `
@media (min-width: 1201px) {
    html {
        --test-color-a: green;
        --icon-button-size: calc(var(--icon-size) + var(--gutter-default));
        --header-height: calc(var(--gutter-default) * 8);
        --content-max-width: var(--viewport-medium);
        --notification-min-width: 400px;
        --notification-width: 100%;
        --notification-max-width: 400px;
        --small-card-size: 160px;
        --medium-card-size: calc(320px + var(--gutter-double));
        --large-card-size: calc(640px + var(--gutter-double) + var(--gutter-double));
    }
}
@media (min-width: 1521px) and (max-width: 1800px) {
    html {
        --test-color-a: cyan;
        --content-max-width: var(--viewport-large);
    }
}
`;
window.dynamicStyleTag.innerHTML = window.renderCss();