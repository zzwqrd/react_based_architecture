/**
 * react-native.config.js
 *
 * Tells React Native CLI where to find custom fonts and assets
 * so they get linked correctly on both Android and iOS.
 *
 * Run after any asset changes:
 *   npx react-native-asset    (for linking fonts)
 * or:
 *   npx react-native link     (deprecated, but assets still work)
 */
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: [
    './src/assets/fonts/',  // Cairo font family (8 weights)
    './src/assets/icons/',  // PNG, GIF icons
    './src/assets/lottie/', // Lottie JSON animations
  ],
};
