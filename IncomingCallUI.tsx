import React from 'react';
import { View, Text, Button, Modal, StyleSheet, Touchable, TouchableOpacity } from 'react-native';

const IncomingCallUI = (props) => {
  const { visible, call, acceptCall, rejectCall } = props;
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
    >
      <View style={styles.modalContainer}>
        <View style={styles.callInfoContainer}>
          <Text style={styles.callerName}>{call.sender.name}</Text>
          <Text style={styles.callStatus}>Incoming Call</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={acceptCall} style={{backgroundColor:"lightgreen", borderRadius:10}}>
            <Text style={{textAlign:"center", color:"black", padding:10, fontSize:16}}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={rejectCall} style={{backgroundColor:"red", borderRadius:10}}>
            <Text style={{textAlign:"center", color:"black", padding:10, fontSize:16}}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  callInfoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  callerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  callStatus: {
    fontSize: 16,
    color:'grey'
  },
  buttonContainer: {
    flexDirection: 'row',
    gap:10,
    marginTop: 20,
  },
});

export default IncomingCallUI;
