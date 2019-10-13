import { Component, Host, Element, State, Prop, h } from '@stencil/core';

@Component({
  tag: 'ab-button',
  styleUrl: 'ab-button.scss',
  shadow: false
})
export class Rating {
  @Prop() type: string;

  @State() attribute = {
    class: 'ab-button',
    type: this.type || 'type="button"',
    onClick: this.btnClick.bind(this),
 };

  @Element()
  host: HTMLButtonElement;

  btnClick() {
    console.log("btnClick");
  }

  render() {
    return  (
      <Host>
        <slot />
      </Host>
    );
  }
}
