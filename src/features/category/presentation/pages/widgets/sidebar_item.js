// ─── SidebarItem Component ─────────────────────────────────────────────────
// Mirrors Flutter's SidebarItem widget

import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../../../../core/themes/colors';
import { buildCategoryImageUrl } from '../../../data/datasources/remote_data_source';
import AppText from '../../../../../components/AppText';

const SidebarItem = ({ category, isSelected, onPress }) => {
  const imageUrl = buildCategoryImageUrl(category.image);

  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selected]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {isSelected && <View style={styles.indicator} />}
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
      )}
      <AppText
        text={category.name}
        fontSize={scale(9)}
        fontWeight={isSelected ? '700' : '500'}
        color={isSelected ? colors.primary : colors.textSecondary}
        align="center"
        maxLines={2}
        style={{ marginTop: scale(4) }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(4),
  },
  selected: {
    backgroundColor: '#FFFFFF',
  },
  indicator: {
    width: scale(4),
    height: '100%',
    backgroundColor: colors.primary,
    position: 'absolute',
    left: 0,
    top: 0,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  image: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(8),
  },
});

export default React.memo(SidebarItem);
