import { Component, Element, State, Prop, h } from '@stencil/core';

@Component({
  tag: 'ab-slider',
  styleUrl: 'slider.scss',
  shadow: true
})
export class NativeSlider {
  @Prop() name: string = 'slider';
  @Prop() min: number = 0;
  @Prop() max: number = 100;
  @Prop() value: number = 0;
  @Prop() step: number = 1;

  @State() currentValue: number;

  @Element() element: HTMLElement;

  componentWillLoad() {
    this.currentValue = this.value;
  }

  handleChange(e:any) {
    this.currentValue = parseInt(e.target.value);
  }

  render() {
    return (
      <div class='ab-slider'>

        <input
          type='range'
          min={this.min}
          max={this.max}
          value={this.value}
          name={name}
          step={this.step}
          onInput={this.handleChange.bind(this)}
        />

        <label htmlFor={this.name}>
          {this.currentValue}
        </label>
      </div>
    );
  }
}
