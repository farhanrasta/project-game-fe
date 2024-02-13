import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';

import guntingImage from '../assets/scissors.png';
import batuImage from '../assets/rock.png';
import kertasImage from '../assets/paper.png';
import vS from '../assets/vs.png';
import PopUpModal2 from '../components/PopUpModal2';
import tes1Image from '../assets/tes1.png';

const HomeScreen = ({ navigation, route }) => {
    const [userMove, setUserMove] = useState('');
    const [computerMove, setComputerMove] = useState('');
    const [result, setResult] = useState('');
    const [score, setScore] = useState(0); // Initialize score to 0
    const [userWins, setUserWins] = useState(0); // Initialize userWins to 0
    const [computerWins, setComputerWins] = useState(0); // Initialize computerWins to 0
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleGame = (userChoice) => {
        const choices = ['gunting', 'batu', 'kertas'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        let gameResult;
        if (userChoice === computerChoice) {
            gameResult = 'Draw';
        } else if (
            (userChoice === 'gunting' && computerChoice === 'kertas') ||
            (userChoice === 'batu' && computerChoice === 'gunting') ||
            (userChoice === 'kertas' && computerChoice === 'batu')
        ) {
            gameResult = 'Win';
            setUserWins(userWins + 1); // Increment userWins by 1
            setScore(score + 1); // Increase score by 100 for a win
        } else {
            gameResult = 'Lose';
            setComputerWins(computerWins + 1); // Increment computerWins by 1
            setScore(score - 1); // Decrease score by 50 for a loss
        }

        setUserMove(userChoice);
        setComputerMove(computerChoice);
        setResult(gameResult);
        setIsModalVisible(true); // Show the modal after the game result is determined
    };

    const handleModalClose = () => {
        setIsModalVisible(false); // Close the modal
        setUserMove('');
        setComputerMove('');
        setResult('');
    };

    const handleLogout = () => {
        // Implement logout functionality
        // For example: navigation.navigate('Login');
    };

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

    return (
        <View style={styles.container}>
            {/* <Image source={tes1Image} style={styles.image2} /> */}
            <Text style={styles.title}>Pilih Salah Satu!</Text>
            {/* <Text style={styles.subtitle}>Pilih salah satu!</Text> */}
            <Text style={styles.subtitle}> </Text>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>Skor Anda : {userWins}</Text>
                <Text style={styles.scoreText}>Skor Lawan : {computerWins}</Text>
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
                                <Text>User</Text>
                                <Image source={getImageForMove(userMove)} style={styles.image} />
                            </View>
                            <Image source={vS} style={styles.image} />
                            <View style={styles.moveContainer}>
                                <Text>Computer</Text>
                                <Image source={getImageForMove(computerMove)} style={styles.image} />
                            </View>
                        </View>
                        <Text style={[styles.resultText, styles.resultOutcomeText]}>{result}</Text>
                    </View>
                )}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <PopUpModal2 visible={isModalVisible} onClose={handleModalClose} result={result} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE5E5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    scoreContainer: {
        flexDirection: 'row',
        marginBottom: 10,
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
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    image2: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginBottom : 10,
        marginTop : 10,
    },
    logoutButton: {
        backgroundColor: '#AC87C5',
        padding: 10,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: 'white',
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
});

export default HomeScreen;
