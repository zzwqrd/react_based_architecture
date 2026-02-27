import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';

/**
 * EnhancedGridView provides a flexible grid layout by organizing items into rows,
 * mimicking Flutter's CustomGrid / EnhancedGridView behavior.
 */
const CustomGrid = ({
  itemBuilder, // function(index) returning React element
  itemCount,
  crossAxisCount,
  itemPadding = 0,
  gridPadding = 0,
  scrollPhysics = true, // Maps to scrollEnabled
  style,
}) => {
  const renderRow = ({ item: rowIndex }) => {
    return (
      <View style={styles.row}>
        {Array.from({ length: crossAxisCount }).map((_, columnIndex) => {
          const itemIndex = rowIndex * crossAxisCount + columnIndex;
          return (
            <View
              key={`cell-${itemIndex}`}
              style={[styles.cell, { padding: itemPadding }]}
            >
              {itemIndex >= itemCount ? null : itemBuilder(itemIndex)}
            </View>
          );
        })}
      </View>
    );
  };

  const rowCount = Math.ceil(itemCount / crossAxisCount);
  const rows = Array.from({ length: rowCount }).map((_, i) => i);

  return (
    <FlatList
      data={rows}
      keyExtractor={(item) => `row-${item}`}
      renderItem={renderRow}
      contentContainerStyle={[{ padding: gridPadding }, style]}
      scrollEnabled={scrollPhysics}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cell: {
    flex: 1,
  },
});

export default CustomGrid;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import CustomGrid from './components/CustomGrid';
import { View, Text } from 'react-native';

const MyGridScreen = () => {
  return (
    <CustomGrid
      itemCount={10}             // إجمالي عدد العناصر
      crossAxisCount={2}         // عدد الأعمدة
      itemPadding={8}            // المسافة بين العناصر
      itemBuilder={(index) => (
        <View style={{ backgroundColor: '#f0f0f0', height: 100, justifyContent: 'center', alignItems: 'center' }}>
          <Text>العنصر رقم {index + 1}</Text>
        </View>
      )}
    />
  );
};
*/
