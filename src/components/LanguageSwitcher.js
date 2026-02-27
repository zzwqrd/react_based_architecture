import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  I18nManager,
} from 'react-native';
import { useTranslation } from '../../node_modules/react-i18next';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';
import AppText from './AppText';
import CustomImage from './CustomImage';
import SharedPrefHelper from '../core/services/SharedPrefHelper';
import RNRestart from 'react-native-restart'; // Often needed for RTL change

const languages = [
  {
    code: 'en',
    name: 'English',
    image: 'https://flagcdn.com/w320/gb.png',
  },
  {
    code: 'ar',
    name: 'العربية',
    image: 'https://flagcdn.com/w320/sa.png',
  },
];

/**
 * LanguageSwitcher component mirroring Flutter's ChangeLanguageView logic.
 */
const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [currentLanguageCode, setCurrentLanguageCode] = useState(i18n.language);

  useEffect(() => {
    const loadLang = async () => {
      const code = await SharedPrefHelper.getLanguageCode();
      setCurrentLanguageCode(code);
    };
    loadLang();
  }, []);

  const changeLanguage = async (code, name) => {
    try {
      await i18n.changeLanguage(code);
      await SharedPrefHelper.setLanguageCode(code);
      setCurrentLanguageCode(code);

      // Handle RTL change
      const isRTL = code === 'ar';
      if (I18nManager.isRTL !== isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
        
        Alert.alert(
          t('common.language_changed') || 'Language Changed',
          t('common.restart_required') || 'The app needs to restart to apply changes.',
          [
            { 
              text: t('common.restart') || 'Restart Now', 
              onPress: () => RNRestart.Restart() 
            }
          ]
        );
      } else {
        Alert.alert(t('common.success') || 'Success', `${t('common.language_changed_to') || 'Language changed to'} ${name}`);
      }
    } catch (e) {
      console.error('Error changing language:', e);
      Alert.alert(t('common.error') || 'Error', t('common.language_change_failed') || 'Failed to change language');
    }
  };

  return (
    <View style={styles.container}>
      {languages.map((language) => {
        const isSelected = currentLanguageCode === language.code;
        return (
          <TouchableOpacity
            key={language.code}
            onPress={() => changeLanguage(language.code, language.name)}
            activeOpacity={0.7}
            style={[
              styles.item,
              isSelected && styles.selectedItem,
            ]}
          >
            <View style={styles.content}>
               <CustomImage 
                url={language.image} 
                width={scale(24)} 
                height={scale(24)} 
                borderRadius={scale(8)}
              />
              <View style={{ width: scale(16) }} />
              <AppText
                text={language.name}
                fontSize={scale(16)}
                fontWeight={isSelected ? '600' : '400'}
                color={isSelected ? colors.primary : colors.textPrimary}
              />
              <View style={{ flex: 1 }} />
              {isSelected && (
                <AppText
                  text="✓"
                  fontSize={scale(18)}
                  color={colors.primary}
                  fontWeight="bold"
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scale(16),
  },
  item: {
    height: verticalScale(56),
    borderRadius: scale(8),
    backgroundColor: colors.white,
    marginBottom: verticalScale(10),
    paddingHorizontal: scale(16),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    // Shadow for Android/iOS
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selectedItem: {
    backgroundColor: colors.primary + '14', // 0.08 opacity
    borderColor: colors.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default LanguageSwitcher;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import LanguageSwitcher from './components/LanguageSwitcher';

const SettingsScreen = () => {
  return (
    <LanguageSwitcher 
      currentLanguage="ar" 
      onLanguageSelect={(lang) => console.log('تم تغيير اللغة إلى:', lang)} 
    />
  );
};
*/
