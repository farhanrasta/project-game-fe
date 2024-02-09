import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try{
            const respons = await axios.post('Login BE', {username, password});
            const token = respons.data.token;
            navigation.navigate('Home');
        } catch (error) {
            console.error('Login Gagal', error);
        }
    };

    return(
        <View>
            <TextInput
                placeholder='Masukkan Username'
                value={username}
                onChangeText={setUserName}
            />
            <TextInput
                placeholder='Masukkan Password'
                value={password}
                onChangeText={setPassword}
            />
            <Button title='Login' onPress={handleLogin}/>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
