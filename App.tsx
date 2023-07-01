import React, { useEffect } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import MainScreen from './screens/mainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddItemScreen from './screens/addItemScreen';
import StockScreen from './screens/stockScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // Any initialization code or side effects can be placed here
    // For example, you can fetch data, set up subscriptions, etc.
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="addItemScreen" component={AddItemScreen} />
          <Stack.Screen name="stockScreen" component={StockScreen} />
          {/* ... Other screens */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
