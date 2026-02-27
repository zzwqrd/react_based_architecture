// ─── CategoryBanner Component ──────────────────────────────────────────────
// Mirrors the banner section in Flutter's CategoryView

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors } from '../../../../../core/themes/colors';

const CategoryBanner = ({ categoryName, subCategoryCount }) => (
  <View style={styles.banner}>
    <Text style={styles.title}>{categoryName}</Text>
    <Text style={styles.subtitle}>
      {subCategoryCount} أقسام فرعية
    </Text>
  </View>
);

const styles = StyleSheet.create({
  banner: {
    margin: scale(12),
    padding: scale(16),
    backgroundColor: '#E8F5E9',
    borderRadius: scale(12),
  },
  title: {
    fontSize: scale(14),
    fontWeight: '700',
    color: colors.primary,
  },
  subtitle: {
    fontSize: scale(10),
    color: colors.primary,
    marginTop: scale(4),
  },
});

export default React.memo(CategoryBanner);
