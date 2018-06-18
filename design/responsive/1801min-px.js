window.dynamicStyleSpace[5] = `
@media (min-width: 1801px) {
    html {
        --icon-button-size: calc(var(--icon-size) + var(--gutter-default));
        --content-max-width: var(--viewport-large);
        --notification-min-width: calc(var(--gutter-half) * 50);
        --notification-width: 100%;
        --notification-max-width: calc(var(--gutter-half) * 50);
        --small-card-size: calc(var(--gutter-half) * 20);
        --medium-card-size: calc(calc(var(--gutter-half) * 40) + var(--gutter-double));
        --large-card-size: calc(640px + var(--gutter-double) + var(--gutter-double));
    }
}
`;
window.dynamicStyleTag.innerHTML = window.renderCss();