import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import PopUpModal from '../components/PopUpModal';

const HomeScreen = ({ navigation, route }) => {

    const { username, token } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [userMove, setUserMove] = useState('');
    const [computerMove, setComputerMove] = useState('');
    const [result, setResult] = useState('');

    const handleGame = async (move) => {

        console.log("userMove:", move);
        console.log(token);
        console.log(username);

        try{
            const respons = await axios.post(`http://localhost:5000/api/game/${username}`, {userMove: move},{
                headers: {
                    Authorization : `Bearer ${token}`,
                    'Content-type' : 'application/json'
                }
            });
            setUserMove(respons.data.userMove);
            console.log("userMOOOOOVE:" ,respons.data)
            setComputerMove(respons.data.computerMove);
            setResult(respons.data.result);

            console.log("Game Result Alert:", `User Move: ${respons.data.userMove}\nComputer Move: ${respons.data.computerMove}\nResult: ${respons.data.result}`);

            setModalVisible(true);
            // Alert.alert(
            //     'Game Result',
            //     `User Move: ${respons.data.userMove}\nComputer Move: ${respons.data.computerMove}\nResult: ${respons.data.result}`,
            //     [{ text: 'OK' }]
            //   );
        } catch (error) {
            console.error('Game Error', error);
        }
    };

    const handleLogout = async () => {

        try{
            const respons = await axios.delete(`http://localhost:5000/api/logout/${username}`,{
                headers: {
                    Authorization : `Bearer ${token}`,
                    'Content-type' : 'application/json'
                }
            });
            console.log(respons);
            
            if (respons.status === 200) {
                navigation.navigate('Login');
                console.log('Logout Success');
            } else {
                console.log('Logout Failed');
            }
        } catch (error) {
            console.error('Logout Error', error);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
      };

    return(
        <View style = {styles.container}>
            <View><Text>Selamat Datang di Permainan</Text></View>
            <View style={styles.logoutButton}>
            <Button
                title="logout"
                onPress={() => handleLogout()}
            />
            </View>
            <View style = {styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button
                    title="Gunting"
                    onPress={() => handleGame('gunting')}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                    title="Batu"
                    onPress={() => handleGame('batu')}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                    title="Kertas"
                    onPress={() => handleGame('kertas')}
                    />
                </View>
                <PopUpModal  
                    visible={modalVisible} 
                    onClose={handleCloseModal} 
                    userMove={userMove} 
                    computerMove={computerMove}
                    result={result}
                    />
            </View>
        </View>

    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 20,
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  buttonWrapper: {
    marginRight: 20
  },
});