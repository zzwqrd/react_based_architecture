import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { colors } from '../core/themes/colors';
import AppSheet from './AppSheet';
import AppField from './AppField';
import CustomImage from './CustomImage';

/**
 * SelectItem mirroring select_item.dart in Flutter.
 */
const SelectItem = ({
  title,
  items = [],
  initItem,
  initItems = [], // For multi-select
  withImage = false,
  isMulti = false,
  onSelect, // Callback with the selected item(s)
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([...initItems]);

  const filteredItems = items.filter((item) =>
    item?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSingleSelect = (item) => {
    if (onSelect) {
      onSelect(item.id === initItem?.id ? null : item);
    }
  };

  const handleMultiSelect = (item) => {
    const isSelected = selectedItems.find((i) => i.id === item.id);
    let newSelection = [];
    if (isSelected) {
      newSelection = selectedItems.filter((i) => i.id !== item.id);
    } else {
      newSelection = [...selectedItems, item];
    }
    setSelectedItems(newSelection);
  };

  const handleConfirmMulti = () => {
    if (onSelect) onSelect(selectedItems);
  };

  return (
    <AppSheet title={title} isScrollable={false}>
      <View style={styles.container}>
        <AppField
          hintText="ماذا تريد أن تبحث عنه؟"
          value={searchQuery}
          onChangeText={setSearchQuery}
          withBorder={true}
        />
        
        <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
          {filteredItems.map((item, index) => {
            const isSelected = isMulti
              ? selectedItems.find((i) => i.id === item.id)
              : initItem?.id === item.id;

            return (
              <TouchableOpacity
                key={item.id || index}
                activeOpacity={0.7}
                onPress={() => (isMulti ? handleMultiSelect(item) : handleSingleSelect(item))}
                style={styles.itemCard}
              >
                {withImage && (
                  <CustomImage
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                  />
                )}
                <Text style={styles.itemName}>{item.name}</Text>
                {isSelected && (
                  <Text style={styles.checkIcon}>✔</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {isMulti && (
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmMulti}>
            <Text style={styles.confirmText}>متابعة</Text>
          </TouchableOpacity>
        )}
        <SafeAreaView />
      </View>
    </AppSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(16),
  },
  list: {
    flex: 1,
    marginTop: verticalScale(16),
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(16),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: colors.border || '#E0E0E0',
  },
  itemImage: {
    height: verticalScale(30),
    width: scale(40),
    borderRadius: scale(4),
    marginEnd: scale(8),
  },
  itemName: {
    flex: 1,
    fontSize: scale(16),
    color: colors.textPrimary || '#000',
    fontWeight: '500',
  },
  checkIcon: {
    color: colors.primary || '#007AFF',
    fontSize: scale(18),
  },
  confirmButton: {
    backgroundColor: colors.primary || '#007AFF',
    padding: verticalScale(16),
    borderRadius: scale(8),
    alignItems: 'center',
    marginVertical: verticalScale(16),
  },
  confirmText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: scale(16),
  }
});

export default SelectItem;

/*
=========================================
مثال على الاستخدام (Example Usage):
=========================================
import SelectItem from './components/SelectItem';

const CategoriesScreen = () => {
  const categories = [
    { id: 1, name: 'إلكترونيات', image: 'https://link.com/img.png' },
    { id: 2, name: 'ملابس' }
  ];

  return (
    <SelectItem 
      title="اختر القسم"
      items={categories}
      isMulti={true} // لاختيار أكثر من عنصر
      withImage={false}
      onSelect={(selected) => console.log('تم اختيار:', selected)}
    />
  );
};
*/
