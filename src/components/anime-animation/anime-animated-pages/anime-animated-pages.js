import '../../../../node_modules/animejs/anime.js';
import './AnimatablePage.js';
import {
  SLIDE_FROM_BOTTOM_FADE,
  SLIDE_TOP_FADE,
  SLIDE_BOTTOM_FADE,
  SLIDE_FROM_TOP_FADE,
  GROW_FADE
} from '../anime-animations/anime-animations.js';
import {
  PolymerElement,
  html
} from '@polymer/polymer/polymer-element.js';

export const EVENT_ANIME_PAGES_TRANSITION_START = 'anime-animated-pages-transition-start';
export const EVENT_ANIME_PAGES_TRANSITION_END = 'anime-animated-pages-transition-end';

class AnimeAnimatedPages extends PolymerElement {
  static get template() {
    return html `
    <style>
      :host> ::slotted(*) {
        display: none;
      }

      :host> ::slotted([anime-current-page="true"]){
        display: block;
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

    this.dispatchEvent(new CustomEvent(EVENT_ANIME_PAGES_TRANSITION_START, {
      bubbles: true,
      composed: true
    }));

    if (exitPage !== null && exitPage !== undefined) {
      setTimeout(() => {
        exitPage.removeAttribute("anime-current-page");
      }, this.routeInDuration);
    }

    if (entryPage !== undefined) {
      entryPage.setAttribute("anime-current-page", true);
      
      if (this.initialAnimation) {
        this.set('initialAnimation', false);
        this._animateEntry(entryPage, GROW_FADE);
        this._animateExit(exitPage, SLIDE_BOTTOM_FADE);
      } else {
        if (entryPageIndex <= exitPageIndex) {
          this._animateEntry(entryPage, SLIDE_FROM_TOP_FADE);
          this._animateExit(exitPage, SLIDE_BOTTOM_FADE);
        }

        if (entryPageIndex > exitPageIndex) {
          this._animateEntry(entryPage, SLIDE_FROM_BOTTOM_FADE);
          this._animateExit(exitPage, SLIDE_TOP_FADE);
        }
      }
    }

    this.currentPage = selected;
  }

  _animateEntry(entryPage, animation) {
    let a = anime(animation(entryPage, this.routeOutDuration, this.routeDebounce)).finished;
    a.then(() => {
      entryPage.transitionInCallback();
      this.dispatchEvent(new CustomEvent(EVENT_ANIME_PAGES_TRANSITION_END, {
        bubbles: true,
        composed: true
      }));
    });
  }

  _animateExit(exitPage, animation) {
    if (exitPage !== undefined) {
      exitPage.transitionOutCallback();
      anime(animation(exitPage, this.routeOutDuration, this.routeDebounce));
    }
  }
}

window.customElements.define("anime-animated-pages", AnimeAnimatedPages);