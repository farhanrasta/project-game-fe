import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import axios from 'axios';
import PopUpSignup from '../components/PopUpSignup';

const SignupScreen = ({navigation}) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = useState(500);
    const [message, setMessage] = useState('');

    const handleSignup = async () => {
        try{
            const respons = await axios.post('http://localhost:5000/api/signup', {username, password, name});
            console.log('respons' ,respons);
            // setUserName(respons.data.username);
            // setPassword(respons.data.password);
            

            setModalVisible(true);
        } catch (error) {
            if (error.respons && error.respons.status === 401) {
                console.log('Signup Failed: User has already registered');
                setModalVisible(true);
            } else {
                
                console.log(error.respons);
                setModalVisible(true);
                
                console.error('Signup Failed', error);
                // Handle other errors
            }
            
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        navigation.navigate('Login');
      };

    return(
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <TextInput
                    placeholder='Masukkan Username'
                    value={username}
                    onChangeText={(String => setUserName(String))}
                />
                <TextInput
                    placeholder='Masukkan Password'
                    value={password}
                    onChangeText={(String => setPassword(String))}
                />
                <TextInput
                    placeholder='Masukkan Nama'
                    value={name}
                    onChangeText={(String => setName(String))}
                />
                <Button title='Sign Up' onPress={handleSignup}/>
                <PopUpSignup  
                    visible={modalVisible} 
                    onClose={handleCloseModal} 
                    status={status} 
                    message={message}
                    />
            </View>
        </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButton:{
    paddingTop: 20
  }
});
