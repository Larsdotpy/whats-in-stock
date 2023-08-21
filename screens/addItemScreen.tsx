import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { apiPostCall } from '../utils/PostCall';
/////////////////



/////////////
const AddItemScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textMain}>Fill in the details and save your item, so others can see it in stock!</Text>
      </View>

      <Text style={styles.title}>Required</Text>
      <View style={styles.gridContainer}>
        <View style={styles.gridImageContainer}>
          <Image source={require('whats_in_stock/assets/product-design.png')} style={styles.gridImage} />
        </View>
        <View style={styles.gridItem}>
          <TextInput
            style={styles.gridText}
            placeholder="Add product name"
          />
        </View>
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.gridImageContainer}>
          <Image source={require('whats_in_stock/assets/trolley.png')} style={styles.gridImage} />
        </View>
        <View style={styles.gridItem}>
          <TextInput
            style={styles.gridText}
            placeholder="Add desired quantity"
          />
        </View>
      </View>

      <View style={styles.separationLine}></View>

      <Text style={styles.title2}>Optional</Text>
      <View style={styles.gridContainer}>
        <View style={styles.gridImageContainer}>
          <Image source={require('whats_in_stock/assets/store.png')} style={styles.gridImage} />
        </View>
        <View style={styles.gridItem}>
          <TextInput
            style={styles.gridText}
            placeholder="Add shop"
          />
        </View>
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.gridImageContainer}>
          <Image source={require('whats_in_stock/assets/external-link.png')} style={styles.gridImage} />
        </View>
        <View style={styles.gridItem}>
          <TextInput
            style={styles.gridText}
            placeholder="Add product link"
          />
        </View>        
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => apiPostCall()}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
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
  textMain: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  gridContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Align items horizontally
  },
  gridItem: {
    width: screenWidth - 40 - 24 - 10, // Take remaining space after image and margin
    height: (screenWidth - 180) / 4,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  gridImageContainer: {
    width: 24,
    height: (screenWidth - 180) / 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  gridImage: {
    width: 35,
    height: (screenWidth - 250) / 4,
    marginRight: 10
  },
  gridText: {
    fontSize: 20,
    textAlign: 'left',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#50C878',
    padding: 10,
    borderRadius: 5,
    width: 200,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
  },
  title2: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
  },
  separationLine: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default AddItemScreen;
