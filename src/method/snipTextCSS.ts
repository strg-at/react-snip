import { MutableRefObject } from "react";
import { SnipState } from "../types";

export const snipTextCSS = (ref: MutableRefObject<HTMLElement>, state: MutableRefObject<SnipState>): void => {
  const { options, element } = state.current

  ref.current.textContent = element.fullText
  ref.current.style.display = '-webkit-box'
  ref.current.style.webkitLineClamp = `${options.lines}`
  ref.current.style.webkitBoxOrient = 'vertical'
  ref.current.style.overflow = 'hidden'
}
