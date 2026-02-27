import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Image, StyleSheet, ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from '../../../node_modules/react-i18next';
import { scale, verticalScale } from 'react-native-size-matters';
import { toggleWishlistItem } from '../../store/slices/wishlistSlice';
import { colors } from '../../core/themes/colors';

/**
 * Mirrors Flutter's WishlistView.
 * Shows items from Redux wishlist store with remove option.
 */
const WishlistScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.wishlist);

  if (loading) {
    return <View style={styles.centered}><ActivityIndicator color={colors.primary} size="large" /></View>;
  }

  if (items.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: scale(48) }}>❤️</Text>
        <Text style={styles.emptyText}>{t('wishlist.page_title')}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.sku}
      numColumns={2}
      contentContainerStyle={{ padding: scale(12) }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.removeBtn}
            onPress={() => dispatch(toggleWishlistItem(item))}
          >
            <Text style={{ color: colors.error, fontSize: scale(18) }}>❤️</Text>
          </TouchableOpacity>
          {item.imageUrl && (
            <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="contain" />
          )}
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.price}>{item.price} {t('product_list.currency_symbol')}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: scale(16), color: colors.textSecondary, marginTop: scale(12) },
  card: {
    flex: 1, margin: scale(6), backgroundColor: colors.white,
    borderRadius: scale(12), padding: scale(12),
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  removeBtn: { position: 'absolute', top: scale(8), end: scale(8), zIndex: 1 },
  image: { width: '100%', height: verticalScale(110), borderRadius: scale(8) },
  name: { fontSize: scale(12), color: colors.textPrimary, fontWeight: '500', marginTop: scale(6) },
  price: { fontSize: scale(13), color: colors.primary, fontWeight: '700', marginTop: scale(4) },
});

export default WishlistScreen;
