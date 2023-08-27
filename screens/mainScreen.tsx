import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import LoginScreen from './loginScreen';

const MainScreen = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add a state for authentication status
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the header for this screen
    });
  }, [navigation]);

  const navigateToAddItemScreen = () => {
    navigation.navigate('addItemScreen');
  };

  const navigateToStockScreen = () => {
    navigation.navigate('stockScreen');
  };

  const navigateToShoppingListScreen = () => {
    navigation.navigate('shoppingListScreen');
  };

  if (!isLoggedIn) {
    return <LoginScreen setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <View style={styles.container}>

        <View>
            <Image 
                source={require('whats_in_stock/assets/dairy-products.png')}
                style={styles.Image}            
            />
        </View>

      <View style={styles.gridContainer}>
        <TouchableOpacity onPress={navigateToAddItemScreen}>
          <View style={styles.gridItem}>
            <View style={styles.gridItemBox}>
              <Text style={styles.gridItemText}>Add item</Text>
              <View style={styles.iconContainer}>
                <AntDesign name="pluscircleo" size={24} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToShoppingListScreen}>
        <View style={styles.gridItem}>
          <View style={styles.gridItemBox}>
            <Text style={styles.gridItemText}>Shopping list</Text>
            <View style={styles.iconContainer}>
              <MaterialIcons name="list-alt" size={24} color="black" />
            </View>
          </View>
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToStockScreen}>
        <View style={styles.gridItem}>
          <View style={styles.gridItemBox}>
            <Text style={styles.gridItemText}>Stock</Text>
            <View style={styles.iconContainer}>
              <AntDesign name="inbox" size={24} color="black" />
            </View>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    Image: {
      width: 150,
      height: 150,
      bottom: 50
    },
    gridContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    gridItem: {
      marginVertical: 5,
    },
    gridItemBox: {
      width: 300,
      height: 100,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'black',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    gridItemText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
    },
    iconContainer: {
      marginLeft: 10,
    },
  });

export default MainScreen;
