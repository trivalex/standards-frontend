window.dynamicstyle.innerHTML = window.dynamicstyle.innerHTML+`@media (min-width: 513px) {
    html {
        --bit-color: var(--blue);
        --icon-button-size: calc(var(--icon-size) + var(--gutter-default));
        --header-height: calc(var(--gutter-default) * 4);
        --content-max-width: var(--viewport-small);
        --notification-min-width: 100%;
        --notification-width: 100%;
        --notification-max-width: 100%;
        --small-card-size: 128px;
        --medium-card-size: calc(256px + var(--gutter-double));
        --large-card-size: calc(640px + var(--gutter-double) + var(--gutter-double));
    }
}
`;