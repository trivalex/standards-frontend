export const SLIDE_FROM_TOP_FADE = (el, dur, debounce) => {
    return {
        targets: el,
        opacity: [{
            value: 0.5,
            duration: 10,
            delay: 0
        }, {
            value: 1,
            duration: dur - 100,
            delay: 100 + debounce
        }],
        top: [{
            value: '-200vh',
            duration: 10,
            delay: 5
        }, {
            value: 0,
            duration: dur,
            delay: 100 + debounce
        }],
        zIndex: [{
            value: 500,
            duration: 10
        }, {
            value: 1000,
            duration: 10,
            delay: 5 + debounce
        }],
        easing: 'easeInOutQuart'
    };
};
export const SLIDE_FROM_BOTTOM_FADE = (el, dur, debounce) => {
    return {
        targets: el,
        opacity: [{
            value: 0.5,
            duration: 10,
            delay: 0
        }, {
            value: 1,
            duration: dur - 100,
            delay: 100 + debounce
        }],
        top: [{
            value: '200vh',
            duration: 0,
            delay: 0
        }, {
            value: 0,
            duration: dur,
            delay: 100 + debounce
        }],
        zIndex: [{
            value: 500,
            duration: 10
        }, {
            value: 1000,
            duration: 10,
            delay: 5 + debounce
        }],
        easing: 'easeInOutQuart'
    };
};
export const SLIDE_TOP_FADE = (el, dur, debounce) => {
    return {
        targets: el,
        opacity: [{
            value: 0.2,
            duration: dur,
            delay: 0
        }],
        top: [{
            value: '-250vh',
            duration: dur
        }],
        zIndex: [{
            value: 1000,
            duration: 10,
            delay: 5
        }, {
            value: 500,
            duration: 10,
            delay: 5 + debounce
        }],
        easing: 'easeInOutQuart'
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
            duration: 10,
            delay: 5
        }, {
            value: 500,
            duration: 10,
            delay: 5 + debounce
        }],
        easing: 'easeInOutQuart'
    };
};
export const GROW_FADE = (el, dur, debounce) => {
    return {
        targets: el,
        opacity: [{
            value: 0,
            duration: 100
        }, {
            value: 1,
            delay: 100,
            duration: dur - 100
        }],
        top: {
            value: 0,
            duration: dur,
            delay: 100 + debounce
        },
        zIndex: 1000,
        easing: 'easeInOutQuart'
    };
};


// slideFromTopAnimation: (el, dur, debounce) => {
//     return {
//         targets: el,
//         opacity: [
//             {
//                 value: 0,
//                 duration: 0
//             }, {
//                 value: 1,
//                 duration: dur
//             }
//         ],
//         top: [{
//             value: '-200vh',
//             duration: 0,
//             delay: 0
//         }, {
//             value: 0,
//             duration: dur,
//             delay: 10
//         }],
//         zIndex: [{
//             value: 500,
//             duration: 10,
//             delay: 5
//         }, {
//             value: 1000,
//             duration: 10,
//             delay: 5
//         }],
//         easing: 'easeInOutQuart'
//     };
// },
// slideFromBottomAnimation: (el, dur, debounce) => {
//     return {
//         targets: el,
//         top: [{
//             value: '200vh',
//             duration: 0,
//             delay: 0
//         }, {
//             value: 0,
//             duration: dur,
//             delay: 10
//         }],
//         zIndex: [{
//             value: 500,
//             duration: 10,
//             delay: 5
//         }, {
//             value: 1000,
//             duration: 10,
//             delay: 5
//         }],
//         easing: 'easeInOutQuart'
//     };
// },
// slideFromLeftAnimation: (el, dur, debounce) => {
//     return {
//         targets: el,
//         left: ['-125vw', 0],
//         duration: dur,
//         easing: 'easeInOutQuart'
//     };
// },
// slideFromRightAnimation: (el, dur, debounce) => {
//     return {
//         targets: el,
//         left: ['125vw', 0],
//         duration: dur,
//         easing: 'easeInOutQuart'
//     };
// },
// slideLeftAnimation: (el, dur, debounce) => {
//     return {
//         targets: el,
//         left: [{
//             value: '-125vw',
//             duration: dur
//         }],
//         easing: 'easeInOutQuart'
//     };
// },
// slideRightAnimation: (el, dur, debounce) => {
//     return {
//         targets: el,
//         left: [{
//             value: '125vw',
//             duration: dur
//         }],
//         easing: 'easeInOutQuart'
//     };
// },
// slideTopAnimation: (el, dur) => {
//     return {
//         targets: el,
//         top: [{
//             value: '-250vh',
//             duration: dur
//         }],
//         easing: 'easeInOutQuart'
//     };
// },
// slideBottomAnimation: (el, dur) => {
//     return {
//         targets: el,
//         top: [{
//             value: '200vh',
//             duration: dur
//         }],
//         easing: 'easeInOutQuart'
//     };
// },
// slideFromLeftFadeAnimation: (el, dur, debounce) => {
//     return {
//         targets: el,
//         left: ['-125vw', 0],
//         easing: 'easeInOutQuart',
//         opacity: [{
//             value: 1,
//             duration: dur
//         }]
//     };
// },
// slideFromRightFadeAnimation: (el, dur, debounce) => {
//     return {
//         targets: el,
//         left: ['125vw', 0],
//         easing: 'easeInOutQuart',
//         opacity: [{
//             value: 0,
//             duration: 0
//         }, {
//             value: 1,
//             duration: dur
//         }]
//     };
// },
// slideLeftFadeAnimation: (el, dur, debounce) => {
//     return {
//         targets: el,
//         left: ['-125vw'],
//         easing: 'easeInOutQuart',
//         opacity: [{
//             value: 1,
//             duration: duration
//         }]
//     };
// },
// slideRightFadeAnimation: (el, duration, debounce) => {
//     return {
//         targets: el,
//         left: ['125vw'],
//         easing: 'easeInOutQuart',
//         opacity: [{
//             value: 1,
//             duration: dur
//         }]
//     };
// }