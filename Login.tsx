import * as React from 'react';
import { View, Text, SafeAreaView, TextInput, Touchable, TouchableOpacity } from 'react-native';
import CometChatCalling from './CometChatCalling';
import axios from 'axios';
import { ABRIGHTCONNECT_CONSTANTS } from './CONSTS';
import { CometChat } from '@cometchat/chat-sdk-react-native';

function Login({navigation}) {
    const [uid, setUID] = React.useState("");

    React.useEffect(()=>{
        console.log("Login.js Loaded");
        
    }, [])
    // const config = { 
    //   qs: {
    //     scope: "fullAccess",
    //     searchKey: "uid"
    //   },
    //   headers: {
    //     'apiKey': ABRIGHTCONNECT_CONSTANTS.REST_API_KEY, // Replace with your actual authorization token
    //     'Content-Type': 'application/json', // Set the content type according to your API requirements
    //     'Accept': 'application/json' // You can add custom headers as needed
    //   },
    //   body: {
    //   }
    // };

    // axios.get(`https://${ABRIGHTCONNECT_CONSTANTS.APP_ID}.${ABRIGHTCONNECT_CONSTANTS.REGION}.cometchat.io/v3/apikeys`, config)
    //   .then((response)=>{
    //     console.log("API Key fetched successfully:", response.data);
        
    //   })
    //   .catch((error)=>{
    //     console.log("Error fetching API Key:", error);
    //     console.log("Error message:", error.message); // Log the error message for further insights
    //   })
    // const getApiKeys = async () => {
    //   try{
    //     const headers = new Headers();
    //     headers.append('apiKey', ABRIGHTCONNECT_CONSTANTS.REST_API_KEY);
    //     headers.append('Content-Type', 'application/json');
    //     headers.append('Accept', 'application/json'); 
    //     const response = await fetch(`https://${ABRIGHTCONNECT_CONSTANTS.APP_ID}.${ABRIGHTCONNECT_CONSTANTS.REGION}.cometchat.io/v3/apikeys`,{
    //       method: 'GET',
    //       headers: headers,
    //     })
    //     const data = await response.json();
    //     console.log("API Key fetched successfully:", data);
    //   }catch(error){
    //     console.log("Error fetching API Key:", error);
    //   }
    // }
    return (
      
      <SafeAreaView style={{flex:1, display:"flex", justifyContent:"center", alignItems: "center"}}>
        <View style={{backgroundColor:"#55458", width:"100%", display:"flex", justifyContent:"center", flexDirection:"column", gap:16, alignItems: "center"}}>
            <Text style={{color:"black", fontSize: 16, fontWeight:"500"}}>Enter Your UID</Text>
            
            <TextInput
                value={uid}
                onChangeText={txt => setUID(txt)}
                style={{backgroundColor:"black", width:"80%", borderRadius:10, padding:10, color:"white"}}
                placeholder="UID"
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
                    
                    navigation.navigate('CometChatCalling', { authToken: json.data[0].authToken });
                  })
                  .catch(err => console.error('error:' + err));

                // axios.get(`https://appId.api-region.cometchat.io/v3/users/${uid}/auth_tokens`, config)
                //   .then((body) => {
                //       if (body!=undefined && body!=null) {
                //           console.log('Auth token fetched successfully:', body);
                //           CometChat.getLoggedinUser().then(
                //             user => {
                //               if(!user){
                                
                //                 CometChat.login(body.data[0].authToken).then(
                //                 user => {
                //                   console.log("Login Successful:", { user });
                                  
                //                 }, error => {
                //                   console.log("Login failed with exception:", { error });
                //                 }
                //               );
                //             }
                //             }, error => {
                //                 console.log("Something went wrong", error);
                //             }
                //         );
                //           navigation.navigate('CometChatCalling', { authToken: body.data[0].authToken });

                //       } else {
                //           console.error('Auth token not found in response:', response);
                //       }
                //   })
                //   .catch((error) => {
                //       console.error('Error fetching auth token:', error);
                //   });
                  
                
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

  