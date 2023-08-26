import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { apiPostCall } from '../utils/PostCall';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddItemScreen = () => {
  const [productType, setProductType] = useState('');
  const [amount, setAmount] = useState('');
  const [shop, setShop] = useState('');
  const [link, setLink] = useState('');
  const [productTypeValid, setProductTypeValid] = useState(false);
  const [amountValid, setAmountValid] = useState(false);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false); // State for controlling the success message
  const handleAddItem = () => {
    if (productTypeValid && amountValid) {
      AsyncStorage.getItem('products')
        .then((data) => {
          if (data) {
            const products = JSON.parse(data);
            const existingProduct = products.find((product: { productType: string; }) => product.productType === productType);
  
            if (existingProduct) {
              alert('Warning: This product is already in stock. Are you sure you want to add?');
            } else {
              apiPostCall(productType, amount, shop, link);
              setSuccessMessageVisible(true);
              setTimeout(() => {
                setSuccessMessageVisible(false);
                setProductType('');
                setAmount('');
                setShop('');
                setLink('');
              }, 2000);
            }
          }
        })
        .catch((error) => {
          console.error('Error fetching data from AsyncStorage:', error);
        });
    } else {
      alert('Please fill in the required fields.');
    }
  };
  
  


  return (
    <View style={styles.container}>

      <View style={styles.gridImageContainer}>
        <Image source={require('whats_in_stock/assets/product-design.png')} style={styles.gridImage} />
      </View>
      <View style={styles.gridItem}>
        <TextInput
          style={styles.gridText}
          placeholder="Add product name"
          value={productType}
          onChangeText={text => {
            setProductType(text);
            setProductTypeValid(text.trim() !== ''); // Update validation state
          }}
        />
      </View>


      <View style={styles.gridImageContainer}>
        <Image source={require('whats_in_stock/assets/trolley.png')} style={styles.gridImage} />
      </View>
      <View style={styles.gridItem}>
        <TextInput
          style={styles.gridText}
          placeholder="Add desired quantity"
          value={amount}
          onChangeText={text => {
            // Allow only numbers and empty string
            if (/^\d*$/.test(text) || text === '') {
              setAmount(text);
              setAmountValid(text.trim() !== ''); // Update validation state
            }
          }}
          keyboardType="numeric"
        />
      </View>



      <View style={styles.gridImageContainer}>
        <Image source={require('whats_in_stock/assets/store.png')} style={styles.gridImage} />
      </View>
      <View style={styles.gridItem}>
        <TextInput
          style={styles.gridText}
          placeholder="Add shop (optional)"
          value={shop}
          onChangeText={text => setShop(text)}
        />
      </View>

      <View style={styles.gridImageContainer}>
        <Image source={require('whats_in_stock/assets/external-link.png')} style={styles.gridImage} />
      </View>
      <View style={styles.gridItem}>
        <TextInput
          style={styles.gridText}
          placeholder="Add product link (optional)"
          value={link}
          onChangeText={text => setLink(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddItem}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Add Item</Text>
            <Image source={require('whats_in_stock/assets/add-button.png')} style={styles.buttonImage} />
          </View>
        </TouchableOpacity>
      </View>


      {successMessageVisible && (
        <View style={styles.successMessage}>
          <Text style={styles.successMessageText}>Item added successfully</Text>
        </View>
      )}
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
    width: 60,
    height: (screenWidth - 250) / 2.5,
    marginTop: 20
  },
  gridText: {
    fontSize: 20,
    textAlign: 'left',
  },
  buttonContainer: {
    position: 'absolute',
    top: 630,
    width: '100%',
    alignItems: 'center',
  },
  separationLine: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#50C878',
    padding: 10,
    borderRadius: 5,
    width: 200,
    height: 50,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  buttonContent: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'center', // Center items horizontally
    alignItems: 'center', // Center items vertically
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 10, // Add spacing between text and image
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  successMessage: {
    position: 'absolute',
    top: '30%',
    backgroundColor: 'rgba(80, 200, 120, 0.8)',
    padding: 10,
    borderRadius: 5,
    width: 220,
    alignItems: 'center',
  },
  successMessageText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default AddItemScreen;