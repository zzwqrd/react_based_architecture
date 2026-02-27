import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
  Image, StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from '../../../node_modules/react-i18next';
import { scale, verticalScale } from 'react-native-size-matters';
import { removeItem, updateQuantity } from '../../store/slices/cartSlice';
import EnhancedButton from '../../components/AppButton';
import { colors } from '../../core/themes/colors';

/**
 * Mirrors Flutter's CartView.
 * Shows cart items from Redux store with quantity controls and remove action.
 */
const CartScreen = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { items, totalPrice, loading } = useSelector((state) => state.cart);

  const handleRemove = (sku) => dispatch(removeItem(sku));
  const handleQtyChange = (sku, qty) => {
    if (qty < 1) { dispatch(removeItem(sku)); return; }
    dispatch(updateQuantity({ sku, quantity: qty }));
  };

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>🛒</Text>
        <Text style={styles.emptySubText}>{t('cart.item_removed_success')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.sku}
        contentContainerStyle={{ padding: scale(16) }}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.itemImage} resizeMode="contain" />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price} {t('product_list.currency_symbol')}</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => handleQtyChange(item.sku, item.quantity - 1)}>
                  <Text style={styles.qtyBtnText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantity}</Text>
                <TouchableOpacity style={styles.qtyBtn} onPress={() => handleQtyChange(item.sku, item.quantity + 1)}>
                  <Text style={styles.qtyBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item.sku)} style={styles.removeBtn}>
              <Text style={{ color: colors.error, fontSize: scale(20) }}>×</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>
          {t('orders.order_total')}: {totalPrice} {t('product_list.currency_symbol')}
        </Text>
        <EnhancedButton label={t('home.order_now')} onPress={() => {}} isLoading={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgLight },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: scale(64) },
  emptySubText: { fontSize: scale(16), color: colors.textSecondary, marginTop: scale(12) },
  cartItem: {
    flexDirection: 'row', backgroundColor: colors.white, borderRadius: scale(12),
    padding: scale(12), marginBottom: scale(12), alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  itemImage: { width: scale(70), height: scale(70), borderRadius: scale(8) },
  itemInfo: { flex: 1, marginHorizontal: scale(12) },
  itemName: { fontSize: scale(13), fontWeight: '600', color: colors.textPrimary },
  itemPrice: { fontSize: scale(14), color: colors.primary, fontWeight: '700', marginTop: scale(4) },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: scale(8) },
  qtyBtn: {
    width: scale(28), height: scale(28), borderRadius: scale(14),
    backgroundColor: colors.border, alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnText: { fontSize: scale(18), color: colors.textPrimary, lineHeight: scale(22) },
  qtyText: { fontSize: scale(14), fontWeight: '600', marginHorizontal: scale(12) },
  removeBtn: { padding: scale(4) },
  footer: {
    padding: scale(16), backgroundColor: colors.white,
    borderTopWidth: 1, borderTopColor: colors.border,
  },
  totalText: {
    fontSize: scale(16), fontWeight: '700', color: colors.textPrimary,
    marginBottom: scale(12),
  },
});

export default CartScreen;
