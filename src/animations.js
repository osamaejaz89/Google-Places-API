// Animation configuration
const BASE_ANIMATION_CONFIG = {
  duration: 300,
  easing: 'ease-out',
  useNativeDriver: true,
};

// Common animation properties
const COMMON_FROM = {opacity: 0};
const COMMON_TO = {opacity: 1};

// Animation presets
export const Animations = {
  fadeIn: {
    ...BASE_ANIMATION_CONFIG,
    from: {...COMMON_FROM},
    to: {...COMMON_TO},
  },

  slideUp: {
    ...BASE_ANIMATION_CONFIG,
    from: {
      ...COMMON_FROM,
      translateY: 50,
    },
    to: {
      ...COMMON_TO,
      translateY: 0,
    },
  },

  scaleUp: {
    ...BASE_ANIMATION_CONFIG,
    from: {
      ...COMMON_FROM,
      scale: 0.9,
    },
    to: {
      ...COMMON_TO,
      scale: 1,
    },
  },

  // Additional animations can be easily added
  slideRight: {
    ...BASE_ANIMATION_CONFIG,
    from: {
      ...COMMON_FROM,
      translateX: -50,
    },
    to: {
      ...COMMON_TO,
      translateX: 0,
    },
  },

  // Custom animation generator
  createCustom: (fromProps, toProps, config = {}) => ({
    ...BASE_ANIMATION_CONFIG,
    ...config,
    from: {...COMMON_FROM, ...fromProps},
    to: {...COMMON_TO, ...toProps},
  }),
};

// Usage examples:
// 1. Using predefined animations
// import { Animations } from './animations';
// animation={Animations.fadeIn}

// 2. Creating custom animation
// const customAnim = Animations.createCustom(
//   { rotate: '90deg' },
//   { rotate: '0deg' },
//   { duration: 500 }
// );
