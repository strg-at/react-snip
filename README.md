# react-snip

React.js component that clamps the content of a text element if it exceeds the specified number of lines.

#### Key features:
* two snipping approaches (CSS / JavaScript)
* no need to specify line heights
* re-snipping on element resize
* no dependencies (small and fast)

![](assets/illustration.png)

## Installation

``` bash
# install with npm
npm install @strg/react-snip

# or with yarn
yarn add @strg/react-snip
```

## Usage

``` js
import { ReactSnip } from '@strg/react-snip'
```

The basic usage:

``` jsx
<ReactSnip>
  <p> ... </p>
</ReactSnip>
```
To pass in the `lines` value:

``` jsx
<ReactSnip lines={3}>
  <p> ... </p>
</ReactSnip>
```

To pass in the snipping `method`:

``` jsx
<ReactSnip lines={3} method={"js"}>
  <p> ... </p>
</ReactSnip>
```

*Note: At this point the component is only meant to work with simple text elements.*


## Props

| Name | Default | Description |
| --- | --- | --- |
| method | `'css'` | Gives you control over the snipping approach used. Should equal `'css'` or `'js'`. |
| lines | `3` | Maximum number of lines allowed for the element. |
| midWord | `true` | Defines if the text can be snipped in the middle of a word. |
| ellipsis | `'.\u200A.\u200A.'` | A character or a group of characters displayed at the end of the snipped text. |

*Note: Props `midWord` and `ellipsis` are only effective with JS method.*

## How it works

- **CSS** approach is based on the `-webkit-line-clamp`.
- **JavaScript** approach is based on the progressive cutting of the element's `innerText` in a loop.

*Note: CSS approach is faster (preferred), but does not work in older browsers / in all situations (f.e. does not work in IE11, when you need the text to flow around a floated element, or when you want a custom ellipsis). The idea is to allow you to freely pick the approach on a per-element basis.*

### Caveats

For the component to be able to determine the number of lines properly, the height of the element should be the same as the height of the text. Be wary of any CSS steps that will affect the height of the element. Some of the common examples:
* vertical paddings
* fixed height / fixed min-height
* making the element a flex-item (flex container's `align-items` defaults to `stretch`)
* making the element height grow with the `flex-grow` in the column flex layout.

*Note: You can still use the component with flexbox, just make sure to change the default `align-items` / `align-self` value to `flex-start` or whatever fits your case.*

## IE11 Support

IE11 does not support `-webkit-line-clamp` (falls back to the JS method), and the `ResizeObserver API`. This API needs to be polyfilled if you want to re-snip the elements on the resize in IE11 (they would still get snipped when inserted / on prop change without the polyfill). Recommended: [@juggle/resize-observer](https://www.npmjs.com/package/@juggle/resize-observer)

``` javascript
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';
 
window.ResizeObserver = window.ResizeObserver || Polyfill;
```
