import React, { useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { useTranslation } from '../../node_modules/react-i18next';
import { colors } from '../core/themes/colors';

/**
 * Mirrors Flutter's FloatingBottomBar widget.
 * Animated pill container expands to show label when selected.
 */
const FloatingBottomBar = ({ currentIndex, onTap }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const items = [
    { label: t('layout.home'),       icon: '🏠' },
    { label: t('layout.categories'), icon: '📦' },
    { label: t('layout.cart'),       icon: '🛒' },
    { label: t('layout.account'),    icon: '👤' },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {items.map((item, index) => {
          const isSelected = currentIndex === index;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onTap(index)}
              activeOpacity={0.85}
              style={[
                styles.navItem,
                isSelected && styles.navItemSelected,
              ]}
            >
              <Text style={{ fontSize: scale(16) }}>{item.icon}</Text>
              {isSelected && (
                <Text style={[
                  styles.label,
                  { fontSize: isAr ? scale(12) : scale(8) }
                ]}>
                  {item.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: scale(10),
    paddingBottom: verticalScale(20),
    backgroundColor: 'transparent',
  },
  container: {
    height: verticalScale(64),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.white,
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    borderRadius: 25,
    minWidth: scale(50),
  },
  navItemSelected: {
    backgroundColor: colors.primary,
    minWidth: scale(80),
  },
  label: {
    color: colors.white,
    fontWeight: 'bold',
    marginStart: scale(4),
  },
});

export default FloatingBottomBar;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import FloatingBottomBar from './components/FloatingBottomBar';

const MainScreen = () => {
  return (
    <FloatingBottomBar 
      isVisible={true}
      items={[
        { id: 1, title: 'الرئيسية', icon: 'home' },
        { id: 2, title: 'حسابي', icon: 'person' },
      ]}
      onItemPress={(item) => console.log('تم اختيار:', item.title)}
    />
  );
};
*/
