import { Component, Prop, h } from '@stencil/core';
// import { format } from '../../utils/utils';

@Component({
  tag: 'ab-slider',
  styleUrl: 'ab-slider.css',
  shadow: true
})
export class Slider {
  /**
   * The last name
   */
  @Prop() last: string;

  render() {
    return <div>Hello, World</div>;
  }
}
