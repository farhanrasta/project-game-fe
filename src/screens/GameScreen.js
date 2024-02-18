import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal,Pressable } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook


import guntingImage from '../assets/scissors.png';
import batuImage from '../assets/rock.png';
import kertasImage from '../assets/paper.png';
import vS from '../assets/vs2.png';
import homepageImage from '../assets/gb2.png';
import settingImage from '../assets/logout.png';
import restartImage from '../assets/restart.png';
import PopUpModal from '../components/PopUpModal';
import PopUpLogout from '../components/PopUpLogout';
import leaderboardImage from '../assets/leaderboard.png';
import atmaMedium from '../assets/Atma-Medium.ttf';


const getImageForMove = (move) => {
    switch (move) {
        case 'gunting':
            return guntingImage;
        case 'batu':
            return batuImage;
        case 'kertas':
            return kertasImage;
        default:
            return null;
    }
};

const GameScreen = ({ navigation, route }) => {
    const [userMove, setUserMove] = useState('');
    const [computerMove, setComputerMove] = useState('');
    const [result, setResult] = useState('');
    const [userWins, setUserWins] = useState(0);
    const [computerWins, setComputerWins] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [animationRunning, setAnimationRunning] = useState(false);
    const [computerMoveIndex, setComputerMoveIndex] = useState(0);
    const computerMoves = [guntingImage, batuImage, kertasImage];
    const choices = ['gunting', 'batu', 'kertas'];
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const { username, token } = route.params;

    useEffect(() => {
        navigation.setParams({ toggleModal: () => setLogoutModalVisible(true) });
    }, false);

    useEffect(() => {
        if (animationRunning) {
            const interval = setInterval(() => {
                // const index = (prevIndex) => (prevIndex + 1) % 3;
                const index = Math.floor(Math.random() * computerMoves.length);
                setComputerMoveIndex(index);
                console.log('computerMoveIndex', computerMoveIndex);
                console.log('computerMoves', computerMoves);
            }, 100); // Change image every 0.1 second

            // Stop animation after 3 seconds
            setTimeout(() => {
                clearInterval(interval);
                setAnimationRunning(false); // Animation completes
            }, 1000);
        }
    }, [animationRunning, computerMoves.length]);

    useEffect(() => {
        console.log('Current computerMoveIndex:', computerMoveIndex);
    }, [computerMoveIndex]);
    
    useEffect(() => {
        console.log('Current computerChoice:', computerMoves[computerMoveIndex]);
    }, [computerMoves, computerMoveIndex]);

    const handleRestart = async () => {
        console.log("handleRestart");
        setUserWins(0);
        setComputerWins(0)
        try{
            const response = await axios.post(
                `https://joey-pet-minnow.ngrok-free.app/api/game/reset/${username}`, {}, 
                {
                    headers: {
                        Authorization : `Bearer ${token}`,
                        'Content-Type' : 'application/json'
                    }
                });
                console.log('Reset ee:', response.data);
        } catch (error) {
            console.error('Game Error', error);
        }

    };


    const handleGame = async (userChoice) => {
        console.log('userChoice', userChoice);
        const computerIndex = Math.floor(Math.random() * choices.length); // Randomize computer move index
        const computerChoice = choices[computerIndex]; // Get computer choice based on random index
    
        setUserMove(userChoice);
        setComputerMove('running'); // Set computer move to a running state initially
        setAnimationRunning(true); // Start animation

        // Determine game result after 3 seconds
        setTimeout( async () => {
            // setComputerMove(computerMoveIndex); // Set final computer move
            try{
                const response = await axios.post(`https://joey-pet-minnow.ngrok-free.app/api/game/${username}`, {userMove : userChoice, computerMove: computerChoice},{
                    headers: {
                        Authorization : `Bearer ${token}`,
                        'Content-type' : 'application/json'
                    }
                });

                setUserMove(response.data.userMove);
                console.log("userMOOOOOVE:" ,response.data)
                setComputerMove(response.data.computerMove);
                setResult(response.data.result);
                setUserWins(response.data.userWins);
                setComputerWins(response.data.computerWins);
    
                console.log("Game Result Alert:", `User Move: ${response.data.userMove}\nComputer Move: ${response.data.computerMove}\nResult: ${response.data.result}`);
                console.log("Game Result Alert:", `User Wins: ${response.data.userWins}\nComputer Wins: ${response.data.computerWins}`);
                setIsModalVisible(true);
            
            } catch (error) {
                console.error('Game Error', error);
            }
        }, 1000);
    };
    
    
    const handleModalClose = () => {
        setIsModalVisible(false);
        setUserMove('');
        setComputerMove('');
        setResult('');
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

    const handleLeaderboardNavigation = () => {
        navigation.navigate('Leaderboard',{username, token}); // Navigate to the leaderboard page
    };

    
    return (
        <View style={styles.container}>
            <View style={styles.settingContainer}>
            <TouchableOpacity style={styles.leaderboardButton} onPress={handleLeaderboardNavigation}>
                <Image source={leaderboardImage} style={styles.logo2} />
                </TouchableOpacity> 
                <TouchableOpacity style={styles.settingButton} onPress={handleRestart}>
                <Image source={restartImage} style={styles.logo} />
                </TouchableOpacity>  
                <TouchableOpacity
                    style={styles.settingButton}
                    onPress={() => setLogoutModalVisible(true)}
                >
                    <Image source={settingImage} style={styles.logo} />
                </TouchableOpacity>
                </View>
            <Image source={homepageImage} style={styles.image2} />
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>  {userWins}</Text>
                <Text style={styles.scoreText}>:  {computerWins}</Text>
            </View>
            <View style={styles.gameContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleGame('gunting')}>
                        <Image source={guntingImage} style={styles.image} />
                    </TouchableOpacity>
                    <Text>   </Text>
                    <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleGame('batu')}>
                        <Image source={batuImage} style={styles.image} />
                    </TouchableOpacity>
                    <Text>   </Text>
                    <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleGame('kertas')}>
                        <Image source={kertasImage} style={styles.image} />
                    </TouchableOpacity>
                    <Text>   </Text>
                </View>
                {userMove && computerMove && result && (
                    <View>
                        <View style={styles.resultContainer}>
                            <View style={styles.moveContainer}>
                                <Text>You</Text>
                                <Image source={getImageForMove(userMove)} style={styles.image} />
                            </View>
                            <Image source={vS} style={styles.image} />
                            <View style={styles.moveContainer}>
                                <Text>Computer</Text>
                                <Image source={computerMoves[computerMoveIndex]} style={styles.image} />
                            </View>
                        </View>
                        {/* <Text style={[styles.resultText, styles.resultOutcomeText]}>{result}</Text> */}
                    </View>
                )}
                    

                    {/* <PopUpModal
                        visible={isModalVisible}
                        onClose={handleModalClose}
                        userMove={userMove}
                        computerMove={computerMove}
                        result={result}
                    /> */}
                    {/* Logout Modal */}
                    <PopUpLogout 
                    visible={logoutModalVisible}
                    onClose={() => setLogoutModalVisible(false)}
                    handleLogout={handleLogout}
                    />

                    
                {/* Setting Button */}
                {/* <TouchableOpacity style={styles.leaderboardButton} onPress={handleRestart}>
                    <Text style={styles.logoutButtonText}>Leaderboard</Text>
                </TouchableOpacity>  */}      
            </View>
        </View>
    );
};

