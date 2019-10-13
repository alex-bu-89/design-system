import { Component, Host, h, State } from '@stencil/core';

@Component({
  tag: 'ab-colors',
  styleUrl: 'colors.scss',
})

export class Rating {
  @State() colorsBig: string[] = ['navi', 'blue', 'green', 'yellow', 'pink', 'cyan'];
  @State() colorsSmall: string[] = [];

  render() {
    return  (
      <Host class="container">
        <div class="row">
          {
            this.colorsBig.map((color) => {
              return (
                <div class={ `ab-color ${color}` }>
                  <div class={`ab-circle big ${color}-b`}></div>
                  <span class="ab-color-name">{ color }</span>
                </div>
              );
            })
          }
        </div>
      </Host>
    );
  }
}
