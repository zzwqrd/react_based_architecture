// ─── ProductInfo Component ─────────────────────────────────────────────────
// Mirrors Flutter's ProductInfo widget

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors } from '../../../../../core/themes/colors';

const ProductInfo = ({
  product,
  priceInfo,
  hasDiscount,
  ratingSummary = 0,
  reviewCount = 0,
  isInWishlist,
  onToggleWishlist,
}) => {
  const { regularPrice, finalPrice, currency } = priceInfo;

  return (
    <View style={styles.container}>
      {/* Wishlist */}
      <TouchableOpacity onPress={onToggleWishlist} style={styles.wishlistBtn}>
        <Text style={{ fontSize: scale(22), color: isInWishlist ? colors.error : colors.icon }}>
          {isInWishlist ? '❤️' : '♡'}
        </Text>
      </TouchableOpacity>

      {/* SKU */}
      <Text style={styles.sku}>{product.sku}</Text>

      {/* Name */}
      <Text style={styles.name}>{product.name}</Text>

      {/* Price (right-aligned like Flutter) */}
      <View style={styles.priceRow}>
        {hasDiscount && (
          <Text style={styles.originalPrice}>
            {regularPrice?.toFixed(2)} {currency}
          </Text>
        )}
        <Text style={styles.finalPrice}>
          {(finalPrice ?? regularPrice)?.toFixed(2)} {currency}
        </Text>
      </View>

      {/* Discount badge */}
      {hasDiscount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>خصم {Math.round(priceInfo.discount)}%</Text>
        </View>
      )}

      {/* Rating */}
      {reviewCount > 0 && (
        <View style={styles.ratingRow}>
          <Text style={{ color: '#FFB800', fontSize: scale(16) }}>★</Text>
          <Text style={styles.ratingValue}>{(ratingSummary / 20).toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({reviewCount} تقييم)</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: scale(16) },
  wishlistBtn: { position: 'absolute', top: scale(16), right: scale(16), zIndex: 1 },
  sku: { fontSize: scale(11), color: colors.icon, textAlign: 'left' },
  name: { fontSize: scale(14), fontWeight: '700', color: colors.primary, marginTop: scale(8) },
  priceRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'flex-end', marginTop: scale(16),
  },
  originalPrice: {
    fontSize: scale(14), color: colors.icon,
    textDecorationLine: 'line-through', marginEnd: scale(8),
  },
  finalPrice: { fontSize: scale(16), fontWeight: '700', color: colors.primary },
  discountBadge: {
    backgroundColor: '#FFF0E8', borderRadius: scale(6), alignSelf: 'flex-start',
    paddingHorizontal: scale(10), paddingVertical: scale(4), marginTop: scale(8),
  },
  discountText: { fontSize: scale(11), color: colors.secondary, fontWeight: '700' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: scale(12) },
  ratingValue: { fontSize: scale(14), fontWeight: '700', color: colors.textPrimary, marginStart: scale(4) },
  reviewCount: { fontSize: scale(12), color: colors.icon, marginStart: scale(4) },
});

export default React.memo(ProductInfo);
