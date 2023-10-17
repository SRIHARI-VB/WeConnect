
import React from 'react';
import { View, Text, Button } from 'react-native';

const RejectOutGoingCall = ({ onDismiss }) => {
  return (
    <View style={{flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap:16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',}}
    >
      <Text style={{color:"black", fontSize:16}}>Your call was rejected</Text>
      <Button title="OK" onPress={onDismiss} />
    </View>
  );
};

export default RejectOutGoingCall;
