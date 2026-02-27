// ─── BottomActionBar Component ─────────────────────────────────────────────
// Mirrors Flutter's BottomActionBar widget

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors } from '../../../../../core/themes/colors';

const BottomActionBar = ({
  isOutOfStock,
  isInCart,
  qty,
  totalPrice,
  currency,
  onIncrement,
  onDecrement,
  onAddToCart,
}) => (
  <View style={styles.bar}>
    {isOutOfStock ? (
      <View style={styles.outOfStock}>
        <Text style={styles.outOfStockText}>غير متوفر بالمخزن</Text>
      </View>
    ) : (
      <View style={styles.cartControls}>
        {/* Quantity selector */}
        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={onDecrement} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity onPress={onIncrement} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Cart */}
        <TouchableOpacity style={styles.addBtn} onPress={onAddToCart}>
          <Text style={styles.addBtnText}>
            {isInCart ? 'تحديث السلة' : 'أضف إلى السلة'}
          </Text>
          <Text style={styles.addBtnPrice}>
            {totalPrice.toFixed(2)} {currency}
          </Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  bar: {
    padding: scale(16),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -5 },
    elevation: 10,
  },
  outOfStock: {
    backgroundColor: '#C2185B',
    borderRadius: scale(25),
    paddingVertical: scale(14),
    alignItems: 'center',
  },
  outOfStockText: { color: '#FFFFFF', fontSize: scale(16), fontWeight: '700' },
  cartControls: { flexDirection: 'row', alignItems: 'center' },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginEnd: scale(12) },
  qtyBtn: {
    width: scale(36), height: scale(36), borderRadius: scale(18),
    backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnText: { fontSize: scale(20), color: colors.textPrimary, fontWeight: '600' },
  qtyText: { fontSize: scale(18), fontWeight: '700', marginHorizontal: scale(12) },
  addBtn: {
    flex: 1, backgroundColor: colors.primary, borderRadius: scale(25),
    paddingVertical: scale(14), flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center',
  },
  addBtnText: { color: '#FFFFFF', fontSize: scale(14), fontWeight: '700' },
  addBtnPrice: { color: '#FFFFFF', fontSize: scale(12), marginStart: scale(8), opacity: 0.9 },
});

export default React.memo(BottomActionBar);
