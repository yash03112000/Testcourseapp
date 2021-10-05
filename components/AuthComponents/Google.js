import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  ActivityIndicator,
  Colors,
  TextInput,
  Button,
  Divider,
} from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';

import * as AuthSession from 'expo-auth-session';
const { server } = require('../config.js');
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
// import * as Google from 'expo-google-app-auth';
import Cookies from 'universal-cookie';

const useProxy = true;
const redirectUri = AuthSession.makeRedirectUri({
  useProxy,
});

// console.log(redirectUri);
WebBrowser.maybeCompleteAuthSession();

export default function LogIn({ navigation }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      '79469705024-udvh9a8ep5o31i0rdkj2d1bp6d1mta7c.apps.googleusercontent.com',
    // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId:
      '1084798383126-u9svc4ettipgp6f41v7jo84nendm9nbf.apps.googleusercontent.com',
    webClientId:
      '79469705024-udvh9a8ep5o31i0rdkj2d1bp6d1mta7c.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // console.log(authentication);
      initial(authentication.accessToken);
    }
  }, [response]);

  const initial = async (accessToken) => {
    // console.log(accessToken);
    try {
      const userInfoResponse = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const user = await userInfoResponse.json();
      var res = await fetch(`${server}/auth/googleapp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile: user, accessToken }),
      });
      res = await res.json();
      // console.log(res);
      AsyncStorage.setItem('token', res.accesstoken).then(() => {
        navigation.replace('Tab');
      });
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(response);

  const google = async () => {
    promptAsync({ useProxy });
  };

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        color="black"
        style={styles.google}
        icon="google"
        onPress={google}
      >
        SignIn with Google
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  msg: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10,
    // flex:1
  },
  fb: {
    backgroundColor: '#1A538A',
    width: 250,
    color: 'white',
    marginBottom: 5,
  },
  google: {
    backgroundColor: 'red',
    width: 250,
    color: 'black',
  },
  submit: {
    backgroundColor: '#A436F1',
    width: 250,
    color: 'black',
    marginTop: 20,
  },
  main: {
    // backgroundColor:'green',
    width: 250,
  },
  btnbox: {
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
    // backgroundColor:'green',
    // flex:1
    // marginTop:20,
    // marginBottom:10
  },
});
