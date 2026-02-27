/**
 * App.js — the root of the React Native application.
 *
 * Mirrors Flutter's MyApp widget:
 *  - Redux Provider  ← mirrors MultiBlocProvider
 *  - i18next setup   ← mirrors EasyLocalization
 *  - NavigationContainer is handled inside RootNavigator
 *  - I18nextProvider ← mirrors EasyLocalization context
 *  - LoadingDialogProvider to expose global LoadingDialog.show/hide
 */
import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { I18nextProvider } from './node_modules/react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import store from './src/store';
import i18n from './src/localization/i18n';
import RootNavigator from './src/navigation/RootNavigator';
import { LoadingDialogProvider } from './src/components/Loading';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <I18nextProvider i18n={i18n}>
            {/* Global loading dialog accessible via LoadingDialog.show() / .hide() */}
            <LoadingDialogProvider />
            {/* Main app navigation — mirrors MaterialApp.router with goRouter */}
            <RootNavigator />
          </I18nextProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default App;
