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
import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import * as AuthSession from 'expo-auth-session';
const { manifest } = Constants;
const { server } = require('./config.js');
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoogleAuth from './AuthComponents/Google';
import FBAuth from './AuthComponents/Facebook';

const useProxy = true;
const redirectUri = AuthSession.makeRedirectUri({
  useProxy,
});

// console.log(redirectUri);
WebBrowser.maybeCompleteAuthSession();

export default function LogIn({ navigation }) {
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  // console.log(response);

  const fb = async () => {
    // gets the app's deep link
    let redirectUrl = await Linking.getInitialURL();
    console.log(redirectUrl);
    // this should change depending on where the server is running
    let authUrl = `${server}/auth/facebook?applogin=true&linkingUri=${Linking.createURL(
      '/?'
    )}`;
    // addLinkingListener()
    try {
      let authResult = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUrl
      );
      if (authResult.type === 'success') {
        navigation.replace('Dashboard');
      }
      // console.log(authResult)
      // await this.setState({ authResult: authResult })
    } catch (err) {
      console.log('ERROR:', err);
    }
    // removeLinkingListener()
    // let result = await WebBrowser.openBrowserAsync(`${server}/auth/facebook`);
    // setResult(result);
  };

  const login = () => {
    fetch(`${server}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'same-origin',
      },
      body: JSON.stringify({ username: Name, password: Password }),
    }).then((res) => {
      // console.log(res.headers);
      if (res.status === 200) {
        res.json().then((res) => {
          if (!res.status) {
            setMsg(res.msg);
          } else {
            // console.log(res.accesstoken);
            AsyncStorage.setItem('token', res.accesstoken).then(() => {
              navigation.replace('Tab');
            });
          }
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.msg}>{msg}</Text>
      <Text style={styles.header}>LogIn To Your TestCourse Account</Text>
      <Divider />
      <View style={styles.btnbox}>
        <FBAuth {...{ navigation }} />
        <GoogleAuth {...{ navigation }} />
      </View>
      <View style={styles.btnbox}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            marginVertical: 10,
            height: 100,
          }}
        >
          <TextInput
            label="Username"
            type="outlined"
            style={{ height: 50, padding: 5, backgroundColor: '#fff' }}
            value={Name}
            onChangeText={(text) => setName(text)}
            left={<TextInput.Icon name="email" />}
          />
          <TextInput
            label="Password"
            type="outlined"
            secureTextEntry
            style={{ height: 50, padding: 5, backgroundColor: '#fff' }}
            value={Password}
            onChangeText={(text) => setPassword(text)}
            left={<TextInput.Icon name="lock" />}
          />
        </View>
        <View>
          <Button
            variant="contained"
            type="submit"
            style={{}}
            onPress={login}
            style={styles.submit}
          >
            LogIn
          </Button>
        </View>
      </View>
      <Divider />
      <Text
        component="h4"
        color="primary"
        variant="subtitle1"
        style={styles.header}
        gutterBottom
      >
        New User?Sign Up{' '}
        <Text
          onPress={() => {
            navigation.replace('SignUp');
          }}
        >
          Here
        </Text>{' '}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
