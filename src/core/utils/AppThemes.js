import { AppColors } from './AppColors';
import { AppStyles } from './AppStyles';

/**
 * AppThemes.js
 * Mirrors Flutter's app_themes.dart.
 */

export const lightTheme = {
  dark: false,
  colors: {
    primary: AppColors.mainColor,
    background: AppColors.scaffoldBackgroundColor,
    card: AppColors.whiteColor,
    text: AppColors.blackColor,
    border: AppColors.borderColor,
    notification: AppColors.secondaryColor,
    error: AppColors.redColor,
  },
  typography: AppStyles,
};

export const darkTheme = {
  dark: true,
  colors: {
    primary: AppColors.mainColor,
    background: AppColors.darkScaffoldBackgroundColor,
    card: AppColors.darkSecondaryColor,
    text: AppColors.darkTextColor,
    border: AppColors.darkGreyColor,
    notification: AppColors.secondaryColor,
    error: AppColors.redColor,
  },
  typography: AppStyles,
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { AppThemes } from './core/utils/AppThemes';
import { ThemeProvider } from 'styled-components/native'; // أو أي مكتبة ثيمات أخرى

const App = () => {
  // افترض أن لدينا حالة للتبديل بين الثيم المضيء والمظلم
  const currentTheme = isDarkMode ? AppThemes.dark : AppThemes.light;

  return (
    <ThemeProvider theme={currentTheme}>
      <RootNavigator />
    </ThemeProvider>
  );
};
*/
