window.dynamicStyleSpace[4] = `
@media (min-width: 1201px) {
    html {
        --icon-button-size: calc(var(--icon-size) + var(--gutter-default));
        --content-max-width: var(--viewport-medium);
        --gallery-collumns: 1fr 1fr 1fr 1fr 1fr;
        --notification-min-width: calc(var(--gutter-half) * 50);
        --notification-width: 100%;
        --notification-max-width: calc(var(--gutter-half) * 50);
        --small-card-size: calc(var(--gutter-half) * 20);
        --medium-card-size: calc((var(--gutter-half) * 40) + var(--gutter-double));
        --large-card-size: calc(640px + var(--gutter-double) + var(--gutter-double));
    }
}
@media (min-width: 1521px) and (max-width: 1800px) {
    html {
        --content-max-width: var(--viewport-large);
    }
}
`;
window.dynamicStyleTag.innerHTML = window.renderCss();