import { SnipOptions } from "../types";
import { defaultOptions } from "../defaulOptions";

export const supportsWebkitClamp = (): boolean =>
  typeof CSS !== 'undefined' &&
  CSS.supports('display', '-webkit-box') &&
  CSS.supports('-webkit-line-clamp', '3') &&
  CSS.supports('-webkit-box-orient', 'vertical')

export const getOptions = (userOptions?: SnipOptions): SnipOptions => ({
  method: supportsWebkitClamp() ? userOptions?.method ?? defaultOptions.method : 'js',
  lines: userOptions?.lines ?? defaultOptions.lines,
  midWord: userOptions?.midWord ?? defaultOptions.midWord,
  ellipsis: userOptions?.ellipsis ?? defaultOptions.ellipsis
})
