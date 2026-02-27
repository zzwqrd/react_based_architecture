// ─── ReviewCard Component ──────────────────────────────────────────────────
// Mirrors Flutter's review list item in ReviewsTab

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { colors } from '../../../../../core/themes/colors';

const ReviewCard = ({ review }) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Text style={styles.nickname}>{review.nickname}</Text>
      <Text style={styles.date}>{review.created_at?.split(' ')[0]}</Text>
    </View>
    <Text style={styles.summary}>{review.summary}</Text>
    {review.text ? <Text style={styles.text}>{review.text}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: scale(8),
    padding: scale(12),
    marginBottom: scale(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(6),
  },
  nickname: { fontSize: scale(12), fontWeight: '700', color: colors.textPrimary },
  date: { fontSize: scale(11), color: colors.icon },
  summary: { fontSize: scale(13), fontWeight: '600', color: colors.textPrimary },
  text: { fontSize: scale(12), color: colors.textSecondary, marginTop: scale(4) },
});

export default React.memo(ReviewCard);
