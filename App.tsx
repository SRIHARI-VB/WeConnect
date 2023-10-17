// In App.js in a new project

import * as React from 'react';
import { View, Text, Platform, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./Home";
import Display from './Display';
import { useEffect } from 'react';
import { CometChatCalls } from '@cometchat/calls-sdk-react-native';
import { ABRIGHTCONNECT_CONSTANTS } from './CONSTS';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import CometChatCalling from './CometChatCalling';
import IncomingCallUI from './IncomingCallUI';
import Login from './Login';
import VideoCallScreen from './VideoCallScreen';
const Stack = createNativeStackNavigator();

function App() {
  const getPermissions = () => {
    if (Platform.OS == "android") {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }
  }

    useEffect(()=>{
      getPermissions();
      console.log("App.js Loaded")


      // Initialize CometChat (you should provide your own API_KEY and APP_ID)
      CometChat.init(ABRIGHTCONNECT_CONSTANTS.APP_ID, new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion('in').build()).then(
        () => {
          console.log('CometChat initialized successfully');
        },
        (error) => {
          console.log('CometChat initialization failed with error:', error);
        }
      );
    }, [])

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CometChatCalling" component={CometChatCalling} />
          <Stack.Screen name="VideoCallScreen" component={VideoCallScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }


export default App;