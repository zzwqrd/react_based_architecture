import { StyleSheet } from 'react-native';

/**
 * AlignmentExtensions.js
 * Mirrors Flutter's AlignmentExtensions on Widget.
 * Provides style objects for alignment and positioning.
 */

export const AlignmentExtensions = StyleSheet.create({
  // Alignment Styles
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLeft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centerRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  topCenter: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  topLeft: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  topRight: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  bottomCenter: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomLeft: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  bottomRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  // Positioning Shortcuts
  positionedFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

/**
 * Functional Positioned Helper
 */
export const positioned = (params = {}) => ({
  position: 'absolute',
  top: params.top,
  bottom: params.bottom,
  left: params.left,
  right: params.right,
  width: params.width,
  height: params.height,
});

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { AlignmentExtensions, positioned } from './core/utils/extensions_app/AlignmentExtensions';
import { View, Text } from 'react-native';

const CenteredApp = () => {
  return (
    <View style={AlignmentExtensions.center}>
      <Text>موضوع في المنتصف</Text>
      
      <View style={positioned({ top: 10, left: 10 })}>
        <Text>موضوع في الزاوية العلوية</Text>
      </View>
    </View>
  );
};
*/
