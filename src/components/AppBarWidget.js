import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import MyTextApp from './AppText';
import { colors } from '../core/themes/colors';
import { CustomImage } from './CustomImage';
import AppAssets from '../core/utils/AppAssets';

/**
 * AppBarWidget.js
 * Mirrors Flutter's AppBarWidget (appbar.dart).
 */
const AppBarWidget = ({
  onTap,
  svgIcon,
  title,
  isSearch,
  favoritesIcon,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {/* Logo */}
        <CustomImage 
          url={AppAssets.icons.logo} 
          width={scale(73)}
        />
        {title && (
          <Text style={styles.title}>
            {title}
          </Text>
        )}
      </View>
      
      <View style={styles.actions}>
        {favoritesIcon && (
          <TouchableOpacity onPress={() => navigation.navigate('WishlistView')}>
            {/* Heart Icon placeholder */}
            <Text style={{ color: colors.mainColor, fontSize: scale(20) }}>❤️</Text>
          </TouchableOpacity>
        )}
        
        {isSearch && svgIcon && (
          <TouchableOpacity 
            onPress={() => navigation.navigate('SearchView')}
            style={{ marginStart: scale(16) }}
          >
            <CustomImage 
              url={svgIcon} 
              width={scale(20)} 
              color={colors.mainColor} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    backgroundColor: colors.white, // context.backgroundColorApp
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(14),
    fontWeight: '900',
    color: colors.mainColor,
    marginStart: scale(12),
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AppBarWidget;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import AppBarWidget from './components/AppBarWidget';

const DetailsScreen = () => {
  return (
    <AppBarWidget 
      title="التفاصيل" 
      showBackButton={true}
      actions={[<Button title="حفظ" key="save" />]}
    />
  );
};
*/
