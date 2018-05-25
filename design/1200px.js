window.dynamicstyle.innerHTML = window.dynamicstyle.innerHTML+`
@media (min-width: 769px) {
    html {
        --bit-color: blue;
        --icon-button-size: calc(var(--icon-size) + var(--gutter-default));
        --header-height: calc(var(--gutter-default) * 6);
        --content-max-width: var(--viewport-large);
        --notification-min-width: 400px;
        --notification-width: 100%;
        --notification-max-width: 400px;
        --small-card-size: 160px;
        --medium-card-size: calc(320px + var(--gutter-double));
        --large-card-size: calc(640px + var(--gutter-double) + var(--gutter-double));
    }
}
`;