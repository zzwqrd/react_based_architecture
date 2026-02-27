import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';

/**
 * Unified AppText component mirroring Flutter's AppText (text_app_n.dart)
 * and MyTextApp (app_text.dart).
 */
const AppText = ({
  text,
  title, // for compatibility with MyTextApp
  align = 'left',
  maxLines,
  softWrap = true,
  overflow = 'ellipsis',
  style,
  color,
  fontSize,
  fontWeight = 'normal',
  letterSpacing,
  lineHeight,
  fontFamily,
  
  // Icon & Image Properties
  icon,
  image,
  iconColor,
  iconSize,
  imageSize,
  iconPadding = { marginEnd: scale(8) },
  
  // Interactive Properties
  onTap,
  onLongPress,
  
  // Animation/Shadow properties (simplified for RN)
  shadows,
  
  // Layout Properties
  padding,
  margin,
  width,
  height,
  borderRadius,
  backgroundColor,
  borderWidth,
  borderColor,
  ...props
}) => {
  const contentText = text || title || '';

  const baseTextStyle = {
    color: color || colors.mainColor || colors.black,
    fontSize: fontSize || scale(14),
    fontWeight: fontWeight,
    textAlign: align,
    letterSpacing: letterSpacing,
    lineHeight: lineHeight,
    fontFamily: fontFamily,
    textDecorationLine: props.decoration || 'none',
  };

  const renderIconContent = () => {
    if (!icon && !image) return null;

    return (
      <>
        {icon && (
          <View style={iconPadding}>
            {typeof icon === 'function' ? icon({ color: iconColor || baseTextStyle.color, size: iconSize || baseTextStyle.fontSize * 1.2 }) : icon}
          </View>
        )}
        {image && (
          <Image
            source={typeof image === 'string' ? { uri: image } : image}
            style={[
              {
                width: imageSize || scale(24),
                height: imageSize || scale(24),
                tintColor: iconColor,
              },
              iconPadding,
            ]}
          />
        )}
      </>
    );
  };

  const textElement = (
    <Text
      style={[baseTextStyle, style]}
      numberOfLines={maxLines}
      ellipsizeMode={overflow === 'clip' ? 'clip' : 'tail'}
      allowFontScaling={softWrap}
      {...props}
    >
      {contentText}
    </Text>
  );

  const containerStyle = [
    padding && { padding },
    margin && { margin },
    width && { width },
    height && { height },
    backgroundColor && { backgroundColor },
    borderRadius && { borderRadius },
    borderWidth && { borderWidth },
    borderColor && { borderColor },
    (icon || image) && styles.row,
  ];

  let content = (
    <View style={containerStyle}>
      {renderIconContent()}
      {(icon || image) ? <View style={{ flexShrink: 1 }}>{textElement}</View> : textElement}
    </View>
  );

  if (onTap || onLongPress) {
    return (
      <TouchableOpacity
        onPress={onTap}
        onLongPress={onLongPress}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

// --- Static Factory Methods mirroring MyTextApp.dart ---

AppText.Bold = (props) => (
  <AppText
    fontWeight="bold"
    fontSize={scale(18)}
    color={colors.mainColor}
    align="center"
    overflow="ellipsis"
    {...props}
  />
);

AppText.App = (props) => (
  <AppText
    fontWeight="bold"
    fontSize={scale(18)}
    color={colors.mainColor}
    align="left"
    overflow="ellipsis"
    {...props}
  />
);

AppText.Small = (props) => (
  <AppText
    fontWeight="normal"
    fontSize={scale(12)}
    color={colors.mainColor}
    align="left"
    overflow="clip"
    {...props}
  />
);

AppText.Heading = (props) => (
  <AppText
    fontWeight="bold"
    fontSize={scale(24)}
    color={colors.black}
    align="center"
    letterSpacing={1.2}
    overflow="ellipsis"
    {...props}
  />
);

AppText.Nav = (props) => (
  <AppText
    fontWeight="normal"
    fontSize={scale(16)}
    color="blue"
    decoration="underline"
    align="left"
    overflow="ellipsis"
    {...props}
  />
);

// --- Named constructors mirroring AppText from text_app_n.dart ---

AppText.Simple = (props) => <AppText {...props} />;

AppText.HeadingLarge = (props) => (
  <AppText
    fontWeight="bold"
    fontSize={scale(24)}
    letterSpacing={0.5}
    {...props}
  />
);

AppText.HeadingMedium = (props) => (
  <AppText
    fontWeight="bold"
    fontSize={scale(20)}
    letterSpacing={0.25}
    {...props}
  />
);

AppText.BodyLarge = (props) => (
  <AppText
    fontWeight="normal"
    fontSize={scale(16)}
    letterSpacing={0.15}
    lineHeight={scale(24)}
    {...props}
  />
);

AppText.BodyMedium = (props) => (
  <AppText
    fontWeight="normal"
    fontSize={scale(14)}
    letterSpacing={0.25}
    lineHeight={scale(21)}
    {...props}
  />
);

AppText.BodySmall = (props) => (
  <AppText
    fontWeight="normal"
    fontSize={scale(12)}
    letterSpacing={0.4}
    lineHeight={scale(18)}
    {...props}
  />
);

AppText.Caption = (props) => (
  <AppText
    fontWeight="normal"
    fontSize={scale(12)}
    letterSpacing={0.4}
    lineHeight={scale(18)}
    {...props}
  />
);

AppText.Clickable = (props) => (
  <AppText
    color="blue"
    decoration="underline"
    fontWeight="500"
    fontSize={scale(16)}
    {...props}
  />
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AppText;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import AppText from './components/AppText';

const InfoScreen = () => {
  return (
    <AppText 
      text="أهلاً بك في التطبيق!" 
      style={{ fontSize: 18, color: '#333', textAlign: 'center' }} 
    />
  );
};
*/
