// ─── CategoryScreen (Pure UI) ──────────────────────────────────────────────
// Mirrors Flutter's _CategoryBody — zero business logic, only renders UI
// All state & logic lives in useCategory hook

import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { colors } from '../../../../core/themes/colors';
import { Routes } from '../../../../navigation/RootNavigator';

// Hook (business logic)
import useCategoryController from '../controller/controller';

// Components (UI building blocks)
import SidebarItem from './widgets/sidebar_item';
import SubCategoryCard from './widgets/sub_category_item';
import CategoryBanner from './widgets/category_banner';
import { CustomProgress } from '../../../../components/Loading';
import AppButton from '../../../../components/AppButton';

const CategoryScreen = () => {
  const navigation = useNavigation();
  const {
    categories,
    selectedCategory,
    subCategories,
    loading,
    selectCategory,
  } = useCategoryController();

  // ─── Navigation handler ──────────────────────────────────────────────────
  const handleSubCategoryTap = useCallback((subCategory) => {
    navigation.push(Routes.PRODUCT_LIST, {
      categoryUid: String(subCategory.id),
      categoryName: subCategory.name,
    });
  }, [navigation]);

  // ─── Loading state ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.centered}>
        <CustomProgress size={scale(40)} color={colors.primary} />
      </View>
    );
  }

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <FlatList
          data={categories}
          keyExtractor={(item) => String(item.uid)}
          renderItem={({ item }) => (
            <SidebarItem
              category={item}
              isSelected={selectedCategory?.uid === item.uid}
              onPress={() => selectCategory(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <CategoryBanner
          categoryName={selectedCategory?.name ?? ''}
          subCategoryCount={subCategories.length}
        />

        {subCategories.length > 0 ? (
          <FlatList
            data={subCategories}
            keyExtractor={(item) => String(item.uid)}
            numColumns={2}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => (
              <SubCategoryCard
                category={item}
                onPress={() => handleSubCategoryTap(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.buttonWrapper}>
            <AppButton
              label="عرض المنتجات"
              onPress={() => handleSubCategoryTap(selectedCategory)}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#F5F5F5' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  sidebar: { width: scale(85), backgroundColor: '#F0F0F0' },
  content: { flex: 1 },
  grid: { paddingHorizontal: scale(8), paddingBottom: scale(20) },
  buttonWrapper: {
    padding: scale(16),
  },
});

export default CategoryScreen;