GameScreen.navigationOptions =  {
    headerLeft: () => null
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE5E5',
        alignItems: 'center',
    },
    scoreContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#E0AED0',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        // Add shadow properties
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 10, // Android only
    },
    logo2: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        justifyContent: 'flex-end' ,
        marginLeft: 15,
        padding: 20,
        borderRadius: 15,
    },
    scoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    resultContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    settingContainer: {
        position: 'absolute',
        flexDirection: 'row',
        top: 20,
        right: 20,
    },
    moveContainer: {
        alignItems: 'center',
    },
    gameContainer: {
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    buttonWrapper: {
        backgroundColor: '#FAF6F0',
        padding: 10,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 10, // Android only
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    image2: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginTop : 20,
        marginLeft: 10,
    },
    logo: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        justifyContent: 'flex-end' ,
        marginLeft: 5,
    },
    leaderboardButton: {
        padding: 10,
        borderRadius: 5,
        marginTop : -20,
        marginRight : 275,
    },
    restartButton: {
        backgroundColor: '#E0AED0',
        padding: 10,
        borderRadius: 5,
        marginTop : 40,
    },
    logoutButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultOutcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    settingsButton: {
        marginRight: 10,
        color: 'blue',
        fontSize: 16,
    },
        // Modal styles
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
        },
        modalText: {
            fontSize: 18,
            marginBottom: 20,
        },
        modalButtonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        modalButton: {
            padding: 10,
            borderRadius: 5,
        },
        modalButtonText: {
            color: 'white',
            fontWeight: 'bold',
        },
});

export default GameScreen;
