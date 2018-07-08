export const SLIDE_FROM_TOP_FADE = (el, dur, debounce) => {
    return {
        targets: el,
        opacity: [{
            value: 0
        }, {
            value: 1,
            duration: dur,
            delay: debounce
        }],
        top: [{
            value: '-200vh',
            delay: 5
        }, {
            value: 0,
            duration: dur,
            delay: debounce
        }],
        zIndex: [{
            value: 500,
        }, {
            value: 1000,
            delay: debounce
        }],
        easing: 'easeInOutQuart',
        duration: dur
    };
};
export const SLIDE_FROM_BOTTOM_FADE = (el, dur, debounce) => {
    return {
        targets: el,
        opacity: [{
            value: 0
        }, {
            value: 1,
            duration: dur,
            delay: debounce
        }],
        top: [{
            value: '200vh',
            duration: 0,
            delay: 0
        }, {
            value: 0,
            duration: dur,
            delay: dur / 4 + debounce
        }],
        zIndex: [{
            value: 500,
        }, {
            value: 1000,
            delay: debounce
        }],
        easing: 'easeInOutQuart',
        duration: dur
    };
};
export const SLIDE_TOP_FADE = (el, dur, debounce) => {
    return {
        targets: el,
        opacity: [{
            value: 0,
            duration: dur,
            delay: 0
        }],
        top: [{
            value: '-250vh',
            duration: dur
        }],
        zIndex: [{
            value: 1000,
            delay: 5
        }, {
            value: 500,
            delay: debounce
        }],
        display: [{
            value: "block",
        },{
            value: "none",
            delay: dur
        }],
        easing: 'easeInOutQuart',
        duration: dur
    };
};
export const SLIDE_BOTTOM_FADE = (el, dur, debounce) => {
    return {
        targets: el,
        opacity: [{
            value: 0,
            duration: dur,
            delay: 0
        }],
        top: [{
            value: '250vh',
            duration: dur
        }],
        zIndex: [{
            value: 1000,
            delay: 5
        }, {
            value: 500,
            delay: debounce
        }],
        display: [{
            value: "block",
        },{
            value: "none",
            delay: dur
        }],
        easing: 'easeInOutQuart',
        duration: dur
    };
};
export const GROW_FADE = (el, dur, debounce) => {
    return {
        targets: el,
        opacity: 1,
        top: {
            value: "0px",
            duration: dur,
            delay: debounce
        },
        zIndex: 1000,
        easing: 'easeInOutQuart',
        duration: dur
    };
};