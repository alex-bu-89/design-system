import { Component, Element, State, Prop, h } from '@stencil/core';
// import { format } from '../../utils/utils';

@Component({
  tag: 'ab-slider',
  styleUrl: 'slider.scss',
  shadow: true
})
export class Slider {
  @Prop() name: string = 'ab-slider';
  @Prop() min: number = 0;
  @Prop() max: number = 10;
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
