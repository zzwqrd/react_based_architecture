import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';

/**
 * SecondaryButton.js
 * Mirrors Flutter's SecondaryButton (secondary_button.dart).
 */
const SecondaryButton = ({
  height,
  width,
  text,
  icon,
  onTap,
  borderColor,
  buttonColor = '#01BE5F',
  textColor = '#FFFFFF',
}) => {
  return (
    <TouchableOpacity
      onPress={onTap}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          height: height,
          width: width || 'auto',
          backgroundColor: buttonColor,
          borderColor: borderColor || 'transparent',
          borderWidth: borderColor ? 1 : 0,
        },
      ]}
    >
      <View style={styles.content}>
        {icon && (
          <View style={styles.iconContainer}>
            {/* Icon placeholder - assuming SVG or Image */}
            <Text style={{ color: textColor }}>📍</Text> 
          </View>
        )}
        <Text style={[styles.text, { color: textColor }]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(16),
  },
  iconContainer: {
    marginEnd: scale(8),
  },
  text: {
    fontSize: scale(16),
    fontWeight: '700',
  },
});

export default SecondaryButton;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import SecondaryButton from './components/SecondaryButton';

const ActionScreen = () => {
  return (
    <SecondaryButton 
      title="إلغاء" 
      onPress={() => console.log('تم التراجع')} 
      style={{ marginHorizontal: 16 }}
    />
  );
};
*/
