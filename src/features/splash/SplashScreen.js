import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StorageHelper from '../../core/services/StorageHelper';
import { Routes } from '../../navigation/RootNavigator';
import { AppAssets, AlignmentExtensions, WidgetExtensions, AppColors } from '../../core/utils';

/**
 * Mirrors Flutter's SplashView.
 * Checks auth token on mount, then navigates to Layout or Login.
 */
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await new Promise((r) => setTimeout(r, 2000)); // 2 second splash delay
        const token = await StorageHelper.getToken();
        const nextRoute = token ? Routes.LAYOUT : Routes.LOGIN;
        navigation.replace(nextRoute);
      } catch {
        navigation.replace(Routes.LOGIN);
      }
    };
    checkAuth();
  }, [navigation]);

  return (
    <View style={[WidgetExtensions.flex1, AlignmentExtensions.center, { backgroundColor: AppColors.onthewayColor }]}>
      <Image
        source={AppAssets.icons.logo}
        style={{ width: '80%', height: '80%' }}
        resizeMode="contain"
      />

    </View>
  );
};

export default SplashScreen;
