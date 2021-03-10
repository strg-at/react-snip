import { MutableRefObject } from "react";
import { SnipState } from "../types";
import { elementLines } from "../utils";

export const snipTextJS = (ref: MutableRefObject<HTMLElement>, state: MutableRefObject<SnipState>): void => {
  const { options, element } = state.current

  ref.current.style.display = null
  ref.current.style.webkitLineClamp = null
  ref.current.style.webkitBoxOrient = null
  ref.current.style.overflow = null
  ref.current.textContent = element.fullText

  if (options.lines <= 0 || elementLines(ref.current) <= options.lines) {
    return
  }

  const snipProgress = {
    unprocessed: element.fullText,
    processed: ''
  }

  const separators = options.midWord ? ['. ', ', ', ' ', ''] : ['. ', ', ', ' ']

  separators.forEach(separator => {
    for (const chunk of snipProgress.unprocessed.split(separator)) {
      ref.current.textContent = `${snipProgress.processed}${chunk}${separator}${options.ellipsis}`

      if (elementLines(ref.current) > options.lines) {
        snipProgress.unprocessed = chunk
        break
      }

      snipProgress.processed = `${snipProgress.processed}${chunk}${separator}`
    }
  })

  ref.current.textContent = `${snipProgress.processed.trim()}${options.ellipsis}`
}
