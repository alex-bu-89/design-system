import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'ab-colors',
  styleUrl: 'colors.scss',
})
export class Rating {
  @State() colorsBig: string[];
  @State() colorsSmall: string[];

  render() {
    return  (
      <Host class="container">

      </Host>
    );
  }
}
