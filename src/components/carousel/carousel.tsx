import { Component, State, Prop, h, Element, Listen, Host } from '@stencil/core';

@Component({
  tag: 'ab-carousel',
  styleUrl: 'carousel.scss',
  shadow: false
})
export class Carousel {
  activeClassName: string = 'active';
  wrapperClassName: string = 'carousel';
  carouselWrapper: HTMLElement;
  slides: HTMLElement[];
  slideCount: number = 0;
  itemsPerSlide: number = 1;
  slideWidth: number = 0;
  touchStartX: number;
  touchStartTime;
  touchMoveX: number;
  touchDeltaX: number = 0;

  @Prop() childsClassName: string = 'ab-carousel-slide';
  @Prop() fluidImg: string;

  @Element() host: HTMLElement;

  @State() activeIndex: number = 0;

  @Listen('resize', { target: 'window' })
  updateView() {
    this.slideWidth = this.carouselWrapper.offsetWidth;
    this.carouselWrapper.style.transform = `translateX(${this.slideWidth * this.activeIndex}px)`;
  }

  handleTouchStart(e: TouchEvent): void {
    e.preventDefault();
    this.carouselWrapper.classList.remove('animate');
    this.touchStartX =  e.touches[0].pageX;
    this.touchStartTime = Date.now();
  }

  handleTouchMove(e: TouchEvent): void {
    e.preventDefault();
    this.touchMoveX =  e.touches[0].pageX;
    const newDeltaX = this.touchDeltaX + (this.touchStartX - this.touchMoveX);
    this.carouselWrapper.style.transform = `translateX(${-newDeltaX}px)`;
  }

  handleTouchEnd(e: TouchEvent): void {
    e.preventDefault();
    this.carouselWrapper.classList.add('animate');
    const newDelta = this.touchStartX - this.touchMoveX;

    // Calculate the velocity of the move
    // and interprete fast moves as a skip
    const touchMoveTime = this.touchStartTime - Date.now();
    const velocity = newDelta / (touchMoveTime/1000);

    let newIndex: number = this.activeIndex;
    if (Math.sqrt(newDelta*newDelta) > this.slideWidth/4 || Math.sqrt(velocity*velocity) > 200) {

      if (newDelta > 0) {
        newIndex = this.activeIndex === this.slides.length - 1 ? this.activeIndex : this.activeIndex + 1;
      } else {
        newIndex = this.activeIndex === 0 ? 0 : this.activeIndex - 1;
      }
    }
    this.goToSlide(newIndex);
  }

  componentWillLoad(): void {
    console.time('CarouselLoadingTime');

    // set basic init
    this.slides = Array.from(this.host.children) as HTMLElement[];
    this.slideCount = Math.ceil(this.slides.length / this.itemsPerSlide);

    // add css class names to slide items
    Array.from(this.slides).map(child => {
      child.classList.add(this.childsClassName);
      child.ontouchstart = this.handleTouchStart.bind(this);
      child.ontouchmove = this.handleTouchMove.bind(this);
      child.ontouchend = this.handleTouchEnd.bind(this);
    });
  }

  componentDidLoad(): void {
    this.carouselWrapper = this.host.querySelector(`.${this.wrapperClassName}`);
    this.carouselWrapper.classList.add('animate');
    this.slideWidth = this.carouselWrapper.offsetWidth;
    // this.host.style.height = `${this.slideWidth * (3/4)}px`;
    // this.carouselWrapper.style.height = this.host.style.height;
    this.goToSlide(0);
    console.timeEnd('CarouselLoadingTime');
  }

  /**
   * Set img src from data-src attribute when slide item is image
   * @param slide HTMLElement
   */
  setImgSrc(slide: HTMLElement): void {
    if (slide.getAttribute('src')) return;
    const src = slide.getAttribute('data-src');

    if (src) {
      slide.setAttribute('src', src);
    } else {
      const imgWrapped = slide.querySelector('img[data-src]');

      if (imgWrapped) {
        imgWrapped.setAttribute('src', imgWrapped.getAttribute('data-src'));
      }
    }
  }

  /**
   * Goes to given slide index
   * @param slideI - slide index
   */
  goToSlide(slideI: number): void {
    if (slideI !== this.activeIndex) this.activeIndex = slideI;
    Array.from(this.slides).map(child =>
      child.classList.remove(this.activeClassName)
    );

    this.setImgSrc(this.slides[slideI]);
    this.slides[slideI].classList.add(this.activeClassName);

    const newDelta = this.slideWidth * slideI;
    this.carouselWrapper.style.transform = `translateX(-${newDelta}px)`;
    this.touchDeltaX = newDelta;
  }

  /**
   * TODO
   * @param direction
   */
  handleControlChange(direction: string): void {
    switch (direction) {
      case 'prev':
        const prevSlide: number = (this.activeIndex - 1) < 0 ? this.slideCount - 1 : this.activeIndex - 1;
        this.goToSlide(prevSlide);
        break;
      case 'next':
        const nextSlide: number = (this.activeIndex + 1) >= this.slideCount ? 0 : this.activeIndex + 1;
        this.goToSlide(nextSlide);
        break;
      default:
        console.warn('Undefined direction type: ', direction);
        return null;
    }
  }

  /**
   * @TODO
   */
  renderControls() {
    return (
      <div class="controls">
        <span class="left" onClick={() => this.handleControlChange('prev')}><ui-symbol symbol="chevron" aria-hidden="" aria-role="icon" aria-label="chevron" color="currentColor" weight="15" class="hydrated"></ui-symbol></span>
        <span class="right" onClick={() => this.handleControlChange('next')}><ui-symbol symbol="chevron" aria-hidden="" aria-role="icon" aria-label="chevron" color="currentColor" weight="15" class="hydrated"></ui-symbol></span>
      </div>
    );
  }

  /**
   * @TODO
   */
  renderIndicator() {
    return (
      <ul class="indicator-list">
        {
          this.slides.map((_, index) => {
            return (
              <li class={`indicator ${this.activeIndex === index ? this.activeClassName : ''}`}
                data-index={index}
                onClick={() => this.goToSlide(index)}
              >
              </li>
            );
          })
        }
      </ul>
    )
  }

  render() {
    const hostClass = this.fluidImg === 'true' ? `content-fluid` : ''

    return (
      <Host class={hostClass}>
        <section class={this.wrapperClassName}>
          <slot />
        </section>
        {this.renderControls()}
        {this.renderIndicator()}
      </Host>
    );
  }
}
