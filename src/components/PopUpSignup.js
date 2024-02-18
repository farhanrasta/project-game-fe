import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PopUpSignup = ({ errorVisible, successVisible, onCloseError, message, onCloseSuccess }) => {
    // Determine which modal to show based on props
    const visible = errorVisible || successVisible;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onCloseError={onCloseError}
            onCloseSuccess={onCloseSuccess}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>{errorVisible ? message : 'Akun berhasil dibuat!'}</Text>
                    <TouchableOpacity onPress={errorVisible ? onCloseError : onCloseSuccess} style={styles.button}>
                        <Text style={styles.okText}>OK</Text>
                    </TouchableOpacity>
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
    button: {
        padding: 10,
        borderRadius: 5,
        width: 70,
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'center',
        backgroundColor: '#AC87C5',
    },
    okText: {
        color: '#FFE5E5',
        fontWeight: 'bold',
    },
});

export default PopUpSignup;
