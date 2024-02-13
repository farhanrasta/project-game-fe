import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const HomeScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Selamat Datang di Permainan</Text>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0aed0',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    color: '#756ab6',
    fontSize: 35,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});
