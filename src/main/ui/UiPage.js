import {
  UiRoutable
} from "./UiRoutable";
import {
  AnimatablePage
} from "../../components/anime-animation/anime-animated-pages/AnimatablePage";

export const UiPage = (baseElement) => class extends UiRoutable(AnimatablePage(baseElement)) {
  connectedCallback() {
    super.connectedCallback();
    this.removeAttribute('unresolved');
    this.setAttribute('ready', true);
  }
};