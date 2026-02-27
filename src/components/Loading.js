import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';
import { colors } from '../core/themes/colors';
import { scale, verticalScale } from 'react-native-size-matters';
import { CustomImage } from './CustomImage'; 
import AppText from './AppText';
import AppAssets from '../core/utils/AppAssets';

/**
 * Mirrors Flutter's CustomProgress widget.
 */
export const CustomProgress = ({
  size = scale(25),
  color,
  strokeWidth = 2,
  value,
  backgroundColor,
}) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator
      size={size < 30 ? 'small' : 'large'}
      color={color || colors.primary}
    />
  </View>
);

/**
 * Mirrors Flutter's LoadingApp widget (centered full progress indicator).
 */
export const LoadingApp = () => (
  <View style={styles.centered}>
    <CustomProgress size={scale(25)} />
  </View>
);

/**
 * Mirrors Flutter's LoadingImage widget.
 */
export const LoadingImage = ({ size, borderRadius, border }) => (
  <View
    style={[
      {
        width: size || scale(70),
        height: size || scale(70),
        borderRadius: borderRadius || 0,
        borderWidth: border ? 1 : 0,
        borderColor: border?.color || colors.border || '#ddd',
      },
      styles.centered,
    ]}
  >
    <CustomImage 
       url={AppAssets.icons.logo} 
       color={colors.icon} 
       width={scale(50)} 
    />
  </View>
);

/**
 * Mirrors Flutter's PaginationLoading widget.
 */
export const PaginationLoading = ({ isLoading, title = "Loading..." }) => {
  if (!isLoading) return null;
  return (
    <View style={styles.paginationContainer}>
      <CustomProgress size={scale(12)} color={colors.white} />
      <View style={{ width: scale(8) }} />
      <AppText.Small 
        title={title} 
        color={colors.white} 
        fontSize={scale(12)} 
      />
    </View>
  );
};

/**
 * Mirrors Flutter's LoadingDialog (static show/hide).
 * Requires LoadingDialogProvider to be mounted at the top level.
 */
let _loadingDialogVisible = false;
let _setVisible = null;

export const LoadingDialogProvider = () => {
  const [visible, setVisible] = React.useState(false);
  
  React.useEffect(() => {
    _setVisible = setVisible;
    return () => {
      _setVisible = null;
    };
  }, []);

  return (
    <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
      <View style={styles.dialogOverlay}>
        <View style={styles.dialogContent}>
          <CustomProgress size={scale(35)} color={colors.white} />
        </View>
      </View>
    </Modal>
  );
};

export const LoadingDialog = {
  show: () => {
    if (!_loadingDialogVisible && _setVisible) {
      _loadingDialogVisible = true;
      _setVisible(true);
    }
  },
  hide: () => {
    if (_loadingDialogVisible && _setVisible) {
      _loadingDialogVisible = false;
      _setVisible(false);
    }
  },
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationContainer: {
    width: '100%',
    paddingVertical: verticalScale(6),
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  dialogContent: {
    borderRadius: scale(12),
    padding: scale(24),
    backgroundColor: 'transparent',
  },
});

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import Loading from './components/Loading';

const DataScreen = () => {
  // if (isLoading) return <Loading />;
  
  return (
    <Loading 
      color="#00A585" 
      size="large" 
    />
  );
};
*/
