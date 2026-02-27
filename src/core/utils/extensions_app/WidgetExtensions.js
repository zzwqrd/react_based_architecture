import { StyleSheet } from 'react-native';

/**
 * WidgetExtensions.js
 * Mirrors Flutter's WidgetExtensions.
 * Provides style objects for basic widget properties.
 */

export const WidgetExtensions = StyleSheet.create({
  // Visibility & Opacity
  hidden: { display: 'none' },
  transparent: { opacity: 0 },
  semiTransparent: { opacity: 0.5 },
  opaque: { opacity: 1 },

  // Flex Management
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex3: { flex: 3 },
  flexNone: { flex: 0 },

  // Layout Direction Helpers (Analogous to Row/Column usage in extensions)
  row: { flexDirection: 'row', alignItems: 'center' },
  column: { flexDirection: 'column' },
  
  // Elevation (Material Design) - RN mapping to shadows for iOS/Android
  elevation0: { elevation: 0, shadowOpacity: 0 },
  elevation1: { elevation: 1, shadowOpacity: 0.1, shadowRadius: 1, shadowOffset: { width: 0, height: 1 } },
  elevation2: { elevation: 2, shadowOpacity: 0.1, shadowRadius: 2, shadowOffset: { width: 0, height: 2 } },
  elevation4: { elevation: 4, shadowOpacity: 0.15, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  elevation8: { elevation: 8, shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },

  // Clipping
  clipOval: { borderRadius: 1000, overflow: 'hidden' },
  clipRect: { overflow: 'hidden' },
});

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { WidgetExtensions } from './core/utils/extensions_app/WidgetExtensions';
import { View, Text } from 'react-native';

const FlexScreen = () => {
  return (
    <View style={[WidgetExtensions.flex1, WidgetExtensions.row]}>
      <Text style={WidgetExtensions.flex2}>يشغل مساحة مزدوجة</Text>
      <Text style={WidgetExtensions.flex1}>يشغل مساحة فردية</Text>
    </View>
  );
};
*/
