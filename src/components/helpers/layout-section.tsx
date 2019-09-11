import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'ab-layout-section',
  styleUrl: 'layout-section.scss',
})
export class Rating {
  @Prop() header: string = '';
  @Prop() subHeader: string = '';

  render() {
    console.log('----->', this.header);
    console.log('----->', this.subHeader);
    return  (
      <Host class="container">
        <div class="row">
          <div class="col-4">
            <h2>{this.header}</h2>
            <p>{this.subHeader}</p>
          </div>
          <div class="col-8">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
