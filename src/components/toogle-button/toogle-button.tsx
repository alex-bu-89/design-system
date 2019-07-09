import { Component, h } from '@stencil/core';

@Component({
  tag: 'ab-toogle-button',
  styleUrl: 'toogle-button.scss',
  shadow: true
})
export class ToogleButton {
   render() {
    return  (
      <div>
        Toogle Buttonn
      </div>
    );
  }
}
