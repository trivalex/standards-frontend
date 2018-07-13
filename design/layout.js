export const LayoutCSS = `
    --viewport-xsmall: 320px;
    --viewport-small: 512px;
    --viewport-medium: 768px;
    --viewport-large: 1200px;
    --viewport-xlarge: 1800px;
    --gutter-half: 8px;
    --gutter-default: 16px;
    --gutter-double: 32px;
    --content-margin: var(--gutter-default);
    --content-padding: var(--gutter-default);
    --content-left: calc(50% - ((var(--content-max-width) / 2) + (var(--content-margin) * 2)));
    --gallery-collumns: 1fr 1fr 1fr 1fr 1fr;
    --notification-min-height: 48px;
    --notification-height: 48px;
    --notification-max-height: 48px;
    --icon-size: 40px;
    --indent-one: 16px;
    --indent-two: 42px;
    --indent-three: 56px;
    --framed-icon-size: calc(var(--icon-size) + var(--gutter-default));
    --standard-header-height:  calc(var(--framed-icon-size) + (var(--gutter-default) * 2));
    --standard-page-top: calc(var(--standard-header-height) + var(--content-margin));
    --standard-drawer-width: calc((var(--framed-icon-size) * 5) + (var(--gutter-default) * 6));
    --standard-drawer-content-width: calc(var(--standard-drawer-width) - var(--gutter-default));
    --drawer-card-size: calc((var(--standard-drawer-content-width) - var(--gutter-default) * 3) / 3);
`;