import { CometChat } from '@cometchat/chat-sdk-react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ABRIGHTCONNECT_CONSTANTS } from './CONSTS';
import IncomingCallUI from './IncomingCallUI';
import axios from 'axios';
// import https from 'https';

const CometChatCalling = ({route, navigation}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [incomingCall, setIncomingCall] = useState(null);
    const [authToken, setAuthToken] = useState(null);

    useEffect(()=>{
      // Initialize CometChat (you should provide your own API_KEY and APP_ID)
  CometChat.init(ABRIGHTCONNECT_CONSTANTS.APP_ID, new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion('in').build()).then(
    () => {
      console.log('CometChat initialized successfully');
    },
    (error) => {
      console.log('CometChat initialization failed with error:', error);
    }
  );
    var listnerID = "UNIQUE_LISTENER_ID";
    CometChat.addCallListener(
        listnerID,
        new CometChat.CallListener({
        onIncomingCallReceived: (call:any) => {
          console.log("Incoming call:", call);
          setIncomingCall(call);
          // Handle incoming call
        },
        onOutgoingCallAccepted: (call:any) => {
          console.log("Outgoing call accepted:", call);
          // Outgoing Call Accepted
        },
        onOutgoingCallRejected: (call:any) => {
          console.log("Outgoing call rejected:", call);
          // Outgoing Call Rejected
        },
        onIncomingCallCancelled: (call:any) => {
          console.log("Incoming call calcelled:", call);
        },
         onCallEndedMessageReceived: (call:any) => {
          console.log("CallEnded Message:", call);
        }
    })
    );


      CometChat.getLoggedinUser().then(
        user => {
          if(!user){
            
            CometChat.login(route.params.authToken).then(
            user => {
              console.log("Login Successful:", { user });
              
            }, error => {
              console.log("Login failed with exception:", { error });
            }
          );
        }
        }, error => {
            console.log("Something went wrong", error);
        }
      );
    }, [])

  

  // Function to initiate a call
  const initiateCall = () => {
    const receiverID = 'custom_id_1'; // Replace with the recipient's UID
    const callType = CometChat.CALL_TYPE.VIDEO;
    const receiverType = CometChat.RECEIVER_TYPE.USER;

    const call = new CometChat.Call(receiverID, callType, receiverType);

    CometChat.initiateCall(call).then(
      (outGoingCall) => {
        console.log('Call initiated successfully:', outGoingCall);
        // Handle the call initiation success, e.g., navigate to the call screen
      },
      (error) => {
        console.log('Call initialization failed with exception:', error);
      }
    );
  };

  // Function to accept an incoming call
  const acceptIncomingCall = (sessionID:any) => {
    CometChat.acceptCall(sessionID).then(
      (call) => {
        console.log('Call accepted successfully:', call);
        // Start the call using the startSession() method
      },
      (error) => {
        console.log('Call acceptance failed with error', error);
        // Handle call acceptance error
      }
    );
  };

  // Function to reject an incoming call
  const rejectIncomingCall = (sessionID:any) => {
    const status = CometChat.CALL_STATUS.REJECTED;

    CometChat.rejectCall(sessionID, status).then(
      (call) => {
        console.log('Call rejected successfully', call);
      },
      (error) => {
        console.log('Call rejection failed with error:', error);
      }
    );
  };

  return (
    <View>
      <Text>CometChat Calling Demo</Text>
      <Button title="Initiate Call" onPress={initiateCall} />
      {incomingCall && typeof incomingCall !== 'undefined' && (
        <IncomingCallUI
          visible={true}
          call={incomingCall}
          onAccept={() => acceptIncomingCall(incomingCall.sessionId)}
          onReject={() => rejectIncomingCall(incomingCall.sessionId)}
        />
      )}
    </View>
  );
};

export default CometChatCalling;
