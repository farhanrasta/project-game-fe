import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import gb2 from '../assets/gb2.png'

const ProfileScreen = ({ route }) => {
  const { username, token } = route.params;
  const [greeting, setGreeting] = useState('');
  const navigation = useNavigation(); // Get navigation object
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await axios.get(`https://joey-pet-minnow.ngrok-free.app/api/login/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGreeting(response.data.greeting);
        setName(response.data.name);
      } catch (error) {
        console.error('Error fetching greeting:', error);
        Alert.alert('Error', 'Failed to fetch greeting');
      }
    };

    fetchGreeting();
  }, []);

  const handleStartGame = () => {
    navigation.navigate('Game',{ username, token }); // Navigate to GameScreen
  
  };

  return (
    <View style={styles.container}>
        <Image source={gb2} style={styles.image} />
      <Text style={styles.text}>Hi, {name}</Text>
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