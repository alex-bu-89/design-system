import { Component, State, Prop, h } from '@stencil/core';

@Component({
  tag: 'ab-rating',
  styleUrl: 'rating.scss',
  shadow: true
})
export class Rating {
  @Prop() maxValue: number = 5;
  @Prop() value: number = 0;

  @State() ratingList: Array<object> = [];

  componentWillLoad() {
    this.createRating(this.value);
  }

  handleChange(newValue) {
    this.value = newValue;
    this.createRating(this.value);
  }

  createRating(numberOfStars: number) {
    let ratingList = [];

    for (let i = 1; i <= this.maxValue; i++) {
      if (i <= numberOfStars) {
        ratingList.push(<span class="star" onMouseOver={() => this.createRating(i)} onMouseOut={() => this.createRating(this.value)} onClick={() => this.handleChange(i)}>&#x2605;</span>);
      } else {
        ratingList.push(<span class="star" onMouseOver={() => this.createRating(i)} onMouseOut={() => this.createRating(this.value)} onClick={() => this.handleChange(i)}>&#x2606;</span>);
      }
    }

    this.ratingList = ratingList;
  }

   render() {
    return  (
      <div class="ab-rating">
        {this.ratingList}
      </div>
    );
  }
}
