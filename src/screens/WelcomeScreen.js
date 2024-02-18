import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import gb2 from '../assets/gb2.png'

const WelcomeScreen = ({ route }) => {
  const { username, token } = route.params;
  const navigation = useNavigation(); // Get navigation object
  const [name, setName] = useState('');
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/login/${username}`,
          {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
          }
        );
        console.log("name", response);
        const name = response.data.name;
        console.log("name", response.data);
        setName(name);
        console.log("name", response.data.name);
      } catch (error) {
        console.error('Error fetching greeting:', error);
      }
    };

    fetchGreeting();
  }, []);

  const handleStartGame = () => {
    navigation.navigate('Game',{ username, token }); // Navigate to GameScreen
  
  };

  const handleLogout = async () => {
    // Perform logout operation here
    // For example: navigation.navigate('Login');
    try {
        const response = await axios.delete(
            `https://joey-pet-minnow.ngrok-free.app/api/logout/${username}`, // Sesuaikan dengan URL endpoint logout di backend Anda
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        // Clear local storage, reset states, navigate to login, etc.
        if (response.status === 200) {
            navigation.navigate('Login');
            console.log('Logout Success');
        } else {
            console.log('Logout Failed');
        }
    } catch (error) {
        console.error('Logout failed:', error);
        // Handle logout failure, display error message, etc.
    }
    setLogoutModalVisible(false); // Close the logout modal
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
  
  export default WelcomeScreen;