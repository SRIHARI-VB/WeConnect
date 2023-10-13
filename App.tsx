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
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import Login from './Login';

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
  })


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CometChatCalling" component={CometChatCalling} />
        <Stack.Screen name="IncomingCallUI" component={IncomingCallUI} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;