import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity, navigation } from 'react-native';
import axios from 'axios';
import gb2 from '../assets/gb2.png'

const ProfileScreen = ({ route }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch username from API
    // const { token } = route.params;

    const fetchUsername = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, [route.params]);

  const handleStartGame = () => {
    navigation.navigate('Game', { username });
  };

  return (
    <View style={styles.container}>
        <Image source={gb2} style={styles.image} />
      <Text style={styles.text}>Hi, {username}</Text>
      <Text style={styles.text}>Are you ready? </Text>
      <TouchableOpacity style={styles.button} onPress={handleStartGame}>
        <Text style={styles.buttonText}>Let's Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#E493B3',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default ProfileScreen;