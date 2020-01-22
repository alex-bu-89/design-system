/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface AbButton {
    'type': string;
  }
  interface AbColors {}
  interface AbLayoutSection {
    'header': string;
    'subHeader': string;
  }
  interface AbNativeSlider {
    'max': number;
    'min': number;
    'name': string;
    'step': number;
    'value': number;
  }
  interface AbRating {
    'maxValue': number;
    'value': number;
  }
  interface AbSlider {
    'max': number;
    'min': number;
    'name': string;
    'step': number;
    'value': number;
  }
  interface AbToogleButton {}
  interface AbToogleGroup {}
}

declare global {


  interface HTMLAbButtonElement extends Components.AbButton, HTMLStencilElement {}
  var HTMLAbButtonElement: {
    prototype: HTMLAbButtonElement;
    new (): HTMLAbButtonElement;
  };

  interface HTMLAbColorsElement extends Components.AbColors, HTMLStencilElement {}
  var HTMLAbColorsElement: {
    prototype: HTMLAbColorsElement;
    new (): HTMLAbColorsElement;
  };

  interface HTMLAbLayoutSectionElement extends Components.AbLayoutSection, HTMLStencilElement {}
  var HTMLAbLayoutSectionElement: {
    prototype: HTMLAbLayoutSectionElement;
    new (): HTMLAbLayoutSectionElement;
  };

  interface HTMLAbNativeSliderElement extends Components.AbNativeSlider, HTMLStencilElement {}
  var HTMLAbNativeSliderElement: {
    prototype: HTMLAbNativeSliderElement;
    new (): HTMLAbNativeSliderElement;
  };

  interface HTMLAbRatingElement extends Components.AbRating, HTMLStencilElement {}
  var HTMLAbRatingElement: {
    prototype: HTMLAbRatingElement;
    new (): HTMLAbRatingElement;
  };

  interface HTMLAbSliderElement extends Components.AbSlider, HTMLStencilElement {}
  var HTMLAbSliderElement: {
    prototype: HTMLAbSliderElement;
    new (): HTMLAbSliderElement;
  };

  interface HTMLAbToogleButtonElement extends Components.AbToogleButton, HTMLStencilElement {}
  var HTMLAbToogleButtonElement: {
    prototype: HTMLAbToogleButtonElement;
    new (): HTMLAbToogleButtonElement;
  };

  interface HTMLAbToogleGroupElement extends Components.AbToogleGroup, HTMLStencilElement {}
  var HTMLAbToogleGroupElement: {
    prototype: HTMLAbToogleGroupElement;
    new (): HTMLAbToogleGroupElement;
  };
  interface HTMLElementTagNameMap {
    'ab-button': HTMLAbButtonElement;
    'ab-colors': HTMLAbColorsElement;
    'ab-layout-section': HTMLAbLayoutSectionElement;
    'ab-native-slider': HTMLAbNativeSliderElement;
    'ab-rating': HTMLAbRatingElement;
    'ab-slider': HTMLAbSliderElement;
    'ab-toogle-button': HTMLAbToogleButtonElement;
    'ab-toogle-group': HTMLAbToogleGroupElement;
  }
}

declare namespace LocalJSX {
  interface AbButton {
    'type'?: string;
  }
  interface AbColors {}
  interface AbLayoutSection {
    'header'?: string;
    'subHeader'?: string;
  }
  interface AbNativeSlider {
    'max'?: number;
    'min'?: number;
    'name'?: string;
    'step'?: number;
    'value'?: number;
  }
  interface AbRating {
    'maxValue'?: number;
    'value'?: number;
  }
  interface AbSlider {
    'max'?: number;
    'min'?: number;
    'name'?: string;
    'step'?: number;
    'value'?: number;
  }
  interface AbToogleButton {}
  interface AbToogleGroup {}

  interface IntrinsicElements {
    'ab-button': AbButton;
    'ab-colors': AbColors;
    'ab-layout-section': AbLayoutSection;
    'ab-native-slider': AbNativeSlider;
    'ab-rating': AbRating;
    'ab-slider': AbSlider;
    'ab-toogle-button': AbToogleButton;
    'ab-toogle-group': AbToogleGroup;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'ab-button': LocalJSX.AbButton & JSXBase.HTMLAttributes<HTMLAbButtonElement>;
      'ab-colors': LocalJSX.AbColors & JSXBase.HTMLAttributes<HTMLAbColorsElement>;
      'ab-layout-section': LocalJSX.AbLayoutSection & JSXBase.HTMLAttributes<HTMLAbLayoutSectionElement>;
      'ab-native-slider': LocalJSX.AbNativeSlider & JSXBase.HTMLAttributes<HTMLAbNativeSliderElement>;
      'ab-rating': LocalJSX.AbRating & JSXBase.HTMLAttributes<HTMLAbRatingElement>;
      'ab-slider': LocalJSX.AbSlider & JSXBase.HTMLAttributes<HTMLAbSliderElement>;
      'ab-toogle-button': LocalJSX.AbToogleButton & JSXBase.HTMLAttributes<HTMLAbToogleButtonElement>;
      'ab-toogle-group': LocalJSX.AbToogleGroup & JSXBase.HTMLAttributes<HTMLAbToogleGroupElement>;
    }
  }
}


