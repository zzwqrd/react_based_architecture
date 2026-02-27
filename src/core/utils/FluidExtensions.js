import { AppSizing } from './AppSizing';

/**
 * FluidExtensions.js
 * Mirrors Flutter's padding_extensions.dart.
 * Provides easy-to-use style objects for padding and margin.
 */

export const FluidExtensions = {
  // Padding All
  p1: { padding: AppSizing.spacing1 },
  p2: { padding: AppSizing.spacing2 },
  p3: { padding: AppSizing.spacing3 },
  p4: { padding: AppSizing.spacing4 },
  p5: { padding: AppSizing.spacing5 },
  p6: { padding: AppSizing.spacing6 },
  p8: { padding: AppSizing.spacing8 },

  // Padding Symmetric Horizontal
  px1: { paddingHorizontal: AppSizing.spacing1 },
  px2: { paddingHorizontal: AppSizing.spacing2 },
  px3: { paddingHorizontal: AppSizing.spacing3 },
  px4: { paddingHorizontal: AppSizing.spacing4 },
  px5: { paddingHorizontal: AppSizing.spacing5 },
  px6: { paddingHorizontal: AppSizing.spacing6 },

  // Padding Symmetric Vertical
  py1: { paddingVertical: AppSizing.spacing1 },
  py2: { paddingVertical: AppSizing.spacing2 },
  py3: { paddingVertical: AppSizing.spacing3 },
  py4: { paddingVertical: AppSizing.spacing4 },
  py5: { paddingVertical: AppSizing.spacing5 },
  py6: { paddingVertical: AppSizing.spacing6 },

  // Padding Only Top
  pt1: { paddingTop: AppSizing.spacing1 },
  pt2: { paddingTop: AppSizing.spacing2 },
  pt3: { paddingTop: AppSizing.spacing3 },
  pt4: { paddingTop: AppSizing.spacing4 },

  // Padding Only Bottom
  pb1: { paddingBottom: AppSizing.spacing1 },
  pb2: { paddingBottom: AppSizing.spacing2 },
  pb3: { paddingBottom: AppSizing.spacing3 },
  pb4: { paddingBottom: AppSizing.spacing4 },

  // Margin All
  m1: { margin: AppSizing.spacing1 },
  m2: { margin: AppSizing.spacing2 },
  m3: { margin: AppSizing.spacing3 },
  m4: { margin: AppSizing.spacing4 },

  // Margin Symmetric Horizontal
  mx1: { marginHorizontal: AppSizing.spacing1 },
  mx2: { marginHorizontal: AppSizing.spacing2 },
  mx4: { marginHorizontal: AppSizing.spacing4 },

  // Margin Symmetric Vertical
  my1: { marginVertical: AppSizing.spacing1 },
  my2: { marginVertical: AppSizing.spacing2 },
  my4: { marginVertical: AppSizing.spacing4 },

  // Alignment Helpers
  center: { alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  flex: { flex: 1 },
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { FluidExtensions } from './core/utils/FluidExtensions';
import { View, Text } from 'react-native';

const FluidBox = () => {
  return (
    <View style={[FluidExtensions.p4, FluidExtensions.m2, FluidExtensions.center]}>
      <Text>صندوق بتنسيقات مرنة جاهزة</Text>
    </View>
  );
};
*/
