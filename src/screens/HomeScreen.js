import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';

import guntingImage from '../assets/scissors.png';
import batuImage from '../assets/rock.png';
import kertasImage from '../assets/paper.png';

const HomeScreen = ({ navigation, route }) => {
    const [userMove, setUserMove] = useState('');
    const [computerMove, setComputerMove] = useState('');
    const [result, setResult] = useState('');

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
        } else {
            gameResult = 'Lose';
        }

        setUserMove(userChoice);
        setComputerMove(computerChoice);
        setResult(gameResult);
    };

    const handleLogout = () => {
        // Implement logout functionality
        // For example: navigation.navigate('Login');
    };

    // Function to map move names to their respective images
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
            <Text style={styles.title}>Selamat Datang di Permainan</Text>
            <Text style={styles.subtitle}>Pilih salah satu!</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleGame('gunting')}>
                    <Image source={guntingImage} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleGame('batu')}>
                    <Image source={batuImage} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleGame('kertas')}>
                    <Image source={kertasImage} style={styles.image} />
                </TouchableOpacity>
            </View>
            {userMove && computerMove && result && (
                <View style={styles.resultContainer}>
                    <View style={styles.moveContainer}>
                        <Text>User's Move:</Text>
                        <Image source={getImageForMove(userMove)} style={styles.image} />
                    </View>
                    <View style={styles.moveContainer}>
                        <Text>Computer's Move:</Text>
                        <Image source={getImageForMove(computerMove)} style={styles.image} />
                    </View>
                    <Text>Result: {result}</Text>
                </View>
            )}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE5E5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 30,
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
        position: 'absolute',
        bottom: 20,
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 5,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    moveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
});

export default HomeScreen;
