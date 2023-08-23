import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>What's in stock?</Text>
      <FlatList
        data={products}
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
  }
});

export default App;
