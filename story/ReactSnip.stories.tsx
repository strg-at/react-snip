import React from 'react';

import { ReactSnip } from '../src';
import { Demo } from "./Demo";
import { ResizeObserver as Polyfill } from '@juggle/resize-observer';

window.ResizeObserver = window.ResizeObserver || Polyfill;

export default {
  title: 'ReactSnip',
  component: ReactSnip,
};

const Template = (args) =>
  <Demo {...args}>
    <ReactSnip {...args}>
      Having amassed years of experience in the digital world, we offer customers high-end agency services to support them build their digital footprint by creating a digital marketing strategy that increases customer engagement. From the planning, design and execution, we are a one-stop-shop, a technology hub, that brings your digital marketing strategy to another level. Our system STRG.BeHave drives traffic to targeted content, offering your website users the leading readers high-calibre content, specifically to cater to their interests, depending on their digital footprint and behaviour. It automatically generates its own data ecosystem using only data from its content environment. This data is then transformed and fed into a personalisation engine using the principles of behavioural economics. That’s what visitors to your website will see on the screens.
    </ReactSnip>
  </Demo>

export const Primary = Template.bind({});

Primary.args = {
  method: 'js',
  lines: 7,
  midWord: true,
  ellipsis: '.\u200A.\u200A.',
}
