import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import guntingImage from '../assets/scissors.png';
import batuImage from '../assets/rock.png';
import kertasImage from '../assets/paper.png';
import vS from '../assets/vs.png';

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
    const computerMoves = [guntingImage, batuImage, kertasImage];

    useEffect(() => {
        if (animationRunning) {
            const interval = setInterval(() => {
                setComputerMoveIndex((prevIndex) => (prevIndex + 1) % 3);
            }, 100); // Change image every 0.1 second

            // Stop animation after 3 seconds
            setTimeout(() => {
                clearInterval(interval);
                setAnimationRunning(false); // Animation completes
            }, 3000);
        }
    }, [animationRunning]);

    const handleGame = (userChoice) => {
        const choices = ['gunting', 'batu', 'kertas'];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        setUserMove(userChoice);
        setComputerMove('running'); // Set computer move to a running state initially
        setAnimationRunning(true); // Start animation

        // Determine game result after 3 seconds
        setTimeout(() => {
            setComputerMove(computerChoice); // Set final computer move
            let gameResult;
            if (userChoice === computerChoice) {
                gameResult = 'Draw';
            } else if (
                (userChoice === 'gunting' && computerChoice === 'kertas') ||
                (userChoice === 'batu' && computerChoice === 'gunting') ||
                (userChoice === 'kertas' && computerChoice === 'batu')
            ) {
                gameResult = 'Win';
                setUserWins(userWins + 1);
                setScore(score + 1);
            } else {
                gameResult = 'Lose';
                setComputerWins(computerWins + 1);
                setScore(score - 1);
            }
            setResult(gameResult);
            setIsModalVisible(true);
        }, 3000);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setUserMove('');
        setComputerMove('');
        setResult('');
    };

    const handleLogout = () => {
        // Implement logout functionality
        // For example: navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pilih Salah Satu!</Text>
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
                                <Image source={computerMoves[computerMoveIndex]} style={styles.image} />
                            </View>
                        </View>
                        <Text style={[styles.resultText, styles.resultOutcomeText]}>{result}</Text>
                    </View>
                )}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
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
