import {
  UiRoutable
} from "./UiRoutable";
import {
  AnimatablePage
} from "../../components/AnimatablePage";

export const UiPage = (baseElement) => class extends UiRoutable(AnimatablePage(baseElement)) {};
