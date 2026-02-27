import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../navigation/RootNavigator';

/**
 * Mirrors Flutter's AppBarWidget
 * Props:
 *  - onTap: optional callback for custom left action
 *  - title: optional text shown next to logo
 *  - isSearch: whether to show the search icon action
 *  - showFavorites: whether to show the favorites (heart) icon
 *  - svgIcon: not used directly; search icon controls it
 */
const AppBarWidget = ({ onTap, title, isSearch = false, showFavorites = false }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
      {/* Logo + Title */}
      <View style={styles.left}>
        {onTap ? (
          <TouchableOpacity onPress={onTap} style={styles.backBtn}>
            <Text style={{ fontSize: 20, color: colors.primary }}>{'←'}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.logoPlaceholder}>
            {/* Replace with actual <Image> for logo */}
            <Text style={styles.logoText}>FAKESTORE</Text>
          </View>
        )}
        {title ? <Text style={styles.title}>{title}</Text> : null}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {showFavorites && (
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.WISHLIST)}
            style={styles.actionBtn}
          >
            <Text style={{ fontSize: 18, color: colors.primary }}>♡</Text>
          </TouchableOpacity>
        )}
        {isSearch && (
          <TouchableOpacity
            onPress={() => navigation.navigate(Routes.PRODUCT_LIST)}
            style={styles.actionBtn}
          >
            <Text style={{ fontSize: 18, color: colors.primary }}>🔍</Text>
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
    backgroundColor: colors.white,
    elevation: 0,
    borderBottomWidth: 0,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginEnd: scale(8),
  },
  logoPlaceholder: {
    marginEnd: scale(8),
  },
  logoText: {
    fontWeight: '900',
    fontSize: scale(16),
    color: colors.primary,
  },
  title: {
    fontSize: scale(14),
    fontWeight: '900',
    color: colors.primary,
    marginStart: scale(8),
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    marginStart: scale(12),
  },
});

export default AppBarWidget;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import AppBarWidget from './components/AppBar';

const MyScreen = () => {
  return (
    <AppBarWidget 
      title="عنوان الشاشة" 
      onBackPress={() => console.log('رجوع')} 
      showBackButton={true}
    />
  );
};
*/
