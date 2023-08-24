import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
  productType: string;
  Amount: number;
  Shop: string;
  Link: string | null;
  id: number;
}

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      const data = response.data;
      setProducts(data);

      // Save the data to AsyncStorage
      await AsyncStorage.setItem('products', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.itemContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.boldText}>{item.Shop}</Text>
        <Text>{item.productType}</Text>
        <Text style={styles.blueText}>{item.Link}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text
          style={[
            styles.boldText,
            styles.amount,
            item.Amount > 0 ? styles.greenText : styles.redText,
          ]}
        >
          {item.Amount}
        </Text>
      </View>
    </View>
  );

  const [shopFilter, setShopFilter] = useState<string>('');
  const [amountFilter, setAmountFilter] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>('');



  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search product"
        value={searchText}
        onChangeText={setSearchText}
      />
      </View>
    <View style={styles.filterRow}>
      <Text style={styles.filterText}>Filter by shop</Text>
        <TextInput
          style={styles.filterInput}
          placeholder="Enter shop name"
          value={shopFilter}
          onChangeText={setShopFilter}
          />
      </View>
      <View style={styles.filterRow}>
      <Text style={styles.filterText}>Filter by amount</Text>
        <TextInput
          style={styles.filterInput}
          placeholder="Enter amount"
          value={amountFilter !== null ? amountFilter.toString() : ''}
          onChangeText={(text) => setAmountFilter(text !== '' ? parseFloat(text) : null)}
          keyboardType="numeric"
        />
      </View>
      <FlatList
  data={products.filter((item) => {
    if (shopFilter && !item.Shop.toLowerCase().includes(shopFilter.toLowerCase())) {
      return false;
    }
    if (amountFilter !== null && item.Amount !== amountFilter) {
      return false;
    }
    if (searchText && !item.productType.toLowerCase().includes(searchText.toLowerCase())) {
      return false;
    }
    return true;
  })}
  renderItem={renderItem}
  keyExtractor={(item) => item.id.toString()}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    flexDirection: 'row', // Set flexDirection to row
    alignItems: 'center', // Vertically center items
    backgroundColor: '#f4f6f6'
  },
  leftContainer: {
    flex: 1, // Takes up all available space
  },
  rightContainer: {
    flex: 0.5, // Takes half the available space
    alignItems: 'flex-end', // Align content to the right
  },
  boldText: {
    fontWeight: 'bold',
  },
  amount: {
    textAlign: 'right',
    fontSize: 20
  },
  greenText: {
    color: 'green',
  },
  redText: {
    color: 'red',
  },
  blueText: {
    color: 'blue'
  },
  searchContainer: {
    paddingVertical: 10,
  },
  searchBar: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterText: {
    flex: 1,
    marginRight: 10,
    fontWeight: 'bold',
  },
  filterInput: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default App;
