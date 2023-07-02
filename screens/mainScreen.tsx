import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import AddItemScreen from './addItemScreen';

const MainScreen = () => {
  const navigation = useNavigation();

  const navigateToAddItemScreen = () => {
    navigation.navigate('addItemScreen');
  };

  const navigateToStockScreen = () => {
    navigation.navigate('stockScreen');
  };

  const navigateToDeleteItemScreen = () => {
    navigation.navigate('deleteItemScreen');
  };

  const navigateToShoppingListScreen = () => {
    navigation.navigate('shoppingListScreen');
  };
 


  return (
    <View style={styles.container}>

        <View>
            <Image 
                source={require('whats_in_stock/assets/dairy-products.png')}
                style={styles.Image}            
            />
        </View>



      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search product"
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

        <TouchableOpacity onPress={navigateToDeleteItemScreen}>
        <View style={styles.gridItem}>
          <View style={styles.gridItemBox}>
            <Text style={styles.gridItemText}>Delete item</Text>
            <View style={styles.iconContainer}>
              <AntDesign name="delete" size={24} color="black" />
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
    height: 150
  },
  searchContainer: {
    paddingVertical: 10,
  },
  searchBar: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
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
