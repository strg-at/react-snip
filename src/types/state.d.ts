import { SnipOptions } from "./options";

export declare type ElementState = {
  fullText?: string
  observer?: ResizeObserver
  prevWidth?: number
  prevHeight?: number
}

export declare type SnipState = {
  options?: SnipOptions
  element?: ElementState
}
