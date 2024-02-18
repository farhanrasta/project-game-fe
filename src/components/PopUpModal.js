import React from 'react';
import { Modal, View, Text, Button, StyleSheet, Image } from 'react-native';
import guntingImage from '../assets/scissors.png';
import batuImage from '../assets/rock.png';
import kertasImage from '../assets/paper.png';
import vS from '../assets/vs2.png';

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

const PopUpModal = ({ visible, onClose, userMove, computerMove, result }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.resultContainer}>
                        <View style={styles.moveContainer}>
                            <Text style={styles.text1}>You</Text>
                            <Image source={getImageForMove(userMove)} style={styles.image} />
                        </View>
                        <Image source={vS} style={styles.image} />
                        <View style={styles.moveContainer}>
                            <Text style={styles.text2}>Computer</Text>
                            <Image source={getImageForMove(computerMove)} style={styles.image} />
                        </View>
                    </View>
                    <Text>{result}</Text>
                    <View style={styles.button}>
                        <Button title="Close" onPress={onClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
    resultContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    moveContainer: {
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    button: {
        padding: 10,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text1: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text2: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PopUpModal;
