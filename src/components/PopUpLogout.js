
import React, { useEffect, useState } from 'react';
import { TextInput,View, Modal, Text, Button, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

const PopUpLogout = ({ visible, onClose, handleLogout }) => {
  
    return (
        <Modal
        animationType="slide"
        transparent={true}
        // visible={logoutModalVisible}
        visible={visible}
        // onRequestClose={() => setLogoutModalVisible(false)}
        onRequestClose={onClose}
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
                        onPress={onClose}
                    >
                        <Text style={styles.modalButtonText}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default PopUpLogout;