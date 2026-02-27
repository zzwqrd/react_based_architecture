import { colors } from './colors';
import { typography, spacing } from './typography';

export const lightTheme = {
  dark: false,
  colors: {
    primary: colors.primary,
    background: colors.bgLight,
    card: colors.cardBg,
    text: colors.textPrimary,
    border: colors.border,
    notification: colors.secondary,
    // Add custom semantic mappings
    error: colors.error,
    success: colors.success,
  }
};

export const darkTheme = {
  dark: true,
  colors: {
    primary: colors.primary,
    background: colors.bgDark,
    card: colors.bgDark, 
    text: colors.textDark,
    border: colors.darkGray,
    notification: colors.secondary,
    error: colors.error,
    success: colors.success,
  }
};

export const theme = {
  colors,
  typography,
  spacing,
  lightTheme,
  darkTheme,
};
