import { Component, Host, Element, State, Prop, h } from '@stencil/core';

@Component({
  tag: 'ab-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class Rating {
  // @Prop() maxValue: number = 5;
  // @Prop() value: number = 0;

  @Element()
  host: HTMLButtonElement;

  componentWillLoad() {

  }

  onMouseDown() {
    console.log('----->');
  }

  render() {
    return  (
      <Host onMouseDown={this.onMouseDown}>
        <slot />
      </Host>
    );
  }
}
