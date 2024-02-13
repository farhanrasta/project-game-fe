import { StyleSheet, Text, TouchableOpacity, View, Image, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
//import PopUpSignup from '../components/PopUpSignup';

const LoginScreen = ({ navigation }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const [status, setStatus] = useState(500);
  const [message, setMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      console.log(response);
      setStatus(response.status);
      setMessage(response.data.message);

      if (response.status === 404 || response.status === 401) {
        setModalVisible(true);
        console.log('Username atau Password tidak valid');
      }

      const token = response.data.token;
      setToken(token);
      console.log('Token:', token);
      navigation.navigate('Home', { token, username });
    } catch (error) {
      console.error('Login Gagal', error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.hiText}>Let's get started!! {'\n'}</Text>
      <Image
        source={require('../assets/gb1.png')} // Adjust the path based on your project structure
        style={styles.logo}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="user" size={20} color="#AC87C5" />
        <TextInput
          style={styles.input}
          placeholder='Masukkan Username'
          placeholderTextColor='#756AB6'
          value={username}
          onChangeText={setUserName}
        />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="lock" size={20} color="#AC87C5" />
        <TextInput
          style={styles.input}
          placeholder='Masukkan Password'
          placeholderTextColor='#756AB6'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity disabled={!username || !password }
      style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signButton} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>{'\n'}Belum memiliki akun?</Text>
      </TouchableOpacity>
    </View>
  );
};


export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  signButton: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 190,
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    borderColor: '#756ab6',
    margin: 5,
    padding: 10,
    borderWidth: 1,
    width: 300,
    borderRadius: 10,
    backgroundColor: '#FFE5E5',
  },
  loginButton: {
    backgroundColor: '#AC87C5',
    padding: 10,
    borderRadius: 5,
    width: 320,
    alignItems: 'center',
    marginTop: 20
  },
  loginText: {
    color: '#FFE5E5',
    alignItems: 'center',
    fontWeight: 'bold',
    position: 'relative'
  },
  buttonText: {
    color: '#E0AED0',
    alignItems: 'center',
  },
  hiText: {
    color: '#756ab6',
    fontSize: 36,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});
