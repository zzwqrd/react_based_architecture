// ─── SubCategoryCard Component ─────────────────────────────────────────────
// Mirrors Flutter's SubCategoryItem widget

import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors } from '../../../../../core/themes/colors';
import { buildCategoryImageUrl } from '../../../data/datasources/remote_data_source';
import AppText from '../../../../../components/AppText';

const SubCategoryCard = ({ category, onPress }) => {
  const imageUrl = buildCategoryImageUrl(category.image);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
      )}
      <AppText
        text={category.name}
        fontSize={scale(11)}
        fontWeight="600"
        color={colors.textPrimary}
        align="center"
        maxLines={2}
        style={{ marginTop: scale(8) }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: scale(6),
    backgroundColor: '#FFFFFF',
    borderRadius: scale(12),
    padding: scale(12),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: scale(60), height: scale(60) },
});

export default React.memo(SubCategoryCard);
