import { MutableRefObject } from "react";
import { SnipState } from "../types";

export const destroyObserver =(ref: MutableRefObject<HTMLElement>, state: MutableRefObject<SnipState>): void => {
  const { element } = state.current

  if (element.observer) {
    element.observer.disconnect()
    element.prevWidth = null
    element.prevHeight = null
    element.observer = null
  }
}
