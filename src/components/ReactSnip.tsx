import React, { FC, useRef, isValidElement, Children, cloneElement, ReactNode } from 'react'
import { SnipOptions } from "../types";
import { useSnip } from "../hooks/useSnip";

export const ReactSnip: FC<SnipOptions> = ({ children, method, lines, midWord, ellipsis }) => {
  const ref = useRef(null)
  useSnip(ref, { method, lines, midWord, ellipsis })

  const withRef = (children: ReactNode) => {
    if (Children.count(children) > 1 || !isValidElement(children)) {
      return <div ref={ref}>{children}</div>
    }

    return isValidElement(children.props.children)
      ? cloneElement(children, { children: withRef(children.props.children) })
      : cloneElement(children, { ref: ref })
  }

  return withRef(children)
}
