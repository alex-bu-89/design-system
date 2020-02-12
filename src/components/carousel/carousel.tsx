import { Component, State, Prop, h, Element, Listen, Host } from '@stencil/core';

@Component({
  tag: 'ab-carousel',
  styleUrl: 'carousel.scss',
  shadow: false
})
export class Carousel {
  // PRIVATE
  activeClassName: string = 'carousel-active';
  wrapperClassName: string = 'carousel-wrapper';
  childsClassName: string = 'carousel-slide';
  carouselWrapper: HTMLElement;
  slides: HTMLElement[];
  slideCount: number = 0;
  itemsPerSlide: number = 1;
  slideWidth: number = 0;
  slideHeight: number = 0;
  isTouching: boolean = false;
  touchStartX: number;
  touchStartTime;
  touchMoveX: number;
  touchDeltaX: number = 0;
  observer: IntersectionObserver;
  resizingTimer: number;

  // PROPS
  @Prop() lazyloading: boolean = true;
  @Prop() controls: boolean = true;
  @Prop() indicators: boolean = true;

  // STATE
  @State() activeIndex: number = 0;

  // ELEMENTS
  @Element() host: HTMLElement;

  // EVENTS
  @Listen('resize', { target: 'window' })
  updateView() {
    if (!this.carouselWrapper) return;

    this.carouselWrapper.classList.remove('animate');
    this.slideWidth = this.carouselWrapper.offsetWidth;
    this.slideHeight = this.carouselWrapper.offsetHeight;
    this.carouselWrapper.style.transform = `translateX(-${this.slideWidth * this.activeIndex}px)`;

    // optimize images for the new window size
    if (this.lazyloading) {
      // remove optimized image src
      // since it needs to be updated with the new dimensions
      this.slides.forEach(slide => {
        if (slide.hasAttribute('data-src')) slide.removeAttribute('src')
      });

      // lazy load the new images
      this.lazyLoadImg();
    }

    // add .animate class to wrapper when resizing is ended
    if (this.resizingTimer) clearTimeout(this.resizingTimer);
    this.resizingTimer = setTimeout(() => this.carouselWrapper.classList.add('animate'), 100);
  }

  // LIFECIRCLE
  componentWillLoad(): void {
    // init
    this.slides = Array.from(this.host.children) as HTMLElement[];
    this.slideCount = Math.ceil(this.slides.length / this.itemsPerSlide);

    // add css class names to slide items and add touch and click events
    Array.from(this.slides).map(child => {
      child.classList.add(this.childsClassName);
      // on touch events
      child.ontouchstart = this.handleTouchStart.bind(this);
      child.ontouchmove = this.handleTouchMove.bind(this);
      child.ontouchend = this.handleTouchEnd.bind(this);
      // on mouse events
      child.onmousedown = this.handleTouchStart.bind(this);
      child.onmousemove = this.handleTouchMove.bind(this);
      child.onmouseup = this.handleTouchEnd.bind(this);
      child.onmouseleave = this.handleTouchOut.bind(this);
    });
  }

  componentDidLoad(): void {
    this.carouselWrapper = this.host.querySelector(`.${this.wrapperClassName}`);
    this.carouselWrapper.classList.add('animate');
    this.slideWidth = this.carouselWrapper.offsetWidth / this.itemsPerSlide;
    this.slideHeight = this.carouselWrapper.offsetHeight;
    // initial go to first slide
    this.goToSlide(0);
    // lazy load the images
    this.lazyLoadImg();
  }

  /**
   * TODO
   * @param e
   */
  handleTouchStart(e): void {
    e.preventDefault();
    this.isTouching = true;
    this.carouselWrapper.classList.remove('animate');
    this.touchStartX = e.pageX ?? e.touches[0].pageX;
    this.touchStartTime = Date.now();
  }

  /**
   * TODO
   * @param e
   */
  handleTouchMove(e): void {
    e.preventDefault();
    this.touchMoveX = e.pageX ?? e.touches[0].pageX;
    const newDeltaX = this.touchDeltaX + (this.touchStartX - this.touchMoveX);

    if (this.isTouching) {
      this.carouselWrapper.style.transform = `translateX(${-newDeltaX}px)`;
    }
  }

