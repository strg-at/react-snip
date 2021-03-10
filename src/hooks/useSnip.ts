import { MutableRefObject, useLayoutEffect, useRef } from 'react'
import { SnipOptions, SnipState } from "../types";
import { snipText } from "../method";
import { addObserver, destroyObserver, getOptions } from "../utils";

export const useSnip = (ref: MutableRefObject<HTMLElement>, userOptions?: SnipOptions): void => {
  const state = useRef<SnipState>({})

  useLayoutEffect(() => {
    state.current.options = getOptions(userOptions)
  }, [userOptions])

  useLayoutEffect(() => {
    state.current.element = { fullText: ref.current.textContent }
  }, [ref])

  useLayoutEffect(() => {
    const isObserverAvailable = typeof ResizeObserver !== 'undefined'
    const needsObserver = state.current.options.method === 'js'
    const hasObserver = !!state.current.element.observer

    const isGettingObserverAdded = isObserverAvailable && needsObserver && !hasObserver
    const isGettingObserverDestroyed = isObserverAvailable && !needsObserver && hasObserver

    isGettingObserverAdded && addObserver(ref, state)
    isGettingObserverDestroyed && destroyObserver(ref, state)

    isGettingObserverAdded || snipText(ref, state)

    return () => hasObserver && destroyObserver(ref, state)
  }, [ref, state.current.options])
}
