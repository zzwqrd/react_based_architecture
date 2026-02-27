import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from '../../../node_modules/react-i18next';
import { scale, verticalScale } from 'react-native-size-matters';
import ApiClient from '../../core/services/ApiClient';
import { colors } from '../../core/themes/colors';
import { Routes } from '../../navigation/RootNavigator';
import { RequestState } from '../../core/utils/Enums';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * Mirrors Flutter's HomeView with:
 * - Best Sellers horizontal scroll
 * - Most Searched horizontal scroll
 * - New Arrivals horizontal scroll
 * - Special Offers horizontal scroll
 * - Promotional Banners interleaved
 * - Category section
 * - Slider (scrollable banner at top)
 */
const HomeScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [requestState, setRequestState] = useState(RequestState.loading);
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    fetchHome();
  }, []);

  const fetchHome = async () => {
    setRequestState(RequestState.loading);
    try {
      const res = await ApiClient.get('/api/home?page=1&per_page=10');
      if (res.data) {
        setHomeData(res.data);
        setRequestState(RequestState.done);
      } else {
        setRequestState(RequestState.empty);
      }
    } catch {
      setRequestState(RequestState.error);
    }
  };

  const navigateToProductDetails = (sku, name) => {
    navigation.navigate(Routes.PRODUCT_DETAILS, { sku, name });
  };

  const navigateToProductList = (categoryUid, categoryName) => {
    navigation.navigate(Routes.PRODUCT_LIST, { categoryUid, categoryName });
  };

  const renderProductCard = (product, onCardTap) => (
    <TouchableOpacity key={product.sku} onPress={onCardTap} style={styles.productCard}>
      <Image
        source={{ uri: product.imageUrl || product.image_url }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price} {t('product_list.currency_symbol')}</Text>
    </TouchableOpacity>
  );

  const renderHorizontalSection = (title, products, onTap) => {
    if (!products || products.length === 0) return null;
    return (
      <View>
        <Text style={styles.sectionTitle}>{title}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {products.map((product) =>
            renderProductCard(product, () => onTap(product))
          )}
        </ScrollView>
      </View>
    );
  };

  const renderBanner = (banner, index) => {
    if (!banner) return null;
    return (
      <TouchableOpacity
        key={`banner-${index}`}
        style={styles.bannerContainer}
        onPress={() => navigateToProductList(banner.categoryId, banner.categoryName)}
      >
        <Image
          source={{ uri: banner.imageUrl }}
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  if (requestState === RequestState.loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (requestState === RequestState.error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{t('errors.something_went_wrong')}</Text>
        <TouchableOpacity onPress={fetchHome} style={styles.retryBtn}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const banners = homeData?.promotionalBanners ?? [];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Slider */}
      {banners.length > 0 && renderBanner(banners[0], 0)}

      {/* Categories */}
      <Text style={styles.sectionTitle}>{t('home.categories')}</Text>

      {/* Best Sellers */}
      {renderHorizontalSection(
        homeData?.bestSellerTitle ?? 'الأفضل مبيعاً',
        homeData?.bestSellerProducts,
        (p) => navigateToProductDetails(p.sku, p.name)
      )}

      {banners.length > 1 && renderBanner(banners[1], 1)}

      {/* Most Searched */}
      {renderHorizontalSection(
        homeData?.mostSearchedTitle ?? 'الأكثر بحثاً',
        homeData?.mostSearchedProducts,
        (p) => navigateToProductDetails(p.sku, p.name)
      )}

      {banners.length > 2 && renderBanner(banners[2], 2)}

      {/* New Arrivals */}
      {renderHorizontalSection(
        homeData?.newArrivalsTitle ?? t('home.new_arrivals'),
        homeData?.newArrivalsProducts,
        (p) => navigateToProductDetails(p.sku, p.name)
      )}

      {/* Special Offers */}
      {renderHorizontalSection(
        homeData?.specialOffersTitle ?? 'عروض خاصة',
        homeData?.specialOffersProducts,
        (p) => navigateToProductDetails(p.sku, p.name)
      )}

      <View style={{ height: verticalScale(120) }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgLight },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: '700',
    color: colors.textPrimary,
    marginHorizontal: scale(16),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(8),
  },
  horizontalList: { paddingHorizontal: scale(16), paddingVertical: scale(8) },
  productCard: {
    width: scale(160),
    marginEnd: scale(16),
    backgroundColor: colors.white,
    borderRadius: scale(12),
    padding: scale(8),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: verticalScale(120),
    borderRadius: scale(8),
  },
  productName: {
    fontSize: scale(12),
    color: colors.textPrimary,
    marginTop: scale(6),
    fontWeight: '500',
  },
  productPrice: {
    fontSize: scale(13),
    color: colors.primary,
    fontWeight: '700',
    marginTop: scale(4),
  },
  bannerContainer: {
    marginHorizontal: scale(16),
    marginVertical: scale(8),
    borderRadius: scale(12),
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: verticalScale(120),
  },
  errorText: { fontSize: scale(14), color: colors.error, marginBottom: scale(12) },
  retryBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: scale(24),
    paddingVertical: scale(10),
    borderRadius: scale(8),
  },
  retryText: { color: colors.white, fontWeight: '600' },
});

export default HomeScreen;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import HomeScreen from './features/home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNav = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
*/

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import HomeScreen from './features/home/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNav = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
*/
