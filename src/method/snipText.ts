import { MutableRefObject } from "react";
import { SnipState } from "../types";
import { snipTextCSS, snipTextJS } from "./";

export const snipText = (ref: MutableRefObject<HTMLElement>, state: MutableRefObject<SnipState>): void => {
  const { options, element } = state.current

  if (options.method === 'css') {
    snipTextCSS(ref, state)
    return
  }

  if (options.method === 'js') {
    snipTextJS(ref, state)
    element.prevWidth = ref.current.clientWidth
    element.prevHeight = ref.current.clientHeight
  }
}
