import * as React from 'react';
import { View, Text, SafeAreaView, TextInput, Touchable, TouchableOpacity } from 'react-native';
import CometChatCalling from './CometChatCalling';
import axios from 'axios';
import { ABRIGHTCONNECT_CONSTANTS } from './CONSTS';
import { CometChat } from '@cometchat/chat-sdk-react-native';

function Login({navigation}) {
    const [uid, setUID] = React.useState("");
    const [loggedUser, setLoggedUser] = React.useState<CometChat.User | null>(null);

    React.useEffect(()=>{
        console.log("Login.js Loaded");
        
    }, [])
    
    return (
      
      <SafeAreaView style={{flex:1, display:"flex", justifyContent:"center", alignItems: "center"}}>
        <View style={{backgroundColor:"#55458", width:"100%", display:"flex", justifyContent:"center", flexDirection:"column", gap:16, alignItems: "center"}}>
            <Text style={{color:"black", fontSize: 16, fontWeight:"500"}}>Enter Your UID</Text>
            
            <TextInput
                value={uid}
                onChangeText={txt => setUID(txt)}
                style={{backgroundColor:"black", width:"80%", borderRadius:10, padding:10, color:"white"}}
                placeholder="UID"
                placeholderTextColor={"white"}
            />

            <TouchableOpacity
              onPress={() => {
                console.log("Login Button Pressed");

                const fetch = require('node-fetch');

                const url = `https://246460cdd2872531.api-in.cometchat.io/v3/users/${uid.trim()}/auth_tokens`;
                const options = {
                  method: 'GET',
                  headers: {accept: 'application/json', apikey: '489147ec3ea0fe93c958b077cfe75c1d662f4725'}
                };

                fetch(url, options)
                  .then(res => res.json())
                  .then(json => {
                    console.log("Fetched Auth Token",json);
                    CometChat.getLoggedinUser().then(
                      user => {
                        if(user){
                          
                          CometChat.login(json.data[0].authToken).then(
                          user => {
                            console.log("Login Successful:", { user });
                            navigation.navigate('CometChatCalling', {loggedUser:user, json:json, authToken: json.data[0].authToken });
                            // setLoggedUser(user);
                            
                          }, error => {
                            console.log("Login failed with exception:", { error });
                          }
                        );
                      }
                      }, error => {
                          console.log("Something went wrong", error);
                      }
                    );
                    
                  })
                  .catch(err => console.error('error:' + err));
                
              }}
              style={{
                backgroundColor: 'lightblue',
                width: '50%',
                borderRadius: 10,
                padding: 10,
              }}>
              <Text style={{ color: 'black', fontSize: 16, fontWeight: '500', textAlign: 'center' }}>
                Login
              </Text>
            </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }


  export default Login;

  