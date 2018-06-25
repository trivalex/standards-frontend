import './AnimatablePage.js';
import {
  timeOut
} from '@polymer/polymer/lib/utils/async.js';
import '../../node_modules/animejs/anime.js';
import {
  ANIME_ANIMATIONS
} from '../../animations/anime-animations.js';
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

export const EVENT_ANIME_PAGES_TRANSITION_START = 'anime-animated-pages-transition-start';
export const EVENT_ANIME_PAGES_TRANSITION_END = 'anime-animated-pages-transition-end';

class AnimeAnimatedPages extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      :host> ::slotted(*) {
        display: none;
      }

      :host> ::slotted([anime-current-page="true"]){
        display: block;
        z-index: 1000;
      }
    </style>
    <slot id="pages">

    </slot>
`;
  }

  static get properties() {
    return {
      attrForSelected: {
        type: String,
        reflectToAttribute: true
      },
      activateEvent: {
        type: String,
        value: null
      },
      currentPage: {
        type: String,
        value: null
      },
      routeInDuration: {
        value: 250,
        reflectToAttribute: true
      },
      routeOutDuration: {
        value: 225,
        reflectToAttribute: true
      },
      routeDebounce: {
        value: 150,
        reflectToAttribute: true
      },
      initialAnimation: {
        type: Boolean,
        value: true
      },
      activated: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      },
      selected: {
        type: String,
        reflectToAttribute: true,
        observer: '_selectedPageChanged'
      }
    };
  }

  _selectedPageChanged(selected) {
    if (this.shadowRoot === undefined || this.shadowRoot === null) {
      return;
    }

    if (!this.activated) {
      return;
    }

    let pages = Array.from(this.shadowRoot.getElementById("pages")
      .assignedNodes({
        flatten: true
      })
      .filter(n => n.nodeType === Node.ELEMENT_NODE));

    // move out, move in
    let entryPage,
      exitPage;
    let entryPageIndex = -1,
      exitPageIndex = -1;

    pages.forEach((n, i) => {
      if (n.getAttribute(this.attrForSelected) === selected) {
        entryPage = n;
        entryPageIndex = i;
      }
      if (n.getAttribute(this.attrForSelected) === this.currentPage) {
        exitPage = n;
        exitPageIndex = i;
      }
    });

    this._tranistionStart();

    if (exitPage !== null && exitPage !== undefined) {
        setTimeout(() => {
          exitPage.removeAttribute("anime-current-page");
        }, this.routeInDuration);
    }
    entryPage.setAttribute("anime-current-page", true);
    
    if (this.initialAnimation) {
      this.set('initialAnimation', false);
      if (entryPageIndex <= exitPageIndex) {
        if (entryPage !== undefined) {
          anime(ANIME_ANIMATIONS.GRWOR_FADE(entryPage, this.routeOutDuration));
        }
        if (exitPage !== undefined) {
          anime(ANIME_ANIMATIONS.SLIDE_BOTTOM_FADE(exitPage, this.routeInDuration));
        }
      }

      if (entryPageIndex > exitPageIndex) {
        if (entryPage !== undefined) {
          anime(ANIME_ANIMATIONS.GRWOR_FADE(entryPage, this.routeOutDuration));
        }
        if (exitPage !== undefined) {
          anime(ANIME_ANIMATIONS.SLIDE_TOP_FADE(exitPage, this.routeOutDuration));
        }
      }
    } else {
      if (entryPageIndex <= exitPageIndex) {
        if (entryPage !== undefined) {
          anime(ANIME_ANIMATIONS.SLIDE_FROM_TOP_FADE(entryPage, this.routeInDuration, this.routeDebounce));
        }
        if (exitPage !== undefined) {
          anime(ANIME_ANIMATIONS.SLIDE_BOTTOM_FADE(exitPage, this.routeInDuration));
        }
      }

      if (entryPageIndex > exitPageIndex) {
        if (entryPage !== undefined) {
          anime(ANIME_ANIMATIONS.SLIDE_FROM_BOTTOM_FADE(entryPage, this.routeOutDuration, this.routeDebounce));
        }
        if (exitPage !== undefined) {
          anime(ANIME_ANIMATIONS.SLIDE_TOP_FADE(exitPage, this.routeOutDuration));
        }
      }
    }

    this.currentPage = selected;

    this._tranistionFinish();
  }

  _tranistionStart() {
    this.dispatchEvent(new CustomEvent(EVENT_ANIME_PAGES_TRANSITION_START, {
      bubbles: true,
      composed: true
    }));
  }

  _tranistionFinish() {
    this.dispatchEvent(new CustomEvent(EVENT_ANIME_PAGES_TRANSITION_END, {
      bubbles: true,
      composed: true
    }));
  }
}

window.customElements.define("anime-animated-pages", AnimeAnimatedPages);