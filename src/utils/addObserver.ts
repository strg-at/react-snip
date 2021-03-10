import { MutableRefObject } from "react";
import { SnipState } from "../types";
import { snipText } from "../method";

export const addObserver = (ref: MutableRefObject<HTMLElement>, state: MutableRefObject<SnipState>): void => {
  const { element } = state.current

  const observer = element.observer || new ResizeObserver(() => {
    if (ref.current.clientWidth !== element.prevWidth || ref.current.clientHeight !== element.prevHeight) {
      snipText(ref, state)
    }
  })

  observer.observe(ref.current)
  element.observer = observer
}
