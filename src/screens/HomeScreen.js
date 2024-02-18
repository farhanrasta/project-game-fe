import { StyleSheet, Text, TouchableOpacity, View, Image, Button, TextInput } from 'react-native';
import React from 'react';
import AtmaBold from '../assets/Atma-Bold.ttf'
import AtmaMedium from '../assets/Atma-Medium.ttf'
import {useFonts} from 'expo-font';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
//import PopUpError from '../components/PopUpError';
//import PopUpSignup from '../components/PopUpSignup';



const HomeScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.hiText}>PINGSUT{'\n'}</Text>
      <Image
        source={require('../assets/gb3.png')} // Adjust the path based on your project structure
        style={styles.logo}
      />
  
      <TouchableOpacity style={styles.logButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signButton} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

    </View>
  );
};


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFE5E5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 308,
    height: 153,
    alignItems: 'center',
    marginBottom: 30,
  },
  hiText: {
    color: '#756ab6',
    fontSize: 36,
    fontWeight: 'bold',
    alignItems: 'center',
    fontFamily: 'AtmaBold'
  },
  logButton: {
    backgroundColor: '#E0AED0',
    padding: 10,
    borderRadius: 5,
    width: 320,
    alignItems: 'center',
    marginTop: 20
  },
  loginText: {
    color: '#756AB6',
    alignItems: 'center',
    fontWeight: 'bold',
    position: 'relative',
    fontFamily: 'AtmaMedium'
  },
  signButton: {
    backgroundColor: '#E0AED0',
    padding: 10,
    borderRadius: 5,
    width: 320,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#756AB6',
    alignItems: 'center',
    fontWeight: 'bold',
    position: 'relative',
    fontFamily: 'AtmaMedium'
  },  
});