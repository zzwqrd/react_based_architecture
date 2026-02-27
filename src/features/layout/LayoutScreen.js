import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { changeBottomNavIndex } from '../../store/slices/layoutSlice';
import FloatingBottomBar from '../../components/FloatingBottomBar';
import AppBarWidget from '../../components/AppBar';
import { colors } from '../../core/themes/colors';
import { useTranslation } from '../../../node_modules/react-i18next';

// Feature screens
import HomeScreen from '../home/HomeScreen';
import CategoryScreen from '../category/presentation/pages/view';
import CartScreen from '../cart/CartScreen';
import ProfileScreen from '../profile/ProfileScreen';

/**
 * Mirrors Flutter's LayoutView.
 * Houses the main TabBar layout with 4 tabs: Home, Categories, Cart, Account.
 */
const LayoutScreen = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentIndex = useSelector((state) => state.layout.currentIndex);

  const titles = [
    t('layout.home'),
    t('layout.categories'),
    t('layout.cart'),
    t('layout.account'),
  ];

  const pages = [
    <HomeScreen key="home" />,
    <CategoryScreen key="category" />,
    <CartScreen key="cart" />,
    <ProfileScreen key="profile" />,
  ];

  // Block hardware back button (mirrors Flutter's WillPopScope returning false)
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => true; // block back
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  const handleTabChange = (index) => {
    dispatch(changeBottomNavIndex(index));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent
      />
      {/* AppBar */}
      <AppBarWidget
        title={titles[currentIndex]}
        isSearch={true}
        showFavorites={true}
      />
      {/* Body — render the active tab */}
      <View style={styles.body}>
        {pages[currentIndex]}
      </View>
      {/* Floating Bottom Navigation */}
      <FloatingBottomBar
        currentIndex={currentIndex}
        onTap={handleTabChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  body: {
    flex: 1,
  },
});

export default LayoutScreen;
