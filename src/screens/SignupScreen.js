import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, Button, TextInput, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState} from 'react';
import axios from 'axios';
import PopUpError from '../components/PopUpError';
 
const SignupScreen = ({navigation}) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
 
    const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = useState(500);
    const [message, setMessage] = useState('');
 
    const handleSignUp = async () => {
      console.log("apa gitu")
        try{
            const respons = await axios.post('http://localhost:5000/api/signup', {username, password, name, retypePassword});
            console.log('respons' ,respons);
            // setUserName(respons.data.username);
            // setPassword(respons.data.password);
 

//             setModalVisible(true);
            navigation.navigate('Login');

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
 
    // const handleSignUp = () => {
    //     if (password === retypePassword) {
    //       // Passwords match, proceed with sign-up logic
    //       Alert.alert('Sukses', 'Password sama');
    //       // Add your sign-up logic here
    //     } else {
    //       // Passwords don't match, show an error message
    //       Alert.alert('Salah', 'Password tidak sama. Ketik ulang password');
    //     }
    //   };
 
    const handleCloseModal = () => {
        setModalVisible(false);
        navigation.navigate('Login');
      };
 
    return(
        <View style={styles.container}>
           
            <View style={styles.loginContainer}>
            <Image
                source={require('../assets/gb2.png')} // Adjust the path based on your project structure
                style={styles.logo}
            />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="user" size={20} color="#AC87C5" />
                <TextInput
                    style={styles.input}
                    placeholder='Masukkan Nama'
                    placeholderTextColor='#FFE5E5'
                    value={name}
                    onChangeText={(String => setName(String))}
                />
                </View>
 
               
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="user" size={20} color="#AC87C5" />
                <TextInput
                    style={styles.input}
                    placeholder='Masukkan Username'
                    placeholderTextColor='#FFE5E5'
                    value={username}
                    onChangeText={(String => setUserName(String))}
                />
                </View>
               
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="lock" size={20} color="#AC87C5" />
                <TextInput
                    style={styles.input}
                    placeholder='Masukkan Password'
                    placeholderTextColor='#FFE5E5'
                    value={password}
                    onChangeText={(String => setPassword(String))}
                    secureTextEntry
                />
                 </View>
               
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="lock" size={20} color="#AC87C5" />
                <TextInput
                    style={styles.input}
                    placeholder='Masukkan Ulang Password'
                    placeholderTextColor='#FFE5E5'
                    value={retypePassword}
                    onChangeText={(String => setRetypePassword(String))}
                    secureTextEntry
                />
                </View>
   
 
 
                <TouchableOpacity disabled={!username || !password || !name || !retypePassword || password !== retypePassword}
                style={styles.signbutton} onPress={handleSignUp} >
                    <Text style={styles.signtext}>Sign Up</Text>
                   
                </TouchableOpacity>
               
                <PopUpError
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
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFE5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  logo: {
    width: 130,
    height: 180,
    alignItems: 'center',
    marginBottom: 10,
  },
 
  loginContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 300,
    height: 40,
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#AC87C5',
    backgroundColor: '#E0AED0',
  },
 
    signbutton:{
        backgroundColor: '#AC87C5',
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
        marginTop:20
  },
 
   signtext:{
    color: '#FFE5E5',
    alignItems: 'center',
    fontWeight: 'bold',
    position: 'relative'
   }
 
 
 
});