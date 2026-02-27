// ─── ProductCard Component ─────────────────────────────────────────────────
// Mirrors Flutter's ProductCard widget

import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../../../../core/themes/colors';
import AppText from '../../../../../components/AppText';

const ProductCard = ({ product, onPress }) => {
  const price = product.price_range?.minimum_price?.final_price?.value
    ?? product.price_range?.minimum_price?.regular_price?.value;
  const regularPrice = product.price_range?.minimum_price?.regular_price?.value;
  const discount = product.price_range?.minimum_price?.discount?.percent_off ?? 0;
  const currency = product.price_range?.minimum_price?.regular_price?.currency ?? 'EGP';
  const imageUrl = product.small_image?.url;
  const isOutOfStock = product.stock_status === 'OUT_OF_STOCK';
  const hasDiscount = discount > 0;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      disabled={isOutOfStock}
      activeOpacity={0.8}
    >
      {/* Out of stock overlay */}
      {isOutOfStock && (
        <View style={styles.outOfStockOverlay}>
          <AppText
            text="نفد من المخزون"
            color={colors.error}
            fontWeight="700"
            fontSize={scale(12)}
          />
        </View>
      )}

      {/* Product image */}
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
      )}

      {/* Discount badge */}
      {hasDiscount && (
        <View style={styles.discountBadge}>
          <AppText
            text={`${Math.round(discount)}%−`}
            color={colors.secondary}
            fontWeight="700"
            fontSize={scale(10)}
          />
        </View>
      )}

      {/* Name */}
      <AppText
        text={product.name}
        fontSize={scale(12)}
        fontWeight="600"
        color={colors.textPrimary}
        maxLines={2}
        style={{ marginTop: scale(8), lineHeight: scale(17) }}
      />

      {/* Price */}
      <View style={styles.priceRow}>
        {hasDiscount && regularPrice && (
          <AppText
            text={`${regularPrice} ${currency}`}
            color={colors.icon}
            fontSize={scale(11)}
            decoration="line-through"
          />
        )}
        {price && (
          <AppText
            text={`${price} ${currency}`}
            color={colors.primary}
            fontSize={scale(13)}
            fontWeight="700"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: scale(6),
    backgroundColor: colors.white,
    borderRadius: scale(12),
    padding: scale(12),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: verticalScale(120),
    borderRadius: scale(8),
  },
  priceRow: { marginTop: scale(4) },
  discountBadge: {
    position: 'absolute',
    top: scale(8),
    left: scale(8),
    backgroundColor: '#FFF0E8',
    borderRadius: scale(6),
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
  },
  outOfStockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default React.memo(ProductCard);
