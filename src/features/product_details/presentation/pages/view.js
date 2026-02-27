// ─── ProductDetailsScreen (Pure UI) ────────────────────────────────────────
// Mirrors Flutter's ProductDetailsView — zero business logic
// All state & logic lives in useProductDetails hook

import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from '../../../../../node_modules/react-i18next';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../../../core/themes/colors';

// Hook (business logic)
import useProductDetailsController from '../controller/controller';

// Components (UI building blocks)
import ImageSlider from './widgets/image_slider';
import ProductInfo from './widgets/product_info';
import BottomActionBar from './widgets/bottom_action_bar';
import ReviewCard from './widgets/review_card';

const ProductDetailsScreen = () => {
  const route = useRoute();
  const { t } = useTranslation();
  const { sku = '' } = route.params ?? {};

  const {
    product, loading, qty, selectedTab, currentImageIndex,
    priceInfo, hasDiscount, mediaGallery, isOutOfStock,
    reviews, descriptionText, isInWishlist, isInCart,
    setSelectedTab, setCurrentImageIndex,
    incrementQty, decrementQty, addToCart, toggleWishlist,
  } = useProductDetailsController(sku);

  // ─── Loading ─────────────────────────────────────────────────────────────
  if (loading) {
    return <View style={styles.centered}><ActivityIndicator size="large" color={colors.primary} /></View>;
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFound}>
          {t('product_details.not_found', { defaultValue: 'المنتج غير موجود' })}
        </Text>
      </View>
    );
  }

  const totalPrice = (priceInfo.finalPrice ?? priceInfo.regularPrice ?? 0) * qty;

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Slider */}
        <ImageSlider
          images={mediaGallery}
          currentIndex={currentImageIndex}
          onIndexChange={setCurrentImageIndex}
        />

        {/* Product Info */}
        <ProductInfo
          product={product}
          priceInfo={priceInfo}
          hasDiscount={hasDiscount}
          ratingSummary={product.rating_summary}
          reviewCount={product.review_count}
          isInWishlist={isInWishlist}
          onToggleWishlist={toggleWishlist}
        />

        {/* Tabs */}
        <View style={styles.tabs}>
          {['description', 'reviews'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.tabActive]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                {tab === 'description'
                  ? t('product_details.description_tab', { defaultValue: 'الوصف' })
                  : t('product_details.reviews_tab', { defaultValue: 'التقييمات' })}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {selectedTab === 'description' ? (
            descriptionText
              ? <Text style={styles.description}>{descriptionText}</Text>
              : <Text style={styles.empty}>{t('product_details.no_description', { defaultValue: 'لا يوجد وصف' })}</Text>
          ) : (
            reviews.length > 0
              ? reviews.map((r, idx) => <ReviewCard key={`review-${idx}`} review={r} />)
              : <Text style={styles.empty}>{t('product_details.no_reviews', { defaultValue: 'لا توجد تقييمات' })}</Text>
          )}
        </View>

        <View style={{ height: verticalScale(100) }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <BottomActionBar
        isOutOfStock={isOutOfStock}
        isInCart={isInCart}
        qty={qty}
        totalPrice={totalPrice}
        currency={priceInfo.currency}
        onIncrement={incrementQty}
        onDecrement={decrementQty}
        onAddToCart={addToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { fontSize: scale(16), color: colors.textSecondary },

  // Tabs
  tabs: {
    flexDirection: 'row', borderBottomWidth: 1,
    borderBottomColor: colors.border, marginTop: scale(8),
  },
  tab: { flex: 1, paddingVertical: scale(12), alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  tabText: { fontSize: scale(14), color: colors.icon, fontWeight: '500' },
  tabTextActive: { color: colors.primary, fontWeight: '700' },

  // Tab Content
  tabContent: { padding: scale(16), minHeight: verticalScale(150) },
  description: { fontSize: scale(13), color: colors.textSecondary, lineHeight: scale(22) },
  empty: { fontSize: scale(13), color: colors.icon, textAlign: 'center', marginTop: scale(20) },
});

export default ProductDetailsScreen;
