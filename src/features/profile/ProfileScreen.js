import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from '../../../node_modules/react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale } from 'react-native-size-matters';
import { logout } from '../../store/slices/authSlice';
import { colors } from '../../core/themes/colors';
import { Routes } from '../../navigation/RootNavigator';

/**
 * Mirrors Flutter's ProfileView.
 * Shows user info with navigation to sub-sections: orders, addresses, language, logout.
 */
const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
    dispatch(logout());
    navigation.replace(Routes.LOGIN);
  };

  const menuItems = [
    { label: t('account.order_history'), icon: '📦', onPress: () => navigation.navigate(Routes.ORDER_HISTORY) },
    { label: t('profile.change_password'), icon: '🔑', onPress: () => {} },
    { label: t('account.addresses'), icon: '📍', onPress: () => navigation.navigate(Routes.PROFILE_ADDRESS) },
    { label: t('account.language_menu'), icon: '🌐', onPress: () => navigation.navigate(Routes.CHANGE_LANGUAGE) },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: verticalScale(100) }}>
      {/* User info card */}
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase() ?? '👤'}</Text>
        </View>
        <Text style={styles.userName}>{user?.name ?? (isAuth ? t('profile.title') : 'Guest')}</Text>
        {user?.email && <Text style={styles.userEmail}>{user.email}</Text>}
      </View>

      {/* Menu items */}
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      {isAuth && (
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>{t('profile.logout')}</Text>
        </TouchableOpacity>
      )}
      {!isAuth && (
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate(Routes.LOGIN)}
        >
          <Text style={styles.loginText}>{t('auth.login_button')}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  userCard: {
    backgroundColor: colors.white, margin: scale(16), borderRadius: scale(16),
    padding: scale(24), alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 3,
  },
  avatar: {
    width: scale(64), height: scale(64), borderRadius: scale(32),
    backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
    marginBottom: scale(12),
  },
  avatarText: { fontSize: scale(28), color: colors.white, fontWeight: '700' },
  userName: { fontSize: scale(18), fontWeight: '700', color: colors.textPrimary },
  userEmail: { fontSize: scale(13), color: colors.textSecondary, marginTop: scale(4) },
  menu: {
    backgroundColor: colors.white, margin: scale(16), borderRadius: scale(16),
    overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 3,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16), borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  menuIcon: { fontSize: scale(20), marginEnd: scale(16) },
  menuLabel: { flex: 1, fontSize: scale(15), color: colors.textPrimary, fontWeight: '500' },
  menuArrow: { fontSize: scale(20), color: colors.icon },
  logoutBtn: {
    margin: scale(16), backgroundColor: '#FFF4F4', borderRadius: scale(12),
    padding: scale(16), alignItems: 'center',
  },
  logoutText: { fontSize: scale(15), fontWeight: '700', color: colors.error },
  loginBtn: {
    margin: scale(16), backgroundColor: colors.primary, borderRadius: scale(12),
    padding: scale(16), alignItems: 'center',
  },
  loginText: { fontSize: scale(15), fontWeight: '700', color: colors.white },
});

export default ProfileScreen;
