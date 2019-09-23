import { Component, Host, State, Prop, h } from '@stencil/core';

@Component({
  tag: 'ab-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Rating {
  // @Prop() maxValue: number = 5;
  // @Prop() value: number = 0;

  componentWillLoad() {

  }

  render() {
    return  (
      <Host>
        <slot />
      </Host>
    );
  }
}
