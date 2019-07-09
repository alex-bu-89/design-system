import { Component, h } from '@stencil/core';

@Component({
  tag: 'ab-toogle-group',
  styleUrl: 'toogle-group.scss',
  shadow: true
})
export class ToogleGroup {
   render() {
    return  (
      <slot />
    );
  }
}
