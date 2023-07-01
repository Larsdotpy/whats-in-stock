import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';


const StockScreen: React.FC = () => {
  const data = [
    { name: 'Volkoren pasta', stock: 1 },
    { name: 'Melk', stock: 1 },
    { name: 'Kwark', stock: 3 },
    { name: 'Zalm', stock: 2 },
    { name: 'Spinazie', stock: 2 },
    { name: 'Kaas', stock: 2 },
    { name: 'Ham', stock: 2 },
    { name: 'Brood', stock: 2 },
    { name: 'Waterfles 1,5l', stock: 2 },
    { name: 'Colafles 1,5l', stock: 2 },
    { name: 'Keukenpapier', stock: 2 },
    { name: 'Biefstuk', stock: 2 },
    { name: 'Kipfilet', stock: 2 },
    { name: 'Boter', stock: 2 },
    { name: 'Olijfolie', stock: 2 },
    { name: 'Heineken krat', stock: 2 },
    { name: 'Basmatirijst 500gr', stock: 2 },
  ];

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.stockAmount}>{item.stock}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={renderProductItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockAmount: {
    fontSize: 16,
    color: 'green',
  },
});

export default StockScreen;
