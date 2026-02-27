// ─── ProductListScreen (Pure UI) ───────────────────────────────────────────
// Mirrors Flutter's ProductListView — zero business logic
// All state & logic lives in useProductList hook

import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from '../../../../../node_modules/react-i18next';
import { scale } from 'react-native-size-matters';
import { colors } from '../../../../core/themes/colors';
import { Routes } from '../../../../navigation/RootNavigator';

// Hook (business logic)
import useProductListController from '../controller/controller';

// Components
import ProductCard from './widgets/product_card';
import AppField from '../../../../components/AppField';
import { CustomProgress, PaginationLoading } from '../../../../components/Loading';

const ProductListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { t } = useTranslation();
  const { categoryUid = '', categoryName = '' } = route.params ?? {};

  const {
    products,
    loading,
    paginationLoading,
    searchText,
    setSearchText,
    loadMore,
  } = useProductListController(categoryUid);

  // ─── Navigation ──────────────────────────────────────────────────────────
  const handleProductTap = useCallback((product) => {
    navigation.push(Routes.PRODUCT_DETAILS, {
      sku: product.sku,
      name: product.name,
    });
  }, [navigation]);

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBarContainer}>
        <AppField.Text
          hintText={t('product_list.search_placeholder', { defaultValue: 'ابحث عن منتجات...' })}
          value={searchText}
          onChangeText={setSearchText}
          withBorder={true}
        />
      </View>

      {loading ? (
        <View style={styles.centered}>
          <CustomProgress size={scale(40)} color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.sku}
          numColumns={2}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={() => handleProductTap(item)} />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            <PaginationLoading isLoading={paginationLoading} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  searchBarContainer: {
    padding: scale(12),
  },
  grid: { paddingHorizontal: scale(12), paddingBottom: scale(20) },
});

export default ProductListScreen;
