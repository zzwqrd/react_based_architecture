import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { SvgUri, SvgXml } from 'react-native-svg';
import LottieView from 'lottie-react-native';
import { colors } from '../core/themes/colors';
import { scale } from 'react-native-size-matters';

/**
 * CustomImage.js
 * Mirrors Flutter's CustomImage (custom_image.dart).
 * Supports: URL (Network), SVG, Lottie (JSON), Base64, and Local Assets.
 */
export const CustomImage = ({
  url,
  height,
  width,
  isFile = false,
  borderRadius = 0,
  fit = 'contain',
  color,
  backgroundColor,
  border,
  child,
  blurColor,
  base64 = false,
  onFinishLottie,
  style,
}) => {
  const containerStyle = [
    styles.container,
    {
      height,
      width,
      borderRadius,
      backgroundColor,
    },
    border,
    style,
  ];

  const renderImage = () => {
    if (!url) return <View style={styles.error}><Text>❌</Text></View>;

    const isSvg = url.toLowerCase().endsWith('.svg');
    const isLottie = url.toLowerCase().endsWith('.json');

    if (base64) {
      return (
        <Image
          source={{ uri: `data:image/png;base64,${url}` }}
          style={{ width, height }}
          resizeMode={fit}
          tintColor={color}
        />
      );
    }

    if (url.startsWith('http')) {
      if (isSvg) {
        return <SvgUri uri={url} width={width} height={height} />;
      }
      return (
        <Image
          source={{ uri: url }}
          style={{ width, height }}
          resizeMode={fit}
          tintColor={color}
        />
      );
    }

    if (isSvg) {
       // For local SVGs, you might need a different loader or SvgXml
       return <View style={styles.error}><Text>SVG</Text></View>;
    }

    if (isLottie) {
      return (
        <LottieView
          source={typeof url === 'string' ? { uri: url } : url}
          autoPlay
          loop={false}
          onAnimationFinish={onFinishLottie}
          style={{ width, height }}
        />
      );
    }

    // Default: Local asset
    return (
      <Image
        source={typeof url === 'string' ? { uri: url } : url}
        style={{ width, height }}
        resizeMode={fit}
        tintColor={color}
      />
    );
  };

  return (
    <View style={containerStyle}>
      <View style={{ borderRadius, overflow: 'hidden' }}>
        {renderImage()}
        {blurColor && (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: blurColor }]} />
        )}
        {child && <View style={StyleSheet.absoluteFill}>{child}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
});

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import CustomImage from './components/CustomImage';

const ProfileScreen = () => {
  return (
    <CustomImage 
      source={{ uri: 'https://example.com/image.jpg' }} 
      style={{ width: 100, height: 100, borderRadius: 50 }} 
      resizeMode="cover"
    />
  );
};
*/
