import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../features/splash/SplashScreen';
import LoginScreen from '../features/auth/login/presentation/pages/view';
import LayoutScreen from '../features/layout/LayoutScreen';
import WishlistScreen from '../features/wishlist/WishlistScreen';
import ProductListScreen from '../features/product_list/presentation/pages/view';
import ProductDetailsScreen from '../features/product_details/presentation/pages/view';

/**
 * Mirrors Flutter's go_router route paths.
 * Centralized route name registry — mirrors NamedRoutes class.
 */
export const Routes = {
  SPLASH: 'Splash',
  LOGIN: 'Login',
  LAYOUT: 'Layout',
  WISHLIST: 'WishlistView',
  PRODUCT_LIST: 'ProductList',
  PRODUCT_DETAILS: 'ProductDetails',
  PROFILE_ADDRESS: 'ProfileAddress',
  ORDER_HISTORY: 'OrderHistory',
  CHANGE_LANGUAGE: 'ChangeLanguage',
};

const Stack = createNativeStackNavigator();

/**
 * Root Navigator — mirrors Flutter's GoRouter configuration.
 * initialLocation = splash route (same as Flutter's NamedRoutes.i.splash)
 */
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.SPLASH}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={Routes.SPLASH} component={SplashScreen} />
        <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
        <Stack.Screen name={Routes.LAYOUT} component={LayoutScreen} />
        <Stack.Screen
          name={Routes.WISHLIST}
          component={WishlistScreen}
          options={{ headerShown: true, title: 'المفضلة' }}
        />
        <Stack.Screen
          name={Routes.PRODUCT_LIST}
          component={ProductListScreen}
          options={({ route }) => ({
            headerShown: true,
            title: route.params?.categoryName ?? 'Products',
          })}
        />
        <Stack.Screen
          name={Routes.PRODUCT_DETAILS}
          component={ProductDetailsScreen}
          options={({ route }) => ({
            headerShown: true,
            title: route.params?.name ?? 'Product Details',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import RootNavigator from './navigation/RootNavigator';

const App = () => {
  return <RootNavigator />;
};
*/
