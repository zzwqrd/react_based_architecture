// ─── ImageSlider Component ─────────────────────────────────────────────────
// Mirrors Flutter's ImageSlider widget

import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../../../../../core/themes/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ImageSlider = ({ images, currentIndex, onIndexChange }) => {
  if (!images || images.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={{ color: colors.icon, fontSize: scale(40) }}>📷</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={images}
        keyExtractor={(_, idx) => `img-${idx}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
          onIndexChange(idx);
        }}
        renderItem={({ item }) => (
          <View style={{ width: SCREEN_WIDTH, padding: scale(16) }}>
            <Image source={{ uri: item.url }} style={styles.image} resizeMode="contain" />
          </View>
        )}
      />
      {/* Dots */}
      <View style={styles.dots}>
        {images.map((_, idx) => (
          <View key={`dot-${idx}`} style={[styles.dot, currentIndex === idx && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  empty: {
    height: verticalScale(280),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  image: { width: '100%', height: verticalScale(280) },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: verticalScale(8) },
  dot: {
    width: scale(8), height: scale(8), borderRadius: scale(4),
    backgroundColor: '#E0E0E0', marginHorizontal: scale(4),
  },
  dotActive: { backgroundColor: colors.primary },
});

export default React.memo(ImageSlider);
