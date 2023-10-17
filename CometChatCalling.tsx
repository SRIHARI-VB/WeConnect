import { CometChat } from '@cometchat/chat-sdk-react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, Modal } from 'react-native';
import { ABRIGHTCONNECT_CONSTANTS } from './CONSTS';
import IncomingCallUI from './IncomingCallUI';
import RejectOutGoingCall from './RejectOutGoingCall';

var listnerID = "UNIQUE_LISTENER_ID";

const CometChatCalling = ({route, navigation}) => {
    const [incomingCall, setIncomingCall] = useState(null);
    const [isIncomingCall, setIsIncomingCall] = useState(false);
    const [receiverUID, setReceiverUID] = useState("");
    const [showRejectionNotification, setShowRejectionNotification] = useState(false);

    const loggedUser:CometChat.User | null = route.params.loggedUser;
    useEffect(()=>{
      CometChat.addCallListener(
        listnerID,
        new CometChat.CallListener({
        onIncomingCallReceived: (call:any) => {
          console.log("Incoming call:", call);
          setIncomingCall(call);
          setIsIncomingCall(true)
        },
        onOutgoingCallAccepted: (call:any) => {
          console.log("Outgoing call accepted:", call);
        },
        onOutgoingCallRejected: (call:any) => {
          console.log("Outgoing call rejected:", call);
          setShowRejectionNotification(true);
          setIncomingCall(null)
          setIsIncomingCall(false)
        },
        onIncomingCallCancelled: (call:any) => {
          console.log("Incoming call calcelled:", call);
          
        },
         onCallEndedMessageReceived: (call:any) => {
          console.log("CallEnded Message:", call);
        }
    })
    );
    return () => {
      CometChat.removeCallListener(listnerID);
    }
    }, [])

  

  // Function to initiate a call
  const initiateCall = () => {
    console.log("Initiating Call")
    const receiverID = receiverUID; // Replace with the recipient's UID
    const callType = CometChat.CALL_TYPE.VIDEO;
    const receiverType = CometChat.RECEIVER_TYPE.USER;

    const call = new CometChat.Call(receiverID, callType, receiverType);

    CometChat.initiateCall(call).then(
      (outGoingCall) => {
        console.log('Call initiated successfully:', outGoingCall);
      },
      (error) => {
        console.log('Call initialization failed with exception:', error);
      }
    );
  };

  // Function to accept an incoming call
  const acceptIncomingCall = (sessionID) => {
    CometChat.acceptCall(sessionID).then(
      (call) => {
        console.log('Call accepted successfully:', call);
        console.log("Logged User: ", loggedUser);
        navigation.navigate('VideoCallScreen', {loggedUser: loggedUser, json:route.params.json, call:call })
      },
      (error) => {
        console.log('Call acceptance failed with error', error);
      }
    );
  };

  // Function to reject an incoming call
  const rejectIncomingCall = (sessionID) => {
    const status = CometChat.CALL_STATUS.REJECTED;

    CometChat.rejectCall(sessionID, status).then(
      (call) => {
        console.log('Call rejected successfully', call);
        setIncomingCall(null);
        setIsIncomingCall(false);
      },
      (error) => {
        console.log('Call rejection failed with error:', error);
      }
    );
  };

  return (
    
    <View style={{flex:1, display:"flex", justifyContent:"center", alignItems:"center", gap:16}}>
      
      {(incomingCall) && (
        <IncomingCallUI 
          call={incomingCall} 
          visible={isIncomingCall}
          acceptCall={() => acceptIncomingCall(incomingCall.sessionId)} 
          rejectCall={() => rejectIncomingCall(incomingCall.sessionId)}
        />
      )}
      <Text style={{color:"black", fontSize: 16, fontWeight:"500"}}>Enter Reciever UID</Text>

        <TextInput
          style={{backgroundColor:"black", width:"80%", borderRadius:10, padding:10, color:"white"}}
          placeholder="UID"
          placeholderTextColor={"white"}
          value={receiverUID}
          onChangeText={txt=>{setReceiverUID(txt)}}
        />
      <TouchableOpacity
        onPress={initiateCall}
        style={{
          backgroundColor: 'lightblue',
          width: '50%',
          borderRadius: 10,
          padding: 10,
        }}>
        <Text style={{ color: 'black', fontSize: 16, fontWeight: '500', textAlign: 'center' }}>
          Initiate Call
        </Text>
      </TouchableOpacity>
      {/* {showRejectionNotification && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={showRejectionNotification}
          onRequestClose={() => setShowRejectionNotification(false)}
        >
          <RejectOutGoingCall onDismiss={() => {setShowRejectionNotification(false);setIsIncomingCall(false)}} />
        </Modal>
      )} */}
      
    </View>
  );
};

export default CometChatCalling;
