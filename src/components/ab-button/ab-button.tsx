// https://github.com/Kvaibhav01/Ripple-without-JS/blob/master/style.css

import { Component, Host, Element, State, Prop, h } from '@stencil/core';

@Component({
  tag: 'ab-button',
  styleUrl: 'ab-button.scss',
  shadow: false
})
export class ABButton {
  @Prop() type: string;

  @State() attribute = {
    class: 'ab-button',
    onClick: this.btnClick.bind(this),
 };

  @Element()
  host: HTMLButtonElement;

  btnClick() {
    console.log("btnClick");
  }

  render() {
    return  (
      <Host class={this.attribute.class}>
        <slot />
      </Host>
    );
  }
}