  /**
   *
   * @param e TODO
   */
  handleTouchEnd(e): void {
    e.preventDefault();
    this.carouselWrapper.classList.add('animate');
    const newDelta = this.touchStartX - this.touchMoveX;

    // calculate the velocity of the move
    // and interprete fast moves as a skip
    const touchMoveTime = this.touchStartTime - Date.now();
    const velocity = newDelta / (touchMoveTime / 1000);
    let newIndex: number = this.activeIndex;

    if (Math.abs(newDelta) > this.slideWidth / 4 || Math.abs(velocity) > 200) {
      if (newDelta > 0) {
        newIndex = this.activeIndex === this.slides.length - 1 ? this.activeIndex : this.activeIndex + 1;
      } else {
        newIndex = this.activeIndex === 0 ? 0 : this.activeIndex - 1;
      }
    }

    this.goToSlide(newIndex);
    this.isTouching = false;
  }

  /**
   *
   * @param e
   */
  handleTouchOut(e): void {
    e.preventDefault();
    if (this.isTouching) {
      this.goToSlide(this.activeIndex);
      this.isTouching = false;
    }
  }

  /**
   * Lazyloads images when an image comes into the viewport
   */
  lazyLoadImg(): void {
    // init lazyloading
    this.observer = new IntersectionObserver((entries: [IntersectionObserverEntry]) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        const element = entry.target as HTMLElement;
        this.setImgSrc(element);
      });
    }, {
      root: this.host
    });

    // observe slides
    this.slides.forEach(slide => this.observer.observe(slide));
  }

  /**
   * Set img src from data-src attribute when slide item is image
   * @param slide HTMLElement
   * @param force - If true an existing src will overwritten by the data-src value (if available)
   */
  setImgSrc(slide: HTMLElement): void {
    if (slide.getAttribute('src')) return;

    const src = slide.getAttribute('data-src');

    if (src) {
      slide.setAttribute('src', src);
    } else {
      const imgWrapped = slide.querySelector('img[data-src]') as HTMLElement;

      if (imgWrapped) {
        const src = imgWrapped.getAttribute('data-src');

        if (src) {
          imgWrapped.setAttribute('src', src)
        };
      }
    }
  }

  /**
   * Goes to given slide index
   * @param slideIndex
   */
  goToSlide(slideIndex: number): void {
    if (slideIndex !== this.activeIndex) this.activeIndex = slideIndex;

    Array.from(this.slides).map(child =>
      child.classList.remove(this.activeClassName)
    );

    this.slides[slideIndex].classList.add(this.activeClassName);

    const newDelta = this.slideWidth * slideIndex;
    this.carouselWrapper.style.transform = `translateX(-${newDelta}px)`;
    this.touchDeltaX = newDelta;
  }

  /**
   * Handles the click of a control element
   * @param direction - the direction indicated by the control
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
   * Renders the controls of the carousel
   */
  renderControls() {
    if (!this.controls || this.slides.length < 2) return null;

    return (
      <div class="ab-carousel__controls">
        <span class="ab-carousel__controls--left" onClick={() => this.handleControlChange('prev')}>
          <ui-symbol symbol="chevron" aria-hidden="" aria-role="icon" aria-label="chevron" color="currentColor" weight="15"></ui-symbol>
        </span>
        <span class="ab-carousel__controls--right" onClick={() => this.handleControlChange('next')}>
          <ui-symbol symbol="chevron" aria-hidden="" aria-role="icon" aria-label="chevron" color="currentColor" weight="15"></ui-symbol>
        </span>
      </div>
    );
  }

  /**
   * Renders the point indicators of the carousel
   */
  renderIndicators() {
    if (!this.indicators || this.slides.length < 2) return null;

    return (
      <ul class="ab-carousel__indicators">
        {
          this.slides.map((_, index) => {
            return (
              <li class={this.activeIndex === index ? this.activeClassName : ''}
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

  /**
   * Renders the component
   */
  render() {
    return (
      <Host>
        <section class={this.wrapperClassName}>
          <slot />
        </section>
        {this.renderControls()}
        {this.renderIndicators()}
      </Host>
    );
  }
}
