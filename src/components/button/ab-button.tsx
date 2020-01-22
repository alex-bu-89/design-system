// https://github.com/Kvaibhav01/Ripple-without-JS/blob/master/style.css

import { Component, Host, Element, State, Prop, h } from '@stencil/core';

@Component({
  tag: 'ab-button',
  styleUrl: 'ab-button.scss',
  shadow: true
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
      <Host class={`ripple ${this.attribute.class}`}>
        <slot />
      </Host>
    );
  }
}
