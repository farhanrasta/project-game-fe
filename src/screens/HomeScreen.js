import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal,Pressable } from 'react-native';
import axios from 'axios';

import guntingImage from '../assets/scissors.png';
import batuImage from '../assets/rock.png';
import kertasImage from '../assets/paper.png';
import vS from '../assets/vs2.png';
import homepageImage from '../assets/gb2.png';
import settingImage from '../assets/logout.png';
import restartImage from '../assets/restart.png';
import PopUpModal from '../components/PopUpModal';

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

const HomeScreen = ({ navigation, route }) => {
    const [userMove, setUserMove] = useState('');
    const [computerMove, setComputerMove] = useState('');
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0);
    const [userWins, setUserWins] = useState(0);
    const [computerWins, setComputerWins] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [animationRunning, setAnimationRunning] = useState(false);
    const [computerMoveIndex, setComputerMoveIndex] = useState(0);
    const computerMoves = [kertasImage, guntingImage, batuImage];
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);

    const { username, token } = route.params;

    useEffect(() => {
        if (animationRunning) {
            const interval = setInterval(() => {
                const index = (prevIndex) => (prevIndex + 1) % 3;
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
    }, [animationRunning]);

    const handleGame = (userChoice) => {
        console.log('userChoice', userChoice);

        console.log('computerMoveIndex', computerMoveIndex);
        const choices = ['gunting', 'batu', 'kertas'];
        const computerChoice = choices[computerMoveIndex];

        setUserMove(userChoice);
        // console.log(userMove);
        setComputerMove('running'); // Set computer move to a running state initially
        setAnimationRunning(true); // Start animation

        // Determine game result after 3 seconds
        setTimeout( async () => {
            setComputerMove(computerMoveIndex); // Set final computer move
            try{
                const respons = await axios.post(`http://localhost:5000/api/game/${username}`, {userMove : userChoice, computerMove: computerChoice},{
                    headers: {
                        Authorization : `Bearer ${token}`,
                        'Content-type' : 'application/json'
                    }
                });

                setUserMove(respons.data.userMove);
                console.log("userMOOOOOVE:" ,respons.data)
                setComputerMove(respons.data.computerMove);
                setResult(respons.data.result);
                setUserWins(respons.data.userWins);
                setComputerWins(respons.data.computerWins);
    
                console.log("Game Result Alert:", `User Move: ${respons.data.userMove}\nComputer Move: ${respons.data.computerMove}\nResult: ${respons.data.result}`);
                console.log("Game Result Alert:", `User Wins: ${respons.data.userWins}\nComputer Wins: ${respons.data.computerWins}`);
                setIsModalVisible(true);
                // Alert.alert(
                //     'Game Result',
                //     `User Move: ${respons.data.userMove}\nComputer Move: ${respons.data.computerMove}\nResult: ${respons.data.result}`,
                //     [{ text: 'OK' }]
                //   );
            } catch (error) {
                console.error('Game Error', error);
            }
            // setComputerMove(computerChoice); // Set final computer move
            // let gameResult;
            // if (userChoice === computerChoice) {
            //     gameResult = 'Draw';
            // } else if (
            //     (userChoice === 'gunting' && computerChoice === 'kertas') ||
            //     (userChoice === 'batu' && computerChoice === 'gunting') ||
            //     (userChoice === 'kertas' && computerChoice === 'batu')
            // ) {
            //     gameResult = 'Win';
            //     setUserWins(userWins + 1);
            //     setScore(score + 1);
            // } else {
            //     gameResult = 'Lose';
            //     setComputerWins(computerWins + 1);
            //     setScore(score - 1);
            // }
            // setResult(gameResult);
            // setIsModalVisible(true);
        }, 1000);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setUserMove('');
        setComputerMove('');
        setResult('');
    };

    const handleLogout = () => {
        // Perform logout operation here
        // For example: navigation.navigate('Login');
        setLogoutModalVisible(false); // Close the logout modal
    };

    const handleRestart = async () => {
        setUserWins(0);
        console.log("UserWins:" , userWins)
        setComputerWins(0);
        console.log("ComputerWins:" , computerWins)
        console.log("Token:" , token)

        try{
            const respons = await axios.post(`http://localhost:5000/api/game/reset/${username}`, {userWins : userWins, computerWins : computerWins},{
                    headers: {
                        Authorization : `Bearer ${token}`,
                        'Content-type' : 'application/json'
                    }
                });
                console.log('Reset response:', response.data);
        } catch (error) {
            console.error('Game Error', error);
        }

    };

    return (
        <View style={styles.container}>
            <View style={styles.settingContainer}>
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

                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={logoutModalVisible}
                    onRequestClose={() => setLogoutModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                            <View style={styles.modalButtonContainer}>
                                <Pressable
                                    style={[styles.modalButton, { backgroundColor: '#AC87C5' }]}
                                    onPress={handleLogout}
                                >
                                    <Text style={styles.modalButtonText}>Logout</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.modalButton, { backgroundColor: '#E0AED0' }]}
                                    onPress={() => setLogoutModalVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                {/* Setting Button */}
                {/* <TouchableOpacity style={styles.leaderboardButton} onPress={handleRestart}>
                    <Text style={styles.logoutButtonText}>Leaderboard</Text>
                </TouchableOpacity>  */}      
            </View>
        </View>
    );
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
        backgroundColor: '#E493B3',
        padding: 10,
        borderRadius: 5,
        marginTop : 40,
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

export default HomeScreen;
