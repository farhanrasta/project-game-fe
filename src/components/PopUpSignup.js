
import React, { useEffect, useState } from 'react';
import { TextInput,View, Modal, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const PopUpSignup = ({ visible, onClose, status, message }) => {
  
    return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Status: {status}</Text>
          <Text>{message}</Text>
          <View style={styles.button}> <Button title="Close" onPress={onClose}/> </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    input: {
        padding: 35
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
  button: {
    padding: 10,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PopUpSignup;