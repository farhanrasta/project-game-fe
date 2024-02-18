import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, TextInput, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import PopUpSignup from '../components/PopUpSignup';

const SignupScreen = ({ navigation }) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [status, setStatus] = useState(500);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Reset form values when navigating to signup screen
            setUserName('');
            setPassword('');
            setName('');
            setRetypePassword('');
        });

        return unsubscribe;
    }, [navigation]);

    const handleSignUp = async () => {
      try {
          // Check if the password meets the minimum length requirement
          if (password.length < 6) {
              // Show error popup if the password is less than 6 characters
              setErrorModalVisible(true);
              setMessage('Password minimal harus 6 karakter');
              return;
          } 
  
          // Check if password and retype password match
          if (password !== retypePassword) {
              // Show error popup if passwords do not match
              console.log(password, "password");
              console.log(retypePassword, "password22");
              setErrorModalVisible(true);
              setMessage('Password harus sama');
              return;
          }
  
          // Check if the username already exists
          const response = await axios.post('https://kind-fez-ox.cyclic.app/api/signup', { username, password, name, retypePassword });

          console.log('response', response);
  
  
          // If everything is successful, show the success modal and navigate to login screen
          setSuccessModalVisible(true); // Set success modal visible
          setErrorModalVisible(false); // Hide error popup if sign up is successful
        //   navigation.navigate('Login'); // Moved this line to after setting success modal visible
      } catch (error) {
          console.log(error.code);
          if (error.code === 'ERR_NETWORK' || error.code === "ERR_BAD_REQUEST") {
            // Show error popup if the username already exists
            setErrorModalVisible(true);
            setMessage('Username sudah pernah dibuat');
        }
          //setErrorModalVisible(true);
          console.error('Signup Failed', error);
          // Handle other errors
      }
  };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowRetypePassword = () => {
        setShowRetypePassword(!showRetypePassword);
    };

    const onSuccessClose = () => {
        setSuccessModalVisible(false);
        navigation.navigate('Login');
    }; 

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <Image
                    source={require('../assets/gb2.png')}
                    style={styles.logo}
                />
                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#AC87C5" />
                    <TextInput
                        style={styles.input}
                        placeholder="Masukkan Nama"
                        placeholderTextColor="#FFE5E5"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#AC87C5" />
                    <TextInput
                        style={styles.input}
                        placeholder="Masukkan Username"
                        placeholderTextColor="#FFE5E5"
                        value={username}
                        onChangeText={setUserName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    {/* <Icon name="lock" size={20} color="#AC87C5" /> */}
                    <TouchableOpacity onPress={toggleShowPassword}>
                        <Icon name={showPassword ? 'eye-slash' : 'eye'} size={17} color="#AC87C5" />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Masukkan Password"
                        placeholderTextColor="#FFE5E5"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={toggleShowRetypePassword}>
                        <Icon name={showRetypePassword ? 'eye-slash' : 'eye'} size={17} color="#AC87C5" />
                    </TouchableOpacity>
                    {/* <Icon name="lock" size={20} color="#AC87C5" /> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Masukkan Ulang Password"
                        placeholderTextColor="#FFE5E5"
                        value={retypePassword}
                        onChangeText={setRetypePassword}
                        secureTextEntry={!showPassword}
                    />

                </View>

                <TouchableOpacity
                    disabled={!username || !password || !name || !retypePassword }
                    style={styles.signbutton}
                    onPress={handleSignUp}>
                    <Text style={styles.signtext}>Sign Up</Text>
                </TouchableOpacity>

                <PopUpSignup
                    errorVisible={errorModalVisible} // Add a new prop for error popup visibility
                    successVisible={successModalVisible} // Add a new prop for success popup visibility
                    onCloseError={() => {
                        setErrorModalVisible(false);
                    }}
                    onCloseSuccess={onSuccessClose}
                    status={status}
                    message={message}
                />      

                {/* <Modal
                    animationType="fade"
                    transparent={true}
                    visible={successModalVisible}
                    onRequestClose={() => setSuccessModalVisible(false)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Akun berhasil dibuat!</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setSuccessModalVisible(false)}
                            >
                                <Text style={styles.okText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal> */}
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
    inputContainer: {
        flexDirection: 'row',
        width: 300,
        alignItems: 'center',
        justifyContent : 'center',
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
    signbutton: {
        backgroundColor: '#AC87C5',
        padding: 10,
        borderRadius: 5,
        width: 200,
        alignItems: 'center',
        marginTop: 20,
    },
    signtext: {
        color: '#FFE5E5',
        alignItems: 'center',
        fontWeight: 'bold',
        position: 'relative',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#AC87C5',
        padding: 10,
        borderRadius: 5,
        width: 70,
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'center',
    },
    okText: {
        color: '#FFE5E5',
        alignItems: 'center',
        fontWeight: 'bold',
        position: 'relative',
    },
});
