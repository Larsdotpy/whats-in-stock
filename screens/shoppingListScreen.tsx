import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const ShoppingListScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textMain}>Fill in the details and save your item, so others can see it in stock!</Text>
        <Text style={styles.textMain2}>Shop and link are optional.</Text>
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <TextInput
            style={styles.gridText}
            placeholder="Add product name"
          />
        </View>
        <View style={styles.gridItem}>
          <TextInput
            style={styles.gridText}
            placeholder="Add desired quantity"
          />
        </View>
        <View style={styles.gridItem}>
          <TextInput
            style={styles.gridText}
            placeholder="Add shop"
          />
        </View>
        <View style={styles.gridItem}>
          <TextInput
            style={styles.gridText}
            placeholder="Add optional product link"
          />
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('whats_in_stock/assets/trolley.png')}
          style={styles.image}
        />

        <Image
          source={require('whats_in_stock/assets/diet.png')}
          style={styles.image}
        />

        <Image
          source={require('whats_in_stock/assets/store.png')}
          style={styles.image}
        />
      </View>

    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  gridContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    width: screenWidth - 40,
    height: (screenWidth - 180) / 4,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align text to the left
    marginBottom: 20,
  },
  gridItemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  textMain: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  textMain2: {
    textAlign: 'center',
    fontSize: 15,
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 50
  },
  gridText: {
    fontSize: 20,
    textAlign: 'left', // Align text to the left
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50
  },
});

export default ShoppingListScreen;
