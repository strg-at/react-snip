import React, { FC, useEffect, useState } from "react";
import { SnipOptions } from "../src/types";
import { supportsWebkitClamp } from "../src/utils";
import strgAvatar from '../assets/strgavatar.jpg'

export const Demo: FC<SnipOptions> = ({ children, method }) => {
  const [cardWidth, setCardWidth] = useState(500)
  const [withFloat, setWithFloat] = useState(true)
  const [tip, setTip] = useState(null)

  useEffect(() => {
    const isClampSupported = supportsWebkitClamp()

    if (method === 'css' && !isClampSupported) {
      setTip('Warning: The CSS method is not supported in this browser and automatically falls back to the JS method.')
      return
    }

    if (method === 'css' && withFloat) {
      setTip('Tip: The CSS method cannot make the text flow around the floated element. Switch to the JS method for a better effect.')
      return
    }

    if (method === 'js' && !withFloat && isClampSupported) {
      setTip("Tip: You might be better off with the more performant CSS method if you don't use floats (or don't have other use case where the JS method would be required).")
      return
    }

    setTip(null)
  }, [method, withFloat])

 return (
   <div className="demo">
     <h1 className="h1">react-snip</h1>
     <div className="form-horizontal">
       <div className="form-group">
         <label htmlFor="input-cardwidth" className="form-label col-5">Card width:</label>
         <div data-tooltip={`${cardWidth}px`} className="col-7 tooltip">
          <input id="input-cardwidth" className="slider" type="range" min="300" max="500" value={cardWidth} onChange={(e) => { setCardWidth(+e.target.value)}} />
         </div>
       </div>
       <div className="form-group">
         <div className="form-label col-5">Other options:</div>
         <div className="col-7">
           <label htmlFor="input-float" className="form-checkbox">
             <input id="input-float" type="checkbox" checked={withFloat} onChange={(e) => {
               setWithFloat(e.target.checked)
             }} />
             <i className="form-icon"></i> Show floated element
           </label>
         </div>
       </div>
     </div>
     <div className="demo-card" style={{ width: cardWidth }}>
       <h5 className="demo-card-title">About STRG.</h5>
       {withFloat && <img src={strgAvatar} height={100} width={133} className="demo-card-pic" />}
       {children}
       {tip && <span className="toast toast-primary demo-card-toast"><i>{ tip }</i></span>}
     </div>
   </div>
 )
}
