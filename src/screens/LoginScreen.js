import { StyleSheet, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
//import PopUpSignup from '../components/PopUpSignup';

const LoginScreen = ({navigation}) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const [status, setStatus] = useState(500);
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogin = async () => {
        try{
            const respons = await axios.post('http://localhost:5000/api/login', {username, password});
            console.log(respons);
            setStatus(respons.status);
            setMessage(respons.data.message);

            if (respons.status === 404 || respons.status === 401) {
                setModalVisible(true)
                console.log('Username atau Password tidak valid');
            }

            const token = respons.data.token;
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
      
    return(
        <View style={styles.container}>
            <Text style={styles.hiText}>Alo!!! {'\n'}</Text>
            <TextInput
                style={styles.input}
                placeholder='Masukkan Username'
                value={username}
                onChangeText={setUserName}
            />
            <TextInput
                style={styles.input}
                placeholder='Masukkan Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.loginButton}  onPress={handleLogin}>
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
      backgroundColor: '#e0aed0',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    signButton: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
      height: 40,
      width: '100%',
      borderColor: '#756ab6',
      borderWidth: 1,
      marginBottom: 20,
      paddingLeft: 10,
    },
    loginButton: {
      backgroundColor: '#ffe5e5',
      padding: 10,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center'
    },
    loginText: {
        color: '#756ab6',
        alignItems: 'center',
        fontWeight: 'bold',
        position: 'relative'
      },
    buttonText: {
      color: '#ffe5e5',
      alignItems: 'center',
    },
    hiText: {
        color: '#756ab6',
        fontSize: 35,
        fontWeight: 'bold',
        alignItems: 'center',
      },
  });
  
