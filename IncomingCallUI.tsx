import React from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';

const IncomingCallUI = (props:any) => {
  const { visible, call, onAccept, onReject } = props;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.callInfoContainer}>
          <Text style={styles.callerName}>{call.sender.name}</Text>
          <Text style={styles.callStatus}>Incoming Call</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Accept" onPress={onAccept} />
          <Button title="Reject" onPress={onReject} />
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
  },
  callStatus: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default IncomingCallUI;
