
import React, { useEffect, useState } from 'react';
import { TextInput,View, Modal, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const PopUpLogin = ({ visible, onClose, message }) => {
  
    return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>{message}</Text>
          <View style={styles.button}> 
            <TouchableOpacity>
              <Text onPress={onClose} style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
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
    borderRadius: 5,
    width: 70,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    backgroundColor:'#AC87C5'
  },
  okText: {
    color: '#FFE5E5',
    alignItems: 'center',
    fontWeight: 'bold',
    position: 'relative'
  },
});

export default PopUpLogin;