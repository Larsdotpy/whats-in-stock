import React, { useState } from 'react';
import { View, Image, TextInput, Button, StyleSheet } from 'react-native';

interface LoginScreenProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://lars.detestbaas.nl:3000/users', { // Fetch from '/users' -> case sensitive
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      if (response.ok) {
        const users = await response.json();
        const matchingUser = users.find((user: { username: string; password: string; }) => user.username === username && user.password === password);
        if (matchingUser) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          alert('Incorrect credentials');
        }
      } else {
        setIsLoggedIn(false);
        alert('Server error');
      }
    } catch (error) {
      setIsLoggedIn(false);
      alert(error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Image
        source={require('whats_in_stock/assets/login.png')}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    bottom: '5%'
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default LoginScreen;
