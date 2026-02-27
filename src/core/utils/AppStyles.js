import { AppColors } from './AppColors';

/**
 * AppStyles.js
 * Mirrors Flutter's AppStyles class.
 * Provides consistent typography and object-based styles for React Native.
 */
export const AppStyles = {
  // Text Styles
  largeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: AppColors.blackColor,
  },
  mediumText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: AppColors.blackColor,
  },
  smallText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: AppColors.greyColor,
  },

  // Input Decoration - converted to a shared object for TextInput styling
  inputDecoration: {
    container: {
      backgroundColor: AppColors.whiteColor,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: AppColors.borderColor,
      paddingVertical: 17,
      paddingHorizontal: 20,
    },
    label: {
      fontSize: 14,
      color: AppColors.greyColor,
      marginBottom: 5,
    },
    hint: {
      fontSize: 12,
      color: AppColors.greyColor,
    },
    focused: {
      borderColor: AppColors.secondaryColor,
    },
    error: {
      borderColor: AppColors.redColor,
    },
  },
};

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import { AppStyles } from './core/utils/AppStyles';
import { View, Text } from 'react-native';

const CardItem = () => {
  return (
    <View style={[AppStyles.cardShadow, AppStyles.roundedStyles]}>
      <Text style={AppStyles.typography.headline}>عنوان البطاقة</Text>
    </View>
  );
};
*/
