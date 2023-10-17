
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
const VideoCallScreen =  ({ route, navigation }) => {
    const { call, json } = route.params;
    const loggedUser:CometChat.User = route.params.loggedUser;
    const authToken:string|undefined = loggedUser?.getAuthToken();
    const sessionID = call.sessionId;
    const [callToken, setCallToken] = React.useState("");
    console.log("VideoCallScreen Loaded")
    console.log("Logged User: ", loggedUser);
    console.log("Call Token: ", callToken);
    console.log("Call: ", call);
    console.log("JSON: ", json);
    console.log("Auth Token: ", authToken);
    console.log("Session ID: ", sessionID);
    console.log("*******************************");
    // if(authToken){
        console.log("Generating call token");
        
        CometChatCalls.generateToken(authToken, sessionID).then(
            res => {
                console.log("Call token fetched: ", res.token);
                setCallToken(res.token);
                console.log("Call Token: ", callToken);
            },
            err => {
                console.log("Generating call token failed with error: ", err);
            },
        );
    // }
    
    useEffect(() => {
    	CometChatCalls.addCallEventListener('UNIQUE_ID', {
          onUserJoined: user => {
              console.log("user joined:", user);
          },
          onUserLeft: user => {
              console.log("user left:", user);
          },
          onUserListUpdated: userList => {
              console.log("user list:", userList);
          },
          onCallEnded: () => {
              console.log("Call ended");
          },
          onCallEndButtonPressed: () => {
              console.log("End Call button pressed");
          },
          onError: error => {
              console.log('Call Error: ', error);
          },
          onAudioModesUpdated: (audioModes) => {
              console.log("audio modes:", audioModes);
          },
          onCallSwitchedToVideo: (event) => {
              console.log("call switched to video:", event);
          },
          onUserMuted: (event) => {
              console.log("user muted:", event);
          }
    	});
    	return ()=> CometChatCalls.removeCallEventListener('UNIQUE_ID')
    }, [])
    const audioOnly = false;
    const deafaultLayout = true;

    const callListener = new CometChatCalls.OngoingCallListener({
        onUserJoined: user => {
            console.log("user joined:", user);
        },
        onUserLeft: user => {
            console.log("user left:", user);
        },
        onUserListUpdated: userList => {
            console.log("user list:", userList);
        },
        onCallEnded: () => {
            console.log("Call ended");
        },
        onCallEndButtonPressed: () => {
            console.log("End Call button pressed");
        },
        onError: error => {
            console.log('Call Error: ', error);
        },
        onAudioModesUpdated: (audioModes) => {
            console.log("audio modes:", audioModes);
        },
        onCallSwitchedToVideo: (event) => {
            console.log("call switched to video:", event);
        },
        onUserMuted: (event) => {
            console.log("user muted:", event);
        }
    });

    const callSettings = new CometChatCalls.CallSettingsBuilder()
        .enableDefaultLayout(deafaultLayout)
        .setIsAudioOnlyCall(audioOnly)
        .setCallEventListener(callListener)
        .build();

  return (
    <View style={{height: '100%', width: '100%', position: 'relative'}}>
		<CometChatCalls.Component callSettings={callSettings} callToken={callToken} />
    </View>
  );
};

export default VideoCallScreen;
