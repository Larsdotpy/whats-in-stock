import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ShoppingListScreen: React.FC = () => {
  const [fontsLoaded] = useFonts({
    IndieFlower: require('whats_in_stock/assets/fonts/IndieFlower-Regular.ttf'),
  });
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    retrieveNoteText();
  }, []);

  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the header for this screen
    });
  }, [navigation]);

  const retrieveNoteText = async () => {
    try {
      const value = await AsyncStorage.getItem('noteText');
      if (value !== null) {
        setNoteText(value);
      }
    } catch (error) {
      console.log('Error retrieving note text:', error);
    }
  };

  const saveNoteText = async (text: string) => {
    try {
      await AsyncStorage.setItem('noteText', text);
    } catch (error) {
      console.log('Error saving note text:', error);
    }
  };

  if (!fontsLoaded) {
    return null; // or render a loading indicator
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping List</Text>
      </View>

      <View style={styles.notepadContainer}>
        <TextInput
          style={styles.notepad}
          value={noteText}
          placeholder="Write your notes here..."      
          multiline
          numberOfLines={10}
          onChangeText={(text) => {
            setNoteText(text);
            saveNoteText(text);
          }}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    borderBottomWidth: 2,
    borderColor: '#111111',
    paddingBottom: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 0.1,
    fontFamily: 'IndieFlower',
  },
  notepadContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#111111',
    marginBottom: 0,
    padding: 10,
  },
  notepad: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'IndieFlower'
  },
  listContainer: {
    paddingLeft: 16,
    marginBottom: 16,
  },
  listItem: {
    fontSize: 18,
    marginBottom: 6,
    counterReset: 'listCounter',
    fontFamily: 'IndieFlower',
  },
});

export default ShoppingListScreen;
