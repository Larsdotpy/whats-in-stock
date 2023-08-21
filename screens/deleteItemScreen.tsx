import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { apiDeleteCall } from '../utils/DeleteCall';


const DeleteItemScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textMain}>
          Perhaps you made a typo or would just like to delete an item from the current stock,
          fill out the details below to successfully remove an item.
        </Text>
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <TextInput style={styles.gridText} placeholder="Name of the item to delete" />
        </View>
      </View>

      <Image source={require('whats_in_stock/assets/recycle-bin.png')} style={styles.image} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => apiDeleteCall()}>
          <Text style={styles.buttonText}>Delete Item</Text>
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
    fontStyle: 'italic',
    fontSize: 20,
    marginTop: 40,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
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
    width: 200,
    height: 200,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#880808',
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
  gifContainer:{
    width: 100,
    height: 100
  },
  gif: {
    width: 100,
    height: 100
  }
});

export default DeleteItemScreen;
