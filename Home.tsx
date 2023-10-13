import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import { ABRIGHTCONNECT_CONSTANTS } from './CONSTS';
var listnerID = "user2";
function Home({ navigation }) {
    const [isCallInProgress, setIsCallInProgress] = useState(false);


    useEffect(()=>{
        const callAppSettings = new CometChatCalls.CallAppSettingsBuilder()
        .setAppId(ABRIGHTCONNECT_CONSTANTS.APP_ID)
        .setRegion(ABRIGHTCONNECT_CONSTANTS.REGION)
        .build();
    
        CometChatCalls.init(callAppSettings).then(
        () => {
            console.log('CometChatCalls initialization completed successfully');
        },
        error => {
            console.log('CometChatCalls initialization failed with error:', error);
        },
      );
    
      CometChat.addCallListener(
        listnerID,
        new CometChat.CallListener({
          onIncomingCallReceived: (call:any) => {
            console.log("Incoming call:", call);
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
      return () => {
        CometChat.removeCallListener(listnerID);
      }
      }, [])

    // Function to initiate a direct call
    const initiateDirectCall = () => {
        const receiverID = 'custom_id_1'; // Replace with the user you want to call

        // Create a call object
        const call = new CometChat.Call(receiverID, CometChat.CALL_TYPE.AUDIO, CometChat.RECEIVER_TYPE.USER);

        // Initiate the call
        CometChat.initiateCall(call).then(call => {
          console.log('Call initiated:', call);
          setIsCallInProgress(true);
          navigation.navigate('Display', { call });

          // Handle UI to show the call screen

        }).catch(error => {
          console.error('Call initiation failed:', error);
        });
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Connect"
        onPress={initiateDirectCall}
      />
    </View>
  );
}

export default Home;